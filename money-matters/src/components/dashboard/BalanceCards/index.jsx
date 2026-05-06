// src/components/dashboard/BalanceCards/index.jsx
import { MdAccountBalance, MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { formatCurrency } from '../../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../../utils/constants'
import './BalanceCards.css'

const computeTotals = (transactions = []) => {
  let income = 0, expenses = 0
  transactions.forEach((t) => {
    const num = parseFloat(t.amount) || 0
    // Hasura returns 'type', fallback to 'transaction_type'
    const type = t.type || t.transaction_type
    if (type === TRANSACTION_TYPES.CREDIT) income += num
    else expenses += num
  })
  return { income, expenses, balance: income - expenses }
}

const BalanceCards = ({ transactions = [] }) => {
  const { income, expenses, balance } = computeTotals(transactions)
  return (
    <div className="balance-cards-grid">
      <div className="balance-card">
        <div className="balance-card-icon balance"><MdAccountBalance /></div>
        <div className="balance-card-info">
          <span className="balance-card-label">Total Balance</span>
          <span className="balance-card-amount">{formatCurrency(balance)}</span>
        </div>
      </div>
      <div className="balance-card">
        <div className="balance-card-icon income"><MdTrendingUp /></div>
        <div className="balance-card-info">
          <span className="balance-card-label">Total Income</span>
          <span className="balance-card-amount">{formatCurrency(income)}</span>
        </div>
      </div>
      <div className="balance-card">
        <div className="balance-card-icon expense"><MdTrendingDown /></div>
        <div className="balance-card-info">
          <span className="balance-card-label">Total Expenses</span>
          <span className="balance-card-amount">{formatCurrency(expenses)}</span>
        </div>
      </div>
    </div>
  )
}

export default BalanceCards
