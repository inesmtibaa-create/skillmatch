import { getCompanies } from '../api/companies.js'
import { CompanyCard } from '../components/CompanyCard.jsx'
import { EmptyState, ErrorState, LoadingState } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useResource } from '../hooks/useResource.js'

export function CompaniesPage() {
  const { status, data: companies, error, reload } = useResource(getCompanies, [])

  return (
    <>
      <PageHeader eyebrow="Réseau" title="Les entreprises." description="Découvrez les entreprises présentes sur SkillMatch." compact />
      <section className="page-section page-section-first">
        <div className="page-container">
          {status === 'loading' && <LoadingState label="Chargement des entreprises…" />}
          {status === 'error' && <ErrorState error={error} onRetry={reload} />}
          {status === 'success' && companies.length === 0 && <EmptyState title="Aucune entreprise" description="Aucune entreprise n’est disponible." />}
          {status === 'success' && companies.length > 0 && (
            <div className="card-grid card-grid-two">
              {companies.map((company, index) => <CompanyCard key={company.id ?? index} company={company} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
