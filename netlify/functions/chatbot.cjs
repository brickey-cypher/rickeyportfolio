/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // allow self-signed certs

require('dotenv').config();
const synonymMap = require('./synonyms.cjs');
const { Pool } = require('pg');
const { exec } = require('child_process');

// Debug log for DB connection
console.log(
  'Database connection string:',
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL.substring(0, 30) + '...'
    : 'Not set'
);

// Initialize Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

// Full path to your Python executable inside the venv (adjust if needed)
const pathToVenvPython = "C:\\portfolio-project\\rickeyportfolio\\local_embedder\\venv\\Scripts\\python.exe";

function getEmbeddingFromPython(text) {
  return new Promise((resolve, reject) => {
    const safeText = text.replace(/"/g, '\\"');
    exec(`"${pathToVenvPython}" local_embedder/generate_single_embedding.py "${safeText}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error calling Python embedder:', stderr || error);
        reject(error);
      } else {
        try {
          const result = JSON.parse(stdout);
          resolve(result.embedding);
        } catch (e) {
          console.error('Failed to parse embedding from Python:', stdout);
          reject(e);
        }
      }
    });
  });
}

// Test DB connection once
(async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
})();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question } = JSON.parse(event.body);

    if (!question || typeof question !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid or missing question in request body.' }),
      };
    }

    // Sanitize input by removing punctuation (except spaces)
    const sanitizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    const searchTerm = `%${sanitizedQuestion}%`;

    // Extract words from sanitized question
    const rawWords = sanitizedQuestion.match(/\w+/g) || [];

    // Expand words with synonyms from synonymMap
    const expandedWords = new Set();
    for (const word of rawWords) {
      expandedWords.add(word);
      if (synonymMap[word]) {
        for (const synonym of synonymMap[word]) {
          expandedWords.add(synonym.toLowerCase());
        }
      }
    }

    // Generate tag patterns for fuzzy matching
    const tagPatterns = [];
    for (const word of expandedWords) {
      const base = word.replace(/s$/, '');
      tagPatterns.push(`%${word}%`);
      if (base !== word) tagPatterns.push(`%${base}%`); // singular form
      tagPatterns.push(`%${base}s%`); // plural form
    }

    // --- Step 1: Try keyword / tag match ---
    const query = `
      SELECT question_pattern AS question, answer
      FROM chatbot_knowledge
      WHERE question_pattern ILIKE $1
         OR answer ILIKE $1
         OR EXISTS (
           SELECT 1 FROM unnest(tags) AS tag
           WHERE tag ILIKE ANY($2)
         )
      ORDER BY created_at DESC
      LIMIT 3
    `;
    const values = [searchTerm, tagPatterns];

    let result = await pool.query(query, values);

    // --- Step 2: If no result, use local Python embeddings ---
    if (result.rows.length === 0) {
      console.log("No keyword/tag results, using local Python embeddings...");
      const embedding = await getEmbeddingFromPython(question);

      const vectorQuery = `
        SELECT question_pattern AS question, answer
        FROM chatbot_knowledge
        WHERE embedding IS NOT NULL
        ORDER BY embedding <-> $1
        LIMIT 3
      `;
      result = await pool.query(vectorQuery, [embedding]);
    }

    let answer;
    if (result.rows.length === 0) {
      answer = "Sorry, I don't know that yet.";
    } else {
      answer = result.rows.map(row => row.answer).join('\n\n');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (err) {
    console.error('Error querying database:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        answer: 'Error retrieving information from the database.',
      }),
    };
  }
};
