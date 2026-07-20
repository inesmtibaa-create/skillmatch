import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth.js'
import { FormField, RoleSwitch } from '../components/FormField.jsx'
import { InlineNotice } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useAccount } from '../context/AccountContext.jsx'

export function LoginPage() {
  const [role, setRole] = useState('student')
  const [fields, setFields] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const { openSession } = useAccount()
  const navigate = useNavigate()

  function update(event) {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const profile = await login(role, fields)
      openSession(role, profile)
      navigate('/compte', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Connexion" title="Bon retour." description="Le backend utilise une connexion distincte pour chaque rôle." compact />
      <section className="page-section page-section-first">
        <div className="page-container form-container form-container-small">
          <form className="form-card" onSubmit={submit}>
            <RoleSwitch value={role} onChange={setRole} />
            {error && <InlineNotice tone="error"><p role="alert">{error}</p></InlineNotice>}
            <FormField label="Adresse e-mail" name="email">
              <input id="email" name="email" type="email" value={fields.email} onChange={update} required autoComplete="email" />
            </FormField>
            <FormField label="Mot de passe" name="password">
              <input id="password" name="password" type="password" value={fields.password} onChange={update} required autoComplete="current-password" />
            </FormField>
            <button className="button button-full" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Connexion…' : 'Se connecter'}
            </button>
            <p className="form-footer">Pas encore de compte ? <Link to="/inscription">S’inscrire</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
