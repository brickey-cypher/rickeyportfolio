import sys
import json
from sentence_transformers import SentenceTransformer
import numpy as np

# Load model (same as generate_embeddings.py)
model = SentenceTransformer("all-MiniLM-L6-v2")

text = sys.argv[1]
embedding = model.encode(text)

# Convert numpy array to list for JSON
print(json.dumps(embedding.tolist()))

