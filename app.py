from flask import Flask, request, jsonify

from flask_cors import CORS

from modele import charger_offres, entrainer_vectorizer, recommander_offres

app = Flask(__name__)
CORS(app)
offres = charger_offres()
vectorizer = entrainer_vectorizer(offres)
@app.route('/recommander', methods=['POST'])
def recommander():
    data = request.get_json()

    profil = data.get('profil', '')

    ville = data.get('ville', 'peu importe')

    if not profil:

        return jsonify({"erreur": "Le profil est requis"}), 400

    resultat = recommander_offres(profil, ville,offres, vectorizer)

    if isinstance(resultat, str):

        return jsonify({"message": resultat}), 200

    offres_json = resultat.to_dict(orient='records')

    return jsonify(offres_json), 200

if __name__ == '__main__':

    app.run(debug=True, port=5000)





