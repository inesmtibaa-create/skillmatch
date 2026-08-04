import re
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from synonymes import SYNONYMES
STOP_WORDS_FR = [
    'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'à', 'au', 'aux',
    'ce', 'ces', 'cette', 'cet', 'il', 'elle', 'ils', 'elles', 'on', 'nous', 'vous',
    'dans', 'pour', 'par', 'sur', 'avec', 'sans', 'sous', 'entre', 'est', 'sont',
    'être', 'avoir', 'que', 'qui', 'quoi', 'dont', 'où', 'mais', 'ou', 'donc',
    'car', 'ne', 'pas', 'plus', 'très', 'aussi', 'son', 'sa', 'ses', 'leur', 'leurs'
]
def normaliser_synonymes(texte):
    for mot, remplacement in SYNONYMES.items():
        texte = re.sub(r'\b' + re.escape(mot) + r'\b', remplacement, texte)
    return texte
def charger_offres():
    offres = pd.read_csv('data/offres.csv')
    offres = offres.dropna(subset=['description', 'competences', 'domaine'])
    offres['texte_complet'] = offres['domaine'] + ' ' + offres['description']+ ' ' + (offres['competences']+ ' ')*2 + offres['titre']
    offres['texte_complet'] = offres['texte_complet'].apply(normaliser_synonymes)
    offres['texte_complet']=offres['texte_complet'].str.lower()
    return offres
def entrainer_vectorizer(offres):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words=STOP_WORDS_FR, sublinear_tf=True)
    vectorizer.fit(offres['texte_complet'])
    return vectorizer

def recommander_offres(profil,ville,offres,vectorizer):
    if ville != 'peu importe':
        offres_filtrées = offres[offres['ville']==ville].reset_index(drop=True)
    else:
        offres_filtrées = offres.reset_index(drop=True)
    if len(offres_filtrées)==0:
        return "aucune offre trouvee dans cette ville"
    matrice_offres_filtrées = vectorizer.transform(offres_filtrées['texte_complet'])
    vector_profil = vectorizer.transform([profil.lower()])
    scores= cosine_similarity(vector_profil, matrice_offres_filtrées)
    top_indices = np.argsort(scores[0])[::-1][:5]
    return offres_filtrées.iloc[top_indices][['titre', 'entreprise', 'domaine', 'ville']]

