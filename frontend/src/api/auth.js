import { apiPost } from './client.js'
import { mapCompany } from './companies.js'
import { mapStudent } from './students.js'

const endpoints = {
  student: {
    register: '/api/auth/inscription-etudiant',
    login: '/api/auth/connexion-etudiant',
  },
  company: {
    register: '/api/auth/inscription-entreprise',
    login: '/api/auth/connexion-entreprise',
  },
}

function safeProfile(role, payload) {
  return role === 'company' ? mapCompany(payload) : mapStudent(payload)
}

export async function register(role, fields) {
  const payload = role === 'company'
    ? {
        email: fields.email,
        motDePasse: fields.password,
        nomEntreprise: fields.name,
        secteur: fields.sector,
      }
    : {
        email: fields.email,
        motDePasse: fields.password,
        nom: fields.name,
        niveauEtudes: fields.studyLevel,
        villePreferee: fields.city,
      }

  return safeProfile(role, await apiPost(endpoints[role].register, payload))
}

export async function login(role, fields) {
  const payload = await apiPost(endpoints[role].login, {
    email: fields.email,
    motDePasse: fields.password,
  })
  return safeProfile(role, payload)
}
