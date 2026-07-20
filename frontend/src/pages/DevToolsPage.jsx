import { useState } from 'react'
import { createRawCompany } from '../api/companies.js'
import { createRawStudent } from '../api/students.js'
import { FormField } from '../components/FormField.jsx'
import { InlineNotice } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'

function RawStudentForm() {
  const [fields, setFields] = useState({ name: '', email: '', password: '', studyLevel: '', field: '', skills: '', description: '', availability: '', city: '' })
  const [result, setResult] = useState(null)
  const [pending, setPending] = useState(false)

  function update(event) {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setPending(true)
    try {
      const profile = await createRawStudent(fields)
      setResult({ ok: true, text: `Étudiant créé : ${profile.name || profile.email}` })
    } catch (error) {
      setResult({ ok: false, text: error.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>POST /api/etudiants</h2>
      <p className="field-hint">Endpoint brut de démonstration. L’inscription publique utilise l’endpoint d’authentification.</p>
      {result && <InlineNotice tone={result.ok ? 'success' : 'error'}><p role="status">{result.text}</p></InlineNotice>}
      <div className="form-grid">
        <FormField label="Nom" name="raw-student-name"><input id="raw-student-name" name="name" value={fields.name} onChange={update} required /></FormField>
        <FormField label="E-mail" name="raw-student-email"><input id="raw-student-email" name="email" type="email" value={fields.email} onChange={update} required /></FormField>
        <FormField label="Mot de passe" name="raw-student-password"><input id="raw-student-password" name="password" type="password" value={fields.password} onChange={update} required /></FormField>
        <FormField label="Niveau" name="raw-student-level"><input id="raw-student-level" name="studyLevel" value={fields.studyLevel} onChange={update} /></FormField>
        <FormField label="Domaine" name="raw-student-field"><input id="raw-student-field" name="field" value={fields.field} onChange={update} /></FormField>
        <FormField label="Ville" name="raw-student-city"><input id="raw-student-city" name="city" value={fields.city} onChange={update} /></FormField>
        <FormField label="Disponibilité (mois)" name="raw-student-availability"><input id="raw-student-availability" name="availability" type="number" min="1" value={fields.availability} onChange={update} /></FormField>
        <FormField label="Compétences" name="raw-student-skills"><input id="raw-student-skills" name="skills" value={fields.skills} onChange={update} placeholder="Python, SQL" /></FormField>
      </div>
      <FormField label="Description" name="raw-student-description"><textarea id="raw-student-description" name="description" rows="3" value={fields.description} onChange={update} /></FormField>
      <button className="button" type="submit" disabled={pending}>{pending ? 'Envoi…' : 'Créer via l’endpoint brut'}</button>
    </form>
  )
}

function RawCompanyForm() {
  const [fields, setFields] = useState({ name: '', email: '', password: '', sector: '', description: '' })
  const [result, setResult] = useState(null)
  const [pending, setPending] = useState(false)

  function update(event) {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setPending(true)
    try {
      const profile = await createRawCompany(fields)
      setResult({ ok: true, text: `Entreprise créée : ${profile.name || profile.email}` })
    } catch (error) {
      setResult({ ok: false, text: error.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>POST /api/entreprises</h2>
      <p className="field-hint">Endpoint brut de démonstration. L’inscription publique utilise l’endpoint d’authentification.</p>
      {result && <InlineNotice tone={result.ok ? 'success' : 'error'}><p role="status">{result.text}</p></InlineNotice>}
      <div className="form-grid">
        <FormField label="Nom" name="raw-company-name"><input id="raw-company-name" name="name" value={fields.name} onChange={update} required /></FormField>
        <FormField label="E-mail" name="raw-company-email"><input id="raw-company-email" name="email" type="email" value={fields.email} onChange={update} required /></FormField>
        <FormField label="Mot de passe" name="raw-company-password"><input id="raw-company-password" name="password" type="password" value={fields.password} onChange={update} required /></FormField>
        <FormField label="Secteur" name="raw-company-sector"><input id="raw-company-sector" name="sector" value={fields.sector} onChange={update} /></FormField>
      </div>
      <FormField label="Description" name="raw-company-description"><textarea id="raw-company-description" name="description" rows="3" value={fields.description} onChange={update} /></FormField>
      <button className="button" type="submit" disabled={pending}>{pending ? 'Envoi…' : 'Créer via l’endpoint brut'}</button>
    </form>
  )
}

export function DevToolsPage() {
  return (
    <>
      <PageHeader eyebrow="Développement uniquement" title="Couverture des endpoints bruts." description="Cette page n’existe pas dans la version de production." compact />
      <section className="page-section page-section-first">
        <div className="page-container dev-tools-grid">
          <InlineNotice tone="warning"><p>Ces routes contournent les contrôleurs d’inscription avec hachage. Utilisez uniquement des données locales de démonstration.</p></InlineNotice>
          <RawStudentForm />
          <RawCompanyForm />
        </div>
      </section>
    </>
  )
}
