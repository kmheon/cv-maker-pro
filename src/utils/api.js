/**
 * Thin wrapper around the backend API.
 *
 * Uses relative paths so it works both:
 *  - in dev, via the Vite proxy configured in vite.config.js (-> localhost:4000)
 *  - in production, when the Express server serves this built frontend itself
 *    (same origin, so relative /api/... calls just work)
 */

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }

  return data
}

export function publishCv({ cvData, selectedTemplate, darkMode }) {
  return request('/api/cv', {
    method: 'POST',
    body: JSON.stringify({ cvData, selectedTemplate, darkMode }),
  })
}

export function updatePublishedCv(
  id,
  editToken,
  { cvData, selectedTemplate, darkMode }
) {
  return request(`/api/cv/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-edit-token': editToken,
    },
    body: JSON.stringify({ cvData, selectedTemplate, darkMode }),
  })
}

export function fetchPublishedCv(id) {
  return request(`/api/cv/${id}`)
}

export async function parseResumeFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/parse-resume', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }

  return data
}
