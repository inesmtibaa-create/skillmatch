import { useCallback, useEffect, useState } from 'react'

const RESULTS_URL = import.meta.env.VITE_RESULTS_URL || '/model-results.json'

function formatScore(score) {
  const value = Number(score)
  if (!Number.isFinite(value)) return null
  return Math.round(value <= 1 ? value * 100 : value)
}

function normalizePayload(payload) {
  const results = Array.isArray(payload) ? payload : payload?.results

  if (!Array.isArray(results)) {
    throw new Error('Format de résultats invalide.')
  }

  return {
    context: Array.isArray(payload) ? null : payload.context,
    results,
  }
}

function ResultCard({ result, rank }) {
  const score = formatScore(result.score)

  return (
    <article className="result-card">
      <div className="rank" aria-label={`Classement ${rank}`}>
        {String(rank).padStart(2, '0')}
      </div>
      <div className="result-content">
        <div className="result-heading">
          <div>
            <p className="company">{result.entreprise || 'Entreprise non précisée'}</p>
            <h2>{result.titre || 'Offre sans titre'}</h2>
          </div>
          {score != null && (
            <span className="score">{score}% de compatibilité</span>
          )}
        </div>
        <div className="metadata" aria-label="Informations sur l’offre">
          {result.domaine && <span>{result.domaine}</span>}
          {result.ville && <span>{result.ville}</span>}
        </div>
      </div>
    </article>
  )
}

function LoadingState() {
  return (
    <div className="results" aria-label="Chargement des recommandations">
      {[1, 2, 3].map((item) => (
        <div className="result-card skeleton" key={item} aria-hidden="true">
          <div className="skeleton-rank" />
          <div className="skeleton-lines">
            <div />
            <div />
            <div />
          </div>
        </div>
      ))}
      <p className="sr-only" role="status">Chargement des recommandations…</p>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  const loadResults = useCallback(async () => {
    setStatus('loading')

    try {
      const response = await fetch(RESULTS_URL, { cache: 'no-store' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setData(normalizePayload(await response.json()))
      setStatus('success')
    } catch (error) {
      console.error('Impossible de charger les résultats SkillMatch.', error)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadResults()
  }, [loadResults])

  const results = data?.results ?? []

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/" aria-label="SkillMatch, accueil">
          SkillMatch
        </a>
        <span className="topbar-label">Résultats du modèle</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Recommandations personnalisées</p>
        <h1 id="page-title">Les opportunités qui vous correspondent.</h1>
        <p className="intro">
          Une vue simple des offres classées par le modèle SkillMatch.
        </p>

        {data?.context && (
          <dl className="context">
            {data.context.profile && (
              <div>
                <dt>Profil</dt>
                <dd>{data.context.profile}</dd>
              </div>
            )}
            {data.context.city && (
              <div>
                <dt>Ville</dt>
                <dd>{data.context.city}</dd>
              </div>
            )}
          </dl>
        )}
      </section>

      <section className="results-section" aria-labelledby="results-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Classement</p>
            <h2 id="results-title">Meilleurs résultats</h2>
          </div>
          {status === 'success' && (
            <span className="result-count">
              {results.length} résultat{results.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <div className="state-card" role="alert">
            <h2>Résultats indisponibles</h2>
            <p>Le fichier de résultats n’a pas pu être chargé.</p>
            <button type="button" onClick={loadResults}>Réessayer</button>
          </div>
        )}

        {status === 'success' && results.length === 0 && (
          <div className="state-card">
            <h2>Aucune recommandation</h2>
            <p>Le modèle n’a retourné aucune offre pour ce profil.</p>
          </div>
        )}

        {status === 'success' && results.length > 0 && (
          <div className="results">
            {results.map((result, index) => (
              <ResultCard
                key={result.id || `${result.titre}-${result.entreprise}-${index}`}
                result={result}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
