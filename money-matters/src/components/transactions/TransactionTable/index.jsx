// src/components/transactions/TransactionTable/index.jsx
import { useState, useMemo } from 'react'
import TransactionRow from '../TransactionRow'
import EmptyView from '../../common/EmptyView'
import Button from '../../common/Button'
import { ITEMS_PER_PAGE, TRANSACTION_TYPES } from '../../../utils/constants'
import './TransactionTable.css'

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Transactions' },
  { value: TRANSACTION_TYPES.CREDIT, label: 'Credit' },
  { value: TRANSACTION_TYPES.DEBIT, label: 'Debit' },
]

const TransactionTable = ({ transactions = [], onEdit, onDelete, onAdd }) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return transactions.filter(({ transaction_name, category, transaction_type }) => {
      const matchesSearch =
        !q ||
        transaction_name.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q)
      const matchesFilter =
        filter === 'all' || transaction_type === filter
      return matchesSearch && matchesFilter
    })
  }, [transactions, search, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setPage(1)
  }

  return (
    <div className="transaction-table-container">
      <div className="transaction-table-toolbar">
        <span className="transaction-table-toolbar-title">
          All Transactions ({filtered.length})
        </span>
        <div className="transaction-table-toolbar-actions">
          <input
            type="text"
            className="transaction-search-input"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search transactions"
          />
          <select
            className="transaction-filter-select"
            value={filter}
            onChange={handleFilterChange}
            aria-label="Filter by type"
          >
            {FILTER_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Button onClick={onAdd} size="sm">
            + Add Transaction
          </Button>
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyView
          title="No transactions found"
          subtitle="Try adjusting your search or filters."
        />
      ) : (
        <table className="transaction-table">
          <thead className="transaction-table-head">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}

      <div className="transaction-table-footer">
        <span className="pagination-info">
          Page {safePage} of {totalPages}
        </span>
        <div className="pagination-buttons">
          <button
            className="pagination-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={safePage === 1}
          >
            Previous
          </button>
          <button
            className="pagination-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionTable
