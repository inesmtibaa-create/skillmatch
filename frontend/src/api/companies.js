import { apiGet, apiPost } from './client.js'

export function mapCompany(company = {}) {
  return {
    id: company.id ?? null,
    email: company.email || '',
    name: company.nomEntreprise || company.nom || '',
    sector: company.secteur || company.secteurActivite || '',
    description: company.description || company.descriptionEntreprise || '',
    logo: company.logo || '',
  }
}

export async function getCompanies() {
  const payload = await apiGet('/api/entreprises')
  return Array.isArray(payload) ? payload.map(mapCompany) : []
}

export async function getCompany(id) {
  return mapCompany(await apiGet(`/api/entreprises/${encodeURIComponent(id)}`))
}

export async function createRawCompany(fields) {
  return mapCompany(await apiPost('/api/entreprises', {
    email: fields.email,
    motDePasse: fields.password,
    nomEntreprise: fields.name,
    secteur: fields.sector,
    description: fields.description,
  }))
}
