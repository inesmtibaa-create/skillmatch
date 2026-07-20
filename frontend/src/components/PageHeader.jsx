export function PageHeader({ eyebrow, title, description, children, compact = false }) {
  return (
    <header className={compact ? 'page-header page-header-compact' : 'page-header'}>
      <div className="page-container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-intro">{description}</p>}
        {children}
      </div>
    </header>
  )
}
