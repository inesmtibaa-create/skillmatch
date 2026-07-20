import { Link } from 'react-router-dom'

export function CompanyCard({ company }) {
  return (
    <article className="content-card profile-card">
      <div className="avatar" aria-hidden="true">{company.name?.charAt(0).toUpperCase() || 'E'}</div>
      <div>
        <p className="card-kicker">{company.sector || 'Secteur non précisé'}</p>
        <h2>{company.name || 'Entreprise sans nom'}</h2>
        {company.description && <p className="card-description">{company.description}</p>}
        {company.id != null && <Link className="text-link" to={`/entreprises/${company.id}`}>Voir l’entreprise</Link>}
      </div>
    </article>
  )
}
