// src/components/transactions/EditTransactionModal/index.jsx
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Modal from '../../common/Modal'
import Button from '../../common/Button'
import { updateTransaction } from '../../../services/transactionApi'
import { TRANSACTION_TYPES } from '../../../utils/constants'
import './EditTransactionModal.css'

const CATEGORIES = [
  'Shopping','Food & Dining','Transportation','Entertainment',
  'Health & Fitness','Travel','Utilities','Education',
  'Salary','Investment','Freelance','Transfer','Other',
]

const validate = ({ name, category, amount, date }) => {
  const e = {}
  if (!name.trim()) e.name = 'Name is required'
  if (!category) e.category = 'Category is required'
  if (!amount || isNaN(amount) || Number(amount) <= 0) e.amount = 'Enter a valid amount'
  if (!date) e.date = 'Date is required'
  return e
}

const EditTransactionModal = ({ isOpen, onClose, transaction, onSuccess, userId }) => {
  const [form, setForm] = useState({ name:'', type: TRANSACTION_TYPES.DEBIT, category:'', amount:'', date:'' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (transaction) {
      setForm({
        name: transaction.transaction_name || transaction.name || '',
        type: transaction.type || transaction.transaction_type || TRANSACTION_TYPES.DEBIT,
        category: transaction.category || '',
        amount: transaction.amount || '',
        date: transaction.date
          ? transaction.date.split('T')[0]
          : new Date().toISOString().split('T')[0],
      })
      setErrors({})
    }
  }, [transaction])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setIsSubmitting(true)
    try {
      // Hasura update payload: id, name, type, category, amount, date
      const dateISO = new Date(form.date).toISOString()
      await updateTransaction(userId, {
        id: transaction.id,
        name: form.name.trim(),
        type: form.type,
        category: form.category,
        amount: parseFloat(form.amount),
        date: dateISO,
      })
      toast.success('Transaction updated!')
      onClose()
      onSuccess()
    } catch (err) {
      toast.error(err.message || 'Failed to update')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-name">Transaction Name</label>
          <input id="edit-name" name="name"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. Grocery Shopping"
            value={form.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="edit-type">Type</label>
            <select id="edit-type" name="type" className="form-select" value={form.type} onChange={handleChange}>
              <option value={TRANSACTION_TYPES.DEBIT}>Debit</option>
              <option value={TRANSACTION_TYPES.CREDIT}>Credit</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-amount">Amount (₹)</label>
            <input id="edit-amount" name="amount" type="number" min="0" step="0.01"
              className={`form-input${errors.amount ? ' error' : ''}`}
              placeholder="0.00" value={form.amount} onChange={handleChange} />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="edit-category">Category</label>
            <select id="edit-category" name="category"
              className={`form-select${errors.category ? ' error' : ''}`}
              value={form.category} onChange={handleChange}>
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-date">Date</label>
            <input id="edit-date" name="date" type="date"
              className={`form-input${errors.date ? ' error' : ''}`}
              value={form.date} onChange={handleChange} />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditTransactionModal
