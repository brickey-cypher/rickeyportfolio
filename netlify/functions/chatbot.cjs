/* eslint-env node */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();
const { Pool } = require('pg');

console.log(
  'Database connection string:',
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL.substring(0, 30) + '...'
    : 'Not set'
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

// Test connection once
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

    const searchTerm = `%${question}%`;

    // Normalize question into words (lowercase, remove punctuation)
    const words = question.toLowerCase().match(/\w+/g) || [];

    // Expand words with singular/plural variations
    const tagPatterns = [];
    for (const word of words) {
      const base = word.replace(/s$/, '');
      tagPatterns.push(`%${word}%`);
      if (base !== word) tagPatterns.push(`%${base}%`); // singular
      tagPatterns.push(`%${base}s%`); // plural
    }

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

    const result = await pool.query(query, values);

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
