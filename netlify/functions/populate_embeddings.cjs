/* eslint-env node */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // allow self-signed certs

require("dotenv").config();
const { Pool } = require("pg");
const { execSync } = require("child_process");
const path = require("path");

// Setup Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // allow self-signed certs
  },
});

/**
 * Generate embedding by calling Python script directly.
 * Uses the same model/code as generate_embeddings.py
 */
async function generateEmbedding(text) {
  const safeText = text.replace(/"/g, '\\"');
  const scriptPath = path.resolve(__dirname, "../../local_embedder/generate_single_embedding.py");
  const pythonExecutable = path.resolve(__dirname, "../../local_embedder/venv/Scripts/python.exe");
  const command = `"${pythonExecutable}" "${scriptPath}" "${safeText}"`;
  console.log("Running command:", command);

  try {
    const output = execSync(command, { encoding: "utf-8" }).trim();
    const embedding = JSON.parse(output);
    return embedding;
  } catch (err) {
    console.error("Error running Python embedding script:", err);
    throw err;
  }
}


// Retry helper
async function generateWithRetry(text, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await generateEmbedding(text);
    } catch (err) {
      console.warn(`Embedding attempt ${attempt} failed.`);
      if (attempt === retries) throw err;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

async function main() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      SELECT id, question_pattern, answer
      FROM chatbot_knowledge
      WHERE embedding IS NULL
    `);

    console.log(`Found ${rows.length} rows to process`);

    for (const row of rows) {
      const content = `${row.question_pattern} ${row.answer}`;
      console.log(`Generating embedding for ID ${row.id}...`);

      const embedding = await generateWithRetry(content);

      await client.query(
        `UPDATE chatbot_knowledge SET embedding = $1 WHERE id = $2`,
        [embedding, row.id]
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("Embedding population completed!");
  } catch (err) {
    console.error("Error populating embeddings:", err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
