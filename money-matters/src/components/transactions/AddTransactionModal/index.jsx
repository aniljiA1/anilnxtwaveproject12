// src/components/transactions/AddTransactionModal/index.jsx
import { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../../common/Modal'
import Button from '../../common/Button'
import { addTransaction } from '../../../services/transactionApi'
import { TRANSACTION_TYPES } from '../../../utils/constants'
import './AddTransactionModal.css'

const CATEGORIES = [
  'Shopping','Food & Dining','Transportation','Entertainment',
  'Health & Fitness','Travel','Utilities','Education',
  'Salary','Investment','Freelance','Transfer','Other',
]

const INITIAL_FORM = {
  name: '',
  type: TRANSACTION_TYPES.DEBIT,
  category: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
}

const validate = ({ name, category, amount, date }) => {
  const e = {}
  if (!name.trim()) e.name = 'Name is required'
  if (!category) e.category = 'Category is required'
  if (!amount || isNaN(amount) || Number(amount) <= 0) e.amount = 'Enter a valid amount'
  if (!date) e.date = 'Date is required'
  return e
}

const AddTransactionModal = ({ isOpen, onClose, onSuccess, userId }) => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleClose = () => { setForm(INITIAL_FORM); setErrors({}); onClose() }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setIsSubmitting(true)
    try {
      // Hasura payload: name, type, category, amount, date, user_id
      const dateISO = new Date(form.date).toISOString()
      await addTransaction(userId, {
        name: form.name.trim(),
        type: form.type,
        category: form.category,
        amount: parseFloat(form.amount),
        date: dateISO,
        user_id: parseInt(userId),
      })
      toast.success('Transaction added!')
      handleClose()
      onSuccess()
    } catch (err) {
      toast.error(err.message || 'Failed to add transaction')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Transaction">
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="add-name">Transaction Name</label>
          <input id="add-name" name="name"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. Grocery Shopping"
            value={form.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="add-type">Type</label>
            <select id="add-type" name="type" className="form-select" value={form.type} onChange={handleChange}>
              <option value={TRANSACTION_TYPES.DEBIT}>Debit</option>
              <option value={TRANSACTION_TYPES.CREDIT}>Credit</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="add-amount">Amount (₹)</label>
            <input id="add-amount" name="amount" type="number" min="0" step="0.01"
              className={`form-input${errors.amount ? ' error' : ''}`}
              placeholder="0.00" value={form.amount} onChange={handleChange} />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="add-category">Category</label>
            <select id="add-category" name="category"
              className={`form-select${errors.category ? ' error' : ''}`}
              value={form.category} onChange={handleChange}>
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="add-date">Date</label>
            <input id="add-date" name="date" type="date"
              className={`form-input${errors.date ? ' error' : ''}`}
              value={form.date} onChange={handleChange} />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <Button variant="outline" type="button" onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTransactionModal
