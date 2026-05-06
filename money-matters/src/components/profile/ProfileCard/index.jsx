// src/components/profile/ProfileCard/index.jsx
import { getInitials } from '../../../utils/helpers'
import { formatCurrency } from '../../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../../utils/constants'
import './ProfileCard.css'

const computeSummary = (transactions = []) => {
  let income = 0
  let expenses = 0
  transactions.forEach(({ transaction_type, amount }) => {
    const num = parseFloat(amount) || 0
    if (transaction_type === TRANSACTION_TYPES.CREDIT) income += num
    else expenses += num
  })
  return { income, expenses, count: transactions.length }
}

const ProfileCard = ({ user = {}, transactions = [] }) => {
  const { name, email } = user
  const { income, expenses, count } = computeSummary(transactions)
  const displayName = name || email || 'User'

  return (
    <div className="profile-card">
      <div className="profile-card-avatar">{getInitials(displayName)}</div>
      <div>
        <p className="profile-card-name">{displayName}</p>
        {email && <p className="profile-card-email">{email}</p>}
      </div>
      <div className="profile-card-divider" />
      <div className="profile-card-stats">
        <div className="profile-card-stat">
          <span className="profile-card-stat-value">{count}</span>
          <span className="profile-card-stat-label">Transactions</span>
        </div>
        <div className="profile-card-stat">
          <span className="profile-card-stat-value" style={{ color: 'var(--success)' }}>
            {formatCurrency(income)}
          </span>
          <span className="profile-card-stat-label">Income</span>
        </div>
        <div className="profile-card-stat">
          <span className="profile-card-stat-value" style={{ color: 'var(--danger)' }}>
            {formatCurrency(expenses)}
          </span>
          <span className="profile-card-stat-label">Expenses</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
