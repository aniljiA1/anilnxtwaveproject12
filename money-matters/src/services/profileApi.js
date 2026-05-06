// src/services/profileApi.js
import { HASURA_URL, HASURA_ADMIN_SECRET } from '../utils/constants'

const baseHeaders = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
}

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${HASURA_URL}${endpoint}`, options)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || err.message || `Error ${res.status}`)
  }
  return res.json()
}

// POST /get-user-id — { email, password } → { users: [{id, name, email, ...}] }
export const loginUser = ({ email, password }) =>
  request('/get-user-id', {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ email, password }),
  })

// GET /profile — needs x-hasura-user-id
export const fetchUserProfile = (userId) =>
  request('/profile', {
    method: 'GET',
    headers: {
      ...baseHeaders,
      'x-hasura-role': 'user',
      'x-hasura-user-id': String(userId),
    },
  })
