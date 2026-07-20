export function LoadingState({ label = 'Chargement…', cards = 3 }) {
  return (
    <div className="card-grid" aria-label={label}>
      {Array.from({ length: cards }, (_, index) => (
        <div className="content-card skeleton-card" key={index} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ))}
      <p className="sr-only" role="status">{label}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry, title = 'Impossible de charger les données' }) {
  return (
    <div className="state-card" role="alert">
      <h2>{title}</h2>
      <p>{error?.message || 'Le serveur est momentanément indisponible.'}</p>
      {onRetry && <button className="button" type="button" onClick={onRetry}>Réessayer</button>}
    </div>
  )
}

export function EmptyState({ title, description, children }) {
  return (
    <div className="state-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  )
}

export function InlineNotice({ children, tone = 'info' }) {
  return <div className={`inline-notice inline-notice-${tone}`}>{children}</div>
}
