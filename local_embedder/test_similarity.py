import os
from pathlib import Path
import psycopg2
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import numpy as np

# Load environment variables
load_dotenv(dotenv_path=Path('..') / '.env')

# Connect to DB
conn = psycopg2.connect(os.environ["DATABASE_URL"], sslmode="require")
cur = conn.cursor()

# Load same model we used to generate embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")

# 1. Text to search
query = "incident report network traffic analysis"

# 2. Create embedding for the query
embedding = model.encode(query)

# Convert numpy array to Postgres vector literal
embedding_str = "[" + ",".join(str(x) for x in embedding.tolist()) + "]"

# 3. Run similarity search
sql = f"""
SELECT id, question_pattern, answer,
       embedding <-> '{embedding_str}' AS distance
FROM chatbot_knowledge
ORDER BY embedding <-> '{embedding_str}'
LIMIT 5;
"""
cur.execute(sql)
rows = cur.fetchall()

print("\nTop 5 matches:")
for r in rows:
    print(f"ID: {r[0]}")
    print(f"Pattern: {r[1]}")
    print(f"Answer: {r[2]}")
    print(f"Distance: {r[3]}")
    print("---")

cur.close()
conn.close()

