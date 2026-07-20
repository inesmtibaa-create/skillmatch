import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth.js'
import { FormField, RoleSwitch } from '../components/FormField.jsx'
import { InlineNotice } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useAccount } from '../context/AccountContext.jsx'

const initialFields = {
  name: '', email: '', password: '', confirmPassword: '', studyLevel: '', city: '', sector: '',
}

export function RegisterPage() {
  const [role, setRole] = useState('student')
  const [fields, setFields] = useState(initialFields)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const { openSession } = useAccount()
  const navigate = useNavigate()

  function update(event) {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (fields.password !== fields.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setStatus('loading')
    try {
      const profile = await register(role, fields)
      openSession(role, profile)
      navigate('/compte', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Inscription" title="Rejoignez SkillMatch." description="Choisissez votre profil et renseignez seulement l’essentiel." compact />
      <section className="page-section page-section-first">
        <div className="page-container form-container">
          <form className="form-card" onSubmit={submit}>
            <RoleSwitch value={role} onChange={setRole} />
            {error && <InlineNotice tone="error"><p role="alert">{error}</p></InlineNotice>}
            <div className="form-grid">
              <FormField label={role === 'company' ? 'Nom de l’entreprise' : 'Nom complet'} name="name">
                <input id="name" name="name" value={fields.name} onChange={update} required autoComplete="name" />
              </FormField>
              <FormField label="Adresse e-mail" name="email">
                <input id="email" name="email" type="email" value={fields.email} onChange={update} required autoComplete="email" />
              </FormField>
              {role === 'student' ? (
                <>
                  <FormField label="Niveau d’études" name="studyLevel">
                    <input id="studyLevel" name="studyLevel" value={fields.studyLevel} onChange={update} required placeholder="Ex. 3ème année" />
                  </FormField>
                  <FormField label="Ville préférée" name="city">
                    <input id="city" name="city" value={fields.city} onChange={update} required placeholder="Ex. Tunis" />
                  </FormField>
                </>
              ) : (
                <FormField label="Secteur d’activité" name="sector">
                  <input id="sector" name="sector" value={fields.sector} onChange={update} required placeholder="Ex. Développement web" />
                </FormField>
              )}
              <FormField label="Mot de passe" name="password">
                <input id="password" name="password" type="password" value={fields.password} onChange={update} required minLength="8" autoComplete="new-password" />
              </FormField>
              <FormField label="Confirmer le mot de passe" name="confirmPassword">
                <input id="confirmPassword" name="confirmPassword" type="password" value={fields.confirmPassword} onChange={update} required minLength="8" autoComplete="new-password" />
              </FormField>
            </div>
            <button className="button button-full" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Création…' : 'Créer mon compte'}
            </button>
            <p className="form-footer">Déjà inscrit ? <Link to="/connexion">Se connecter</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
