// src/services/api.js
import { HASURA_URL, HASURA_ADMIN_SECRET } from '../utils/constants'

// Build headers for Hasura REST API
export const buildHeaders = (userId = null, role = 'user') => {
  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    'x-hasura-role': role,
  }
  if (userId && role === 'user') {
    headers['x-hasura-user-id'] = String(userId)
  }
  return headers
}

export const apiRequest = async (endpoint, options = {}, userId = null, role = 'user') => {
  const url = `${HASURA_URL}${endpoint}`
  const config = {
    ...options,
    headers: {
      ...buildHeaders(userId, role),
      ...(options.headers || {}),
    },
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.error || errorData.message || `Error ${response.status}`
    )
  }

  if (response.status === 204 || options.method === 'DELETE') {
    return response.json().catch(() => ({}))
  }

  return response.json()
}

export default apiRequest
