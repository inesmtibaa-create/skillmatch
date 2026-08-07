"""
Évalue le modèle entraîné sur le dataset synthétique (offres.csv)
en le testant sur des annonces réelles collectées manuellement
(offres_test_reel.csv). Le modèle n'est JAMAIS entraîné sur ce
second fichier — il sert uniquement à mesurer la généralisation.
"""

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# ============================================================
# 1. CHARGER LES DEUX DATASETS
# ============================================================

df_train = pd.read_csv("data/offres.csv")
df_test_reel = pd.read_csv("data/offres_reels.csv")

def construire_texte(df):
    return (
        df["titre"].fillna("") + ". " +
        df["description"].fillna("") + " " +
        df["competences"].fillna("").str.replace("-", " ")
    )

X_train = construire_texte(df_train)
y_train = df_train["domaine"]

X_test_reel = construire_texte(df_test_reel)
y_test_reel = df_test_reel["domaine"]

print(f"Entraînement sur {len(df_train)} offres synthétiques")
print(f"Test sur {len(df_test_reel)} annonces réelles\n")
print("Distribution du set de test réel :")
print(y_test_reel.value_counts())
print()

# ============================================================
# 2. ENTRAÎNER SUR TOUT LE DATASET SYNTHÉTIQUE
# ============================================================
# On entraîne sur 100% du synthétique (pas de split ici) puisque
# le vrai test se fait sur des données totalement séparées.

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(sublinear_tf=True, min_df=2, max_df=0.9)),
    ("clf", LogisticRegression(max_iter=1000))
])

pipeline.fit(X_train, y_train)

# ============================================================
# 3. PRÉDIRE SUR LE SET RÉEL (jamais vu à l'entraînement)
# ============================================================

y_pred_reel = pipeline.predict(X_test_reel)

accuracy_reel = (y_pred_reel == y_test_reel.values).mean()

print("="*60)
print(f"ACCURACY SUR DONNÉES RÉELLES : {accuracy_reel:.2%}")
print("="*60)
print(f"(pour comparaison, accuracy sur données synthétiques : ~100%)\n")

# ============================================================
# 4. DÉTAIL PAR ANNONCE — pour voir précisément où ça se trompe
# ============================================================

print("Détail des prédictions :\n")
for titre, vrai, predit in zip(df_test_reel["titre"], y_test_reel, y_pred_reel):
    statut = "✓" if vrai == predit else "✗"
    print(f"{statut}  {titre[:50]:50s} | vrai: {vrai:30s} | prédit: {predit}")

# ============================================================
# 5. RAPPORT DE CLASSIFICATION COMPLET
# ============================================================

print("\n" + "="*60)
print("CLASSIFICATION REPORT (sur les domaines présents dans le test réel)")
print("="*60)
print(classification_report(y_test_reel, y_pred_reel, zero_division=0))