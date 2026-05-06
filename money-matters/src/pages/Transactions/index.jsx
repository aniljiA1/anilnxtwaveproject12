// src/pages/Transactions/index.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAppContext } from '../../context/AppContext'
import useModal from '../../hooks/useModal'
import { fetchAllTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../services/transactionApi'
import { toast } from 'react-toastify'
import Loader from '../../components/common/Loader'
import TransactionTable from '../../components/transactions/TransactionTable'
import AddTransactionModal from '../../components/transactions/AddTransactionModal'
import EditTransactionModal from '../../components/transactions/EditTransactionModal'
import DeleteModal from '../../components/transactions/DeleteModal'
import { API_STATUS } from '../../utils/constants'
import './Transactions.css'

const Transactions = () => {
  const { userId } = useAppContext()
  const [transactions, setTransactions] = useState([])
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)
  const [error, setError] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const addModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const loadTransactions = useCallback(async () => {
    setApiStatus(API_STATUS.LOADING)
    try {
      const data = await fetchAllTransactions(userId, 100, 0)
      const list = data?.transactions || data?.all_transactions || []
      setTransactions(list)
      setApiStatus(API_STATUS.SUCCESS)
    } catch (err) {
      setError(err.message)
      setApiStatus(API_STATUS.FAILURE)
    }
  }, [userId])

  useEffect(() => { if (userId) loadTransactions() }, [userId, loadTransactions])

  const handleEdit = (t) => { setSelectedTransaction(t); editModal.openModal() }
  const handleDelete = (t) => { setSelectedTransaction(t); deleteModal.openModal() }

  if (apiStatus === API_STATUS.LOADING) return <Loader />
  if (apiStatus === API_STATUS.FAILURE) return (
    <div style={{ background:'var(--danger-light)', color:'var(--danger)', borderRadius:8, padding:'16px 24px' }}>
      {error} <button onClick={loadTransactions} style={{ marginLeft:16, fontWeight:600, color:'var(--danger)', background:'none', border:'none', cursor:'pointer' }}>Retry</button>
    </div>
  )

  return (
    <div className="transactions-page">
      <TransactionTable
        transactions={transactions}
        onAdd={addModal.openModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddTransactionModal isOpen={addModal.isOpen} onClose={addModal.closeModal} onSuccess={loadTransactions} userId={userId} />
      <EditTransactionModal isOpen={editModal.isOpen} onClose={editModal.closeModal} transaction={selectedTransaction} onSuccess={loadTransactions} userId={userId} />
      <DeleteModal isOpen={deleteModal.isOpen} onClose={deleteModal.closeModal} transaction={selectedTransaction} onSuccess={loadTransactions} userId={userId} />
    </div>
  )
}

export default Transactions
