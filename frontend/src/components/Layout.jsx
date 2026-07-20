import { NavLink, Outlet } from 'react-router-dom'
import { useAccount } from '../context/AccountContext.jsx'

function navClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link'
}

export function Layout() {
  const { account } = useAccount()

  return (
    <>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="SkillMatch, accueil">
            SkillMatch
          </NavLink>
          <nav className="main-nav" aria-label="Navigation principale">
            <NavLink className={navClass} to="/offres">Offres</NavLink>
            <NavLink className={navClass} to="/recommandations">Recommandations</NavLink>
            <NavLink className={navClass} to="/entreprises">Entreprises</NavLink>
            <NavLink className={navClass} to="/etudiants">Étudiants</NavLink>
          </nav>
          <div className="header-actions">
            {account?.role === 'company' && (
              <NavLink className="button button-small button-accent" to="/publier">
                Publier
              </NavLink>
            )}
            <NavLink className="button button-small button-secondary" to={account ? '/compte' : '/connexion'}>
              {account ? 'Mon compte' : 'Connexion'}
            </NavLink>
          </div>
        </div>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="brand brand-inverse">SkillMatch</span>
          <p>Des compétences, une opportunité.</p>
          {import.meta.env.DEV && <NavLink to="/outils">Outils de développement</NavLink>}
        </div>
      </footer>
    </>
  )
}
