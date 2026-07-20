import { Link } from 'react-router-dom'
import { useAccount } from '../context/AccountContext.jsx'

export function HomePage() {
  const { account } = useAccount()

  return (
    <>
      <section className="home-hero">
        <div className="page-container hero-grid">
          <div>
            <p className="eyebrow">Stages et compétences</p>
            <h1>La bonne opportunité commence par le bon match.</h1>
            <p className="page-intro">
              SkillMatch rapproche les profils étudiants et les offres de stage selon leurs compétences.
            </p>
            <div className="button-row">
              <Link className="button" to="/offres">Voir les offres</Link>
              <Link className="button button-accent" to={account ? '/recommandations' : '/inscription'}>
                {account ? 'Mes recommandations' : 'Créer un compte'}
              </Link>
            </div>
          </div>
          <div className="match-panel" aria-label="Le principe SkillMatch">
            <span>Compétences</span>
            <div className="match-line" aria-hidden="true" />
            <strong>Opportunité</strong>
            <p>Un parcours simple, des résultats lisibles.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <p className="eyebrow">Comment ça marche</p>
          <h2 className="section-title">Trois étapes, rien de plus.</h2>
          <div className="steps-grid">
            <article><span>01</span><h3>Présentez votre profil</h3><p>Indiquez votre niveau, votre ville et vos compétences.</p></article>
            <article><span>02</span><h3>Découvrez les offres</h3><p>Explorez les opportunités et les entreprises disponibles.</p></article>
            <article><span>03</span><h3>Repérez le bon match</h3><p>Consultez les résultats produits par le modèle SkillMatch.</p></article>
          </div>
        </div>
      </section>

      <section className="page-section section-mint">
        <div className="page-container split-callout">
          <div><p className="eyebrow">Pour les entreprises</p><h2 className="section-title">Présentez vos stages simplement.</h2></div>
          <div><p>Créez votre compte entreprise, publiez une offre et rendez-la visible dans le catalogue.</p><Link className="text-link" to="/inscription">Inscrire mon entreprise</Link></div>
        </div>
      </section>
    </>
  )
}
