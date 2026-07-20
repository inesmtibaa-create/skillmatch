import { apiGet, apiPost } from './client.js'

function normalizeSkills(skills) {
  if (Array.isArray(skills)) return skills.filter(Boolean)
  if (typeof skills !== 'string') return []
  return skills.split(/[,;]+/).map((skill) => skill.trim()).filter(Boolean)
}

export function mapStudent(student = {}) {
  return {
    id: student.id ?? null,
    email: student.email || '',
    name: student.nom || '',
    studyLevel: student.niveauEtudes || '',
    field: student.domaineInteret || '',
    skills: normalizeSkills(student.competences),
    description: student.descriptionProfil || '',
    availability: student.disponibiliteMois ?? null,
    city: student.villePreferee || '',
  }
}

export async function getStudents() {
  const payload = await apiGet('/api/etudiants')
  return Array.isArray(payload) ? payload.map(mapStudent) : []
}

export async function createRawStudent(fields) {
  return mapStudent(await apiPost('/api/etudiants', {
    email: fields.email,
    motDePasse: fields.password,
    nom: fields.name,
    niveauEtudes: fields.studyLevel,
    domaineInteret: fields.field,
    competences: fields.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
    descriptionProfil: fields.description,
    disponibiliteMois: Number(fields.availability) || null,
    villePreferee: fields.city,
  }))
}
