import { Link, useNavigate } from 'react-router-dom'
import { InlineNotice } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useAccount } from '../context/AccountContext.jsx'

export function AccountPage() {
  const { account, closeSession } = useAccount()
  const navigate = useNavigate()

  if (!account) {
    return (
      <PageHeader eyebrow="Compte" title="Vous n’êtes pas connecté." description="Connectez-vous pour afficher le profil retourné par le backend.">
        <div className="button-row"><Link className="button" to="/connexion">Se connecter</Link></div>
      </PageHeader>
    )
  }

  const { profile, role } = account
  const fields = role === 'company'
    ? [
        ['Nom', profile.name], ['E-mail', profile.email], ['Secteur', profile.sector], ['Description', profile.description],
      ]
    : [
        ['Nom', profile.name], ['E-mail', profile.email], ['Niveau', profile.studyLevel], ['Domaine', profile.field], ['Ville', profile.city],
      ]

  function logout() {
    closeSession()
    navigate('/', { replace: true })
  }

  return (
    <>
      <PageHeader eyebrow={role === 'company' ? 'Compte entreprise' : 'Compte étudiant'} title={profile.name || 'Mon compte'} compact />
      <section className="page-section page-section-first">
        <div className="page-container account-layout">
          <InlineNotice><p><strong>Session de démonstration :</strong> le backend renvoie un profil, mais aucun jeton ou cookie de session sécurisé.</p></InlineNotice>
          <div className="detail-card">
            <dl className="detail-list">
              {fields.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            {role === 'student' && profile.skills?.length > 0 && <div className="skill-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}
            <div className="button-row">
              {role === 'company' && <Link className="button button-accent" to="/publier">Publier une offre</Link>}
              <button className="button button-secondary" type="button" onClick={logout}>Se déconnecter</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
