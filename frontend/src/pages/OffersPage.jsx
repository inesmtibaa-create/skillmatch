import { getOffers } from '../api/offers.js'
import { EmptyState, ErrorState, LoadingState } from '../components/Feedback.jsx'
import { OfferCard } from '../components/OfferCard.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useResource } from '../hooks/useResource.js'

export function OffersPage() {
  const { status, data: offers, error, reload } = useResource(getOffers, [])

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Les offres disponibles."
        description="Toutes les offres actuellement fournies par l’API SkillMatch."
        compact
      />
      <section className="page-section page-section-first">
        <div className="page-container">
          {status === 'loading' && <LoadingState label="Chargement des offres…" />}
          {status === 'error' && <ErrorState error={error} onRetry={reload} />}
          {status === 'success' && offers.length === 0 && (
            <EmptyState title="Aucune offre" description="Le backend ne contient aucune offre pour le moment." />
          )}
          {status === 'success' && offers.length > 0 && (
            <>
              <p className="result-summary">{offers.length} offre{offers.length > 1 ? 's' : ''}</p>
              <div className="card-grid card-grid-two">
                {offers.map((offer, index) => <OfferCard key={offer.id ?? index} offer={offer} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
