# generate_embeddings.py

import os
import psycopg2
from psycopg2.extras import execute_values
from sentence_transformers import SentenceTransformer
import numpy as np
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root .env
load_dotenv(dotenv_path=Path('..') / '.env')

def connect_db():
    """Connect to PostgreSQL with SSL."""
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("DATABASE_URL not set in environment")
    return psycopg2.connect(db_url, sslmode="require")

def fetch_rows_missing_embeddings(conn):
    """Fetch rows with NULL embeddings to process."""
    with conn.cursor() as cur:
        cur.execute("""
            SELECT id, question_pattern, answer
            FROM chatbot_knowledge
            WHERE embedding IS NULL
            LIMIT 50
        """)
        return cur.fetchall()

def update_embeddings(conn, rows_with_embeddings):
    """Batch update embeddings for multiple rows."""
    with conn.cursor() as cur:
        # Use execute_values for efficient batch update
        sql = """
        UPDATE chatbot_knowledge AS c SET embedding = data.embedding
        FROM (VALUES %s) AS data(id, embedding)
        WHERE c.id = data.id;
        """
        execute_values(cur, sql, rows_with_embeddings)

def main():
    print("Loading SentenceTransformer model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    print("Connecting to database...")
    conn = connect_db()

    try:
        rows = fetch_rows_missing_embeddings(conn)
        print(f"Found {len(rows)} rows missing embeddings.")

        rows_to_update = []

        for row_id, question_pattern, answer in rows:
            text = f"{question_pattern} {answer}"
            print(f"Generating embedding for ID {row_id}...")

            embedding_vector = model.encode(text, show_progress_bar=False)
            embedding_list = embedding_vector.tolist()  # Convert numpy array to list for JSON storage

            # Prepare tuple for batch update: (id, embedding)
            rows_to_update.append((row_id, embedding_list))

        if rows_to_update:
            print(f"Updating {len(rows_to_update)} embeddings in database...")
            update_embeddings(conn, rows_to_update)
            conn.commit()
            print("Update committed.")
        else:
            print("No rows to update.")

    except Exception as e:
        print("Error during embedding generation or DB update:", e)

    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    main()

