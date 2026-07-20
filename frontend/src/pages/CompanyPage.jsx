import { Link, useParams } from 'react-router-dom'
import { getCompany } from '../api/companies.js'
import { ErrorState, LoadingState } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useResource } from '../hooks/useResource.js'

export function CompanyPage() {
  const { companyId } = useParams()
  const { status, data: company, error, reload } = useResource(() => getCompany(companyId), [companyId])

  if (status === 'loading') {
    return <section className="page-section"><div className="page-container"><LoadingState label="Chargement de l’entreprise…" cards={1} /></div></section>
  }

  if (status === 'error') {
    return <section className="page-section"><div className="page-container"><ErrorState error={error} onRetry={reload} title="Entreprise introuvable" /></div></section>
  }

  return (
    <>
      <PageHeader eyebrow={company.sector || 'Entreprise'} title={company.name || 'Entreprise sans nom'} description={company.description || 'Aucune description disponible.'} compact />
      <section className="page-section page-section-first">
        <div className="page-container detail-card">
          <div className="avatar avatar-large" aria-hidden="true">{company.name?.charAt(0).toUpperCase() || 'E'}</div>
          <dl className="detail-list">
            <div><dt>Secteur</dt><dd>{company.sector || 'Non précisé'}</dd></div>
            <div><dt>Contact</dt><dd>{company.email || 'Non communiqué'}</dd></div>
          </dl>
          <Link className="text-link" to="/entreprises">Retour aux entreprises</Link>
        </div>
      </section>
    </>
  )
}
