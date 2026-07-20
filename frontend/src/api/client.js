export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const text = await response.text()
  let payload = null

  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = text
    }
  }

  if (!response.ok) {
    const message = typeof payload === 'string'
      ? payload
      : payload?.message || `La requête a échoué (${response.status}).`
    throw new ApiError(message, response.status, payload)
  }

  return payload
}

export function apiGet(path, options) {
  return request(path, { ...options, method: 'GET' })
}

export function apiPost(path, body, options) {
  return request(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  })
}
