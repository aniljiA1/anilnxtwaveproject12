// src/components/transactions/TransactionRow/index.jsx
import { MdEdit, MdDelete, MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { formatCurrency } from '../../../utils/formatCurrency'
import { formatDate } from '../../../utils/helpers'
import { TRANSACTION_TYPES } from '../../../utils/constants'
import './TransactionRow.css'

const TransactionRow = ({ transaction: t, onEdit, onDelete }) => {
  const name = t.transaction_name || t.name
  const type = t.type || t.transaction_type
  const isCredit = type === TRANSACTION_TYPES.CREDIT

  return (
    <tr className="transaction-row">
      <td>{name}</td>
      <td>{t.category}</td>
      <td>{formatDate(t.date)}</td>
      <td>
        <span className={`transaction-type-badge ${isCredit ? 'credit' : 'debit'}`}>
          {isCredit ? <MdArrowDownward /> : <MdArrowUpward />}
          {isCredit ? 'Credit' : 'Debit'}
        </span>
      </td>
      <td>
        <span className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
          {isCredit ? '+' : '-'} {formatCurrency(t.amount)}
        </span>
      </td>
      <td>
        <div className="transaction-actions">
          <button className="action-icon-btn edit" onClick={() => onEdit(t)} aria-label="Edit">
            <MdEdit />
          </button>
          <button className="action-icon-btn delete" onClick={() => onDelete(t)} aria-label="Delete">
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TransactionRow
