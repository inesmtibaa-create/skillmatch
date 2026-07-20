import { useCallback } from 'react'
import { EmptyState, ErrorState, LoadingState } from '../components/Feedback.jsx'
import { OfferCard } from '../components/OfferCard.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useResource } from '../hooks/useResource.js'

const RESULTS_URL = import.meta.env.VITE_RESULTS_URL || '/model-results.json'

function formatScore(score) {
  const value = Number(score)
  if (!Number.isFinite(value)) return null
  return Math.round(value <= 1 ? value * 100 : value)
}

function normalizePayload(payload) {
  const results = Array.isArray(payload) ? payload : payload?.results
  if (!Array.isArray(results)) throw new Error('Format de résultats invalide.')
  return { context: Array.isArray(payload) ? null : payload.context, results }
}

function mapResult(result) {
  return {
    id: result.id,
    title: result.titre,
    company: result.entreprise,
    field: result.domaine,
    city: result.ville,
    description: result.description,
    skills: Array.isArray(result.competences) ? result.competences : [],
    score: formatScore(result.score),
  }
}

export function RecommendationsPage() {
  const loadResults = useCallback(async () => {
    const response = await fetch(RESULTS_URL, { cache: 'no-store' })
    if (!response.ok) throw new Error(`Le fichier de résultats est indisponible (${response.status}).`)
    return normalizePayload(await response.json())
  }, [])
  const { status, data, error, reload } = useResource(loadResults, [loadResults])
  const results = data?.results?.map(mapResult) || []

  return (
    <>
      <PageHeader eyebrow="Résultats du modèle" title="Les opportunités qui vous correspondent." description="Cette page affiche les résultats produits par le modèle SkillMatch sans les recalculer." compact>
        {data?.context && (
          <dl className="context-chips">
            {data.context.profile && <div><dt>Profil</dt><dd>{data.context.profile}</dd></div>}
            {data.context.city && <div><dt>Ville</dt><dd>{data.context.city}</dd></div>}
          </dl>
        )}
      </PageHeader>
      <section className="page-section page-section-first">
        <div className="page-container narrow-container">
          {status === 'loading' && <LoadingState label="Chargement des recommandations…" />}
          {status === 'error' && <ErrorState error={error} onRetry={reload} title="Recommandations indisponibles" />}
          {status === 'success' && results.length === 0 && <EmptyState title="Aucune recommandation" description="Le modèle n’a retourné aucune offre pour ce profil." />}
          {status === 'success' && results.length > 0 && (
            <div className="recommendation-list">
              {results.map((result, index) => <OfferCard key={result.id ?? `${result.title}-${index}`} offer={result} rank={index + 1} score={result.score} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
