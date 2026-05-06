// src/services/transactionApi.js
import { HASURA_URL, HASURA_ADMIN_SECRET } from '../utils/constants'

const getHeaders = (userId) => ({
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  'x-hasura-role': 'user',
  'x-hasura-user-id': String(userId),
})

const request = async (url, options = {}) => {
  const res = await fetch(url, options)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(
      err.error || err.message || `Error ${res.status}`
    )
  }
  return res.json()
}

// Hasura REST: GET with variables passed as query string
export const fetchAllTransactions = (userId) =>
  request(
    `${HASURA_URL}/all-transactions?limit=100&offset=0`,
    {
      method: 'GET',
      headers: getHeaders(userId),
    }
  )

export const fetchTotals = (userId) =>
  request(`${HASURA_URL}/credit-debit-totals`, {
    method: 'GET',
    headers: getHeaders(userId),
  })

export const fetchDaywiseTotals = (userId) =>
  request(`${HASURA_URL}/daywise-totals-7-days`, {
    method: 'GET',
    headers: getHeaders(userId),
  })

export const addTransaction = (userId, payload) =>
  request(`${HASURA_URL}/add-transaction`, {
    method: 'POST',
    headers: getHeaders(userId),
    body: JSON.stringify(payload),
  })

export const updateTransaction = (userId, payload) =>
  request(`${HASURA_URL}/update-transaction`, {
    method: 'POST',
    headers: getHeaders(userId),
    body: JSON.stringify(payload),
  })

export const deleteTransaction = (userId, id) =>
  request(`${HASURA_URL}/delete-transaction`, {
    method: 'DELETE',
    headers: getHeaders(userId),
    body: JSON.stringify({ id: String(id) }),
  })
