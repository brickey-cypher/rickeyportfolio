/* eslint-env node */
require('dotenv').config();
const { Pool } = require('pg');
const OpenAI = require('openai');

// Setup OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Setup Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

async function generateEmbedding(text) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

async function main() {
  const client = await pool.connect();
  try {
    // Get all rows that don't yet have embeddings
    const { rows } = await client.query(`
      SELECT id, question_pattern, answer
      FROM chatbot_knowledge
      WHERE embedding IS NULL
    `);

    console.log(`Found ${rows.length} rows to process`);

    for (const row of rows) {
      const content = `${row.question_pattern} ${row.answer}`;
      console.log(`Generating embedding for ID ${row.id}...`);

      const embedding = await generateEmbedding(content);

      await client.query(
        `UPDATE chatbot_knowledge SET embedding = $1 WHERE id = $2`,
        [embedding, row.id]
      );
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
