// src/components/dashboard/TransactionList/index.jsx
import { Link } from 'react-router-dom'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { formatCurrency } from '../../../utils/formatCurrency'
import { formatDate } from '../../../utils/helpers'
import { TRANSACTION_TYPES, ROUTES } from '../../../utils/constants'
import EmptyView from '../../common/EmptyView'
import './TransactionList.css'

const TransactionItem = ({ transaction: t }) => {
  // Hasura: name, type, category, amount, date
  const name = t.transaction_name || t.name
  const type = t.type || t.transaction_type
  const isCredit = type === TRANSACTION_TYPES.CREDIT

  return (
    <div className="transaction-item">
      <div className={`transaction-item-icon ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? <MdArrowDownward /> : <MdArrowUpward />}
      </div>
      <div className="transaction-item-info">
        <p className="transaction-item-name">{name}</p>
        <p className="transaction-item-category">{t.category}</p>
      </div>
      <div className="transaction-item-right">
        <span className={`transaction-item-amount ${isCredit ? 'credit' : 'debit'}`}>
          {isCredit ? '+' : '-'} {formatCurrency(t.amount)}
        </span>
        <span className="transaction-item-date">{formatDate(t.date)}</span>
      </div>
    </div>
  )
}

const TransactionList = ({ transactions = [] }) => (
  <div className="dashboard-transaction-list">
    <div className="section-header">
      <h2 className="section-title">Last Transactions</h2>
      <Link to={ROUTES.TRANSACTIONS} className="section-link">View all</Link>
    </div>
    {transactions.length === 0
      ? <EmptyView title="No recent transactions" />
      : <div className="transaction-items">
          {transactions.slice(0, 5).map(t => <TransactionItem key={t.id} transaction={t} />)}
        </div>
    }
  </div>
)

export default TransactionList
