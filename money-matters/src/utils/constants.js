// src/utils/constants.js

export const HASURA_URL = 'https://bursting-gelding-24.hasura.app/api/rest'
export const HASURA_ADMIN_SECRET = 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF'

export const USER_ID_KEY = 'mm_user_id'
export const USER_EMAIL_KEY = 'mm_user_email'
export const AUTH_TOKEN_KEY = 'mm_token' // kept for compatibility

export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
}

export const API_STATUS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  TRANSACTIONS: '/transactions',
  PROFILE: '/profile',
}

export const CHART_COLORS = {
  CREDIT: '#16dbaa',
  DEBIT: '#fd5c63',
}

export const ITEMS_PER_PAGE = 10
