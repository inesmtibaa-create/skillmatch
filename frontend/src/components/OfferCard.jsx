export function OfferCard({ offer, rank, score }) {
  return (
    <article className="content-card offer-card">
      {(rank || score != null) && (
        <div className="card-topline">
          {rank && <span className="rank" aria-label={`Classement ${rank}`}>{String(rank).padStart(2, '0')}</span>}
          {score != null && <span className="score">{score}% de compatibilité</span>}
        </div>
      )}
      <p className="card-kicker">{offer.company || 'Entreprise non précisée'}</p>
      <h2>{offer.title || 'Offre sans titre'}</h2>
      {offer.description && <p className="card-description">{offer.description}</p>}
      <div className="tag-list" aria-label="Informations sur l’offre">
        {offer.field && <span>{offer.field}</span>}
        {offer.city && <span>{offer.city}</span>}
        {offer.duration != null && <span>{offer.duration} mois</span>}
        {offer.paid != null && <span>{offer.paid ? 'Rémunéré' : 'Non rémunéré'}</span>}
      </div>
      {offer.skills?.length > 0 && (
        <div className="skill-list" aria-label="Compétences">
          {offer.skills.slice(0, 6).map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      )}
    </article>
  )
}
