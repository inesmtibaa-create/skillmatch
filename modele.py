import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
def charger_offres():
    offres = pd.read_csv('data/offres.csv')
    offres = offres.dropna(subset=['description', 'competences', 'domaine'])
    offres['texte_complet'] = offres['domaine'] + ' ' + offres['description']+ ' ' + (offres['competences']+ ' ') + offres['titre']
    offres['texte_complet']=offres['texte_complet'].str.lower()
    return offres
def entrainer_embeddings(offres):
    modele = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    embeddings_offres = modele.encode(offres['texte_complet'].tolist())
    return modele, embeddings_offres

def recommander_offres_embeddings(profil, offres_df, modele, embeddings_offres, top_n=5):
    embedding_profil = modele.encode([profil.lower()])
    scores = cosine_similarity(embedding_profil, embeddings_offres)[0]

    top_indices = np.argsort(scores)[::-1][:top_n]

    resultats = offres_df.iloc[top_indices].copy()
    resultats['pourcentage_match'] = [round(scores[i] * 100, 1) for i in top_indices]
    resultats = resultats.reset_index(drop=True)
    resultats.index = resultats.index + 1
    return resultats[['titre', 'entreprise', 'domaine', 'ville', 'pourcentage_match']]