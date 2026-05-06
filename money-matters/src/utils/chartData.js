// src/utils/chartData.js
import { TRANSACTION_TYPES } from './constants'

export const buildMonthlyChartData = (transactions = []) => {
  const monthMap = {}
  transactions.forEach(({ type, transaction_type, amount, date }) => {
    const txType = type || transaction_type
    const key = new Date(date).toLocaleString('default', { month: 'short', year: '2-digit' })
    if (!monthMap[key]) monthMap[key] = { name: key, credit: 0, debit: 0 }
    const num = parseFloat(amount) || 0
    if (txType === TRANSACTION_TYPES.CREDIT) monthMap[key].credit += num
    else monthMap[key].debit += num
  })
  return Object.values(monthMap).slice(-6)
}

export const buildPieData = (transactions = []) => {
  let credit = 0, debit = 0
  transactions.forEach(({ type, transaction_type, amount }) => {
    const txType = type || transaction_type
    const num = parseFloat(amount) || 0
    if (txType === TRANSACTION_TYPES.CREDIT) credit += num
    else debit += num
  })
  return [
    { name: 'Income', value: credit },
    { name: 'Expenses', value: debit },
  ]
}
