// src/components/transactions/DeleteModal/index.jsx
import { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../../common/Modal'
import Button from '../../common/Button'
import { deleteTransaction } from '../../../services/transactionApi'
import './DeleteModal.css'

const DeleteModal = ({ isOpen, onClose, transaction, onSuccess, userId }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTransaction(userId, transaction.id)
      toast.success('Transaction deleted!')
      onClose()
      onSuccess()
    } catch (err) {
      toast.error(err.message || 'Failed to delete')
    } finally {
      setIsDeleting(false)
    }
  }

  const name = transaction?.transaction_name || transaction?.name || 'this transaction'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Transaction">
      <div className="delete-modal-body">
        <p className="delete-modal-text">
          Are you sure you want to delete{' '}
          <span className="delete-modal-name">{name}</span>?
          This action cannot be undone.
        </p>
        <div className="delete-modal-actions">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
