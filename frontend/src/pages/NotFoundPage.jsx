import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader.jsx'

export function NotFoundPage() {
  return (
    <PageHeader eyebrow="404" title="Cette page n’existe pas." description="Revenez à l’accueil pour continuer.">
      <div className="button-row"><Link className="button" to="/">Retour à l’accueil</Link></div>
    </PageHeader>
  )
}
