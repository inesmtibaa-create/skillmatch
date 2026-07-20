import { apiGet, apiPost } from './client.js'

function normalizeSkills(skills) {
  if (Array.isArray(skills)) return skills.filter(Boolean)
  if (typeof skills !== 'string') return []
  return skills.split(/[,;]+/).map((skill) => skill.trim()).filter(Boolean)
}

export function mapOffer(offer = {}) {
  const company = typeof offer.entreprise === 'object'
    ? offer.entreprise?.nomEntreprise
    : offer.entreprise

  return {
    id: offer.id ?? null,
    title: offer.titre || '',
    company: company || '',
    description: offer.description || '',
    city: offer.ville || '',
    field: offer.domaine || '',
    skills: normalizeSkills(offer.competences),
    duration: offer.dureeMois ?? null,
    paid: offer.remunere ?? null,
  }
}

export async function getOffers() {
  const payload = await apiGet('/api/offres')
  return Array.isArray(payload) ? payload.map(mapOffer) : []
}

export async function createOffer(fields, companyId) {
  return mapOffer(await apiPost('/api/offres', {
    titre: fields.title,
    entreprise: { id: Number(companyId) },
    ville: fields.city,
    domaine: fields.field,
    description: fields.description,
    competences: fields.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
    dureeMois: Number(fields.duration),
    remunere: Boolean(fields.paid),
  }))
}
