"""
Classification supervisée des offres de stage par domaine.
Compare Naive Bayes, Logistic Regression, KNN, SVM.
Utilise un Pipeline scikit-learn pour éviter toute fuite de données
entre le TF-IDF et le split train/test.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV, StratifiedKFold
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# ============================================================
# 1. CHARGEMENT DES DONNÉES
# ============================================================

df = pd.read_csv("data/offres.csv")

# On combine titre + description + compétences pour donner au modèle
# un maximum de signal textuel. Adapte selon ce que tu utilises déjà
# dans ton modele.py pour recommander_offres().
df["texte"] = (
    df["titre"].fillna("") + ". " +
    df["description"].fillna("") + " " +
    df["competences"].fillna("").str.replace("-", " ")
)

X = df["texte"]
y = df["domaine"]

print(f"Nombre d'offres : {len(df)}")
print(f"Distribution par domaine :\n{y.value_counts()}\n")

# ============================================================
# 2. SPLIT TRAIN/TEST STRATIFIÉ
# ============================================================
# stratify=y garantit que chaque domaine garde la même proportion
# dans train et test (important avec seulement ~25 offres/domaine)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Train : {len(X_train)} offres | Test : {len(X_test)} offres\n")

# ============================================================
# 3. DÉFINITION DES PIPELINES (TF-IDF + modèle)
# ============================================================
# Chaque pipeline refait le TF-IDF fit_transform uniquement sur les
# données qui lui sont passées à ce moment-là (train du fold courant),
# donc pas de fuite possible entre train et test/folds.

def make_pipeline(model):
    return Pipeline([
        ("tfidf", TfidfVectorizer(
            stop_words=None,  # remplace par ta liste de stop words FR si tu en as une
            sublinear_tf=True,
            min_df=2,
            max_df=0.9
        )),
        ("clf", model)
    ])

modeles = {
    "Naive Bayes": make_pipeline(MultinomialNB()),
    "Logistic Regression": make_pipeline(LogisticRegression(max_iter=1000)),
    "KNN": make_pipeline(KNeighborsClassifier(n_neighbors=5)),
    "SVM": make_pipeline(SVC(kernel="linear")),
}

# ============================================================
# 4. ENTRAÎNEMENT + ÉVALUATION SUR LE SPLIT UNIQUE
# ============================================================

resultats = {}

for nom, pipeline in modeles.items():
    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    accuracy = pipeline.score(X_test, y_test)
    resultats[nom] = accuracy

    print(f"\n{'='*60}")
    print(f"{nom} — Accuracy sur le split unique : {accuracy:.2%}")
    print(f"{'='*60}")
    print(classification_report(y_test, y_pred, zero_division=0))

# ============================================================
# 5. CROSS-VALIDATION (5 folds) — mesure plus fiable
# ============================================================

print("\n" + "="*60)
print("CROSS-VALIDATION (5 folds, accuracy moyenne ± écart-type)")
print("="*60)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

for nom, pipeline in modeles.items():
    scores = cross_val_score(pipeline, X, y, cv=cv, scoring="accuracy")
    print(f"{nom:25s} : {scores.mean():.2%} ± {scores.std():.2%}  | folds: {[f'{s:.2f}' for s in scores]}")

# ============================================================
# 6. MATRICE DE CONFUSION DU MEILLEUR MODÈLE (sur le split test)
# ============================================================

meilleur_nom = max(resultats, key=resultats.get)
meilleur_pipeline = modeles[meilleur_nom]
y_pred_meilleur = meilleur_pipeline.predict(X_test)

print(f"\nMeilleur modèle sur le split unique : {meilleur_nom}")

cm = confusion_matrix(y_test, y_pred_meilleur, labels=sorted(y.unique()))
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=sorted(y.unique()))
fig, ax = plt.subplots(figsize=(10, 8))
disp.plot(ax=ax, xticks_rotation=45, cmap="Blues")
plt.title(f"Matrice de confusion — {meilleur_nom}")
plt.tight_layout()
plt.savefig("matrice_confusion.png", dpi=150)
print("Matrice de confusion sauvegardée dans matrice_confusion.png")

# ============================================================
# 7. GRIDSEARCHCV — optimisation des hyperparamètres
# ============================================================
# On optimise sur Logistic Regression et KNN (les deux que tu as
# déjà testés) pour voir si le réglage change quelque chose.

print("\n" + "="*60)
print("GRIDSEARCHCV")
print("="*60)

# --- Logistic Regression : paramètre de régularisation C ---
param_grid_lr = {
    "clf__C": [0.1, 1, 10, 100],
    "tfidf__min_df": [1, 2, 3],
}
grid_lr = GridSearchCV(
    make_pipeline(LogisticRegression(max_iter=1000)),
    param_grid_lr, cv=cv, scoring="accuracy", n_jobs=-1
)
grid_lr.fit(X, y)
print(f"\nLogistic Regression — meilleurs paramètres : {grid_lr.best_params_}")
print(f"Logistic Regression — meilleure accuracy CV : {grid_lr.best_score_:.2%}")

# --- KNN : nombre de voisins ---
param_grid_knn = {
    "clf__n_neighbors": [3, 5, 7, 9, 11],
    "clf__weights": ["uniform", "distance"],
}
grid_knn = GridSearchCV(
    make_pipeline(KNeighborsClassifier()),
    param_grid_knn, cv=cv, scoring="accuracy", n_jobs=-1
)
grid_knn.fit(X, y)
print(f"\nKNN — meilleurs paramètres : {grid_knn.best_params_}")
print(f"KNN — meilleure accuracy CV : {grid_knn.best_score_:.2%}")

# ============================================================
# 8. RÉSUMÉ FINAL
# ============================================================

print("\n" + "="*60)
print("RÉSUMÉ")
print("="*60)
print("""
Note méthodologique à garder pour ton README/notebook :
Le dataset synthétique présente un vocabulaire quasi-disjoint par
domaine (phrases-templates réutilisées à l'identique dans plusieurs
offres), ce qui explique une accuracy proche de 100% quel que soit
le modèle. Ceci ne reflète pas nécessairement la performance sur
des offres réelles au vocabulaire plus varié — voir la validation
sur échantillon réel dans offres_test_reel.csv.
""")