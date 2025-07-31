require('dotenv').config();

const { Pool } = require('pg');

// Debug log (only shows first part of connection string for security)
console.log('Database connection string:', process.env.DATABASE_URL ?
  process.env.DATABASE_URL.substring(0, 30) + '...' : 'Not set');

// Create a single, reusable pool instance.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase/Heroku connections
  },
});

// Test the database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    return false;
  }
}

// Test the connection when the function loads
testConnection();

export async function handler(event, context) {
  // Ensure the function only responds to POST requests
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

    const query = `
      SELECT question_pattern AS question, answer
      FROM chatbot_knowledge
      WHERE question_pattern ILIKE $1 OR answer ILIKE $1
      ORDER BY created_at DESC
      LIMIT 3
    `;

    const values = [`%${question}%`];

    const result = await pool.query(query, values);

    let answer;
    if (result.rows.length === 0) {
      answer = "Sorry, I don't know that yet.";
    } else {
      // Join answers or pick best match (here joining all answers)
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
      body: JSON.stringify({ answer: 'Error retrieving information from the database.' }),
    };
  }
};
