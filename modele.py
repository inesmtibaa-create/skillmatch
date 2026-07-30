from sentence_transformers import SentenceTransformer

modele_embeddings = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
import pandas as pd
offres = pd.read_csv('data/offres.csv')
offres['texte_complet'] = (
    offres['description'] + ' ' + offres['competences'] + ' ' + offres['domaine']
).str.lower()

embeddings_offres = modele_embeddings.encode(offres['texte_complet'].tolist())

print(embeddings_offres.shape)
from sklearn.metrics.pairwise import cosine_similarity

profil_etudiant = "stage python data science machine learning"

embedding_etudiant = modele_embeddings.encode([profil_etudiant])

scores = cosine_similarity(embedding_etudiant, embeddings_offres)
import numpy as np

top_indices = np.argsort(scores[0])[::-1][:5]

for i in top_indices:
    pourcentage = round(scores[0][i] * 100, 1)
    print(f"{offres.iloc[i]['titre']} — {pourcentage}% de correspondance")
