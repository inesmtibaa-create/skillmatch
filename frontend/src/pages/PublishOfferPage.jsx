import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createOffer } from '../api/offers.js'
import { FormField } from '../components/FormField.jsx'
import { InlineNotice } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { useAccount } from '../context/AccountContext.jsx'

const initialFields = { title: '', description: '', skills: '', field: '', city: '', duration: '', paid: false }

export function PublishOfferPage() {
  const { account } = useAccount()
  const [fields, setFields] = useState(initialFields)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  if (account?.role !== 'company') {
    return (
      <PageHeader eyebrow="Entreprises" title="Connectez un compte entreprise." description="La publication utilise l’identifiant de l’entreprise renvoyé par le backend.">
        <div className="button-row"><Link className="button" to="/connexion">Connexion entreprise</Link></div>
      </PageHeader>
    )
  }

  function update(event) {
    const { name, value, checked, type } = event.target
    setFields((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      await createOffer(fields, account.profile.id)
      setStatus('success')
      setMessage('L’offre a été envoyée au backend.')
      setFields(initialFields)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Entreprise" title="Publier une offre." description={`L’offre sera associée à ${account.profile.name || `l’entreprise #${account.profile.id}`}.`} compact />
      <section className="page-section page-section-first">
        <div className="page-container form-container">
          <form className="form-card" onSubmit={submit}>
            {message && <InlineNotice tone={status === 'success' ? 'success' : 'error'}><p role="status">{message}</p></InlineNotice>}
            <div className="form-grid">
              <FormField label="Titre" name="title"><input id="title" name="title" value={fields.title} onChange={update} required /></FormField>
              <FormField label="Domaine" name="field"><input id="field" name="field" value={fields.field} onChange={update} required placeholder="Ex. Dev Web" /></FormField>
              <FormField label="Ville" name="city"><input id="city" name="city" value={fields.city} onChange={update} required /></FormField>
              <FormField label="Durée en mois" name="duration"><input id="duration" name="duration" type="number" min="1" max="24" value={fields.duration} onChange={update} required /></FormField>
            </div>
            <FormField label="Description" name="description"><textarea id="description" name="description" rows="6" value={fields.description} onChange={update} required /></FormField>
            <FormField label="Compétences" name="skills" hint="Séparez les compétences par des virgules."><input id="skills" name="skills" value={fields.skills} onChange={update} required aria-describedby="skills-hint" /></FormField>
            <label className="checkbox-field"><input type="checkbox" name="paid" checked={fields.paid} onChange={update} /> Stage rémunéré</label>
            <button className="button button-full" type="submit" disabled={status === 'loading' || !account.profile.id}>
              {status === 'loading' ? 'Publication…' : 'Publier l’offre'}
            </button>
            {!account.profile.id && <p className="field-hint">Le backend n’a pas renvoyé d’identifiant d’entreprise.</p>}
          </form>
        </div>
      </section>
    </>
  )
}
