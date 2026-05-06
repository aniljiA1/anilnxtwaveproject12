// src/pages/Dashboard/index.jsx
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { fetchAllTransactions, fetchTotals } from '../../services/transactionApi'
import Loader from '../../components/common/Loader'
import BalanceCards from '../../components/dashboard/BalanceCards'
import TransactionList from '../../components/dashboard/TransactionList'
import OverviewChart from '../../components/dashboard/OverviewChart'
import { API_STATUS } from '../../utils/constants'
import './Dashboard.css'

const Dashboard = () => {
  const { userId } = useAppContext()
  const [transactions, setTransactions] = useState([])
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setApiStatus(API_STATUS.LOADING)
      try {
        const data = await fetchAllTransactions(userId, 100, 0)
        console.log('Transactions response:', data)
        // Hasura returns { transactions: [...] } or { all_transactions: [...] }
        const list = data?.transactions || data?.all_transactions || []
        setTransactions(list)
        setApiStatus(API_STATUS.SUCCESS)
      } catch (err) {
        setError(err.message)
        setApiStatus(API_STATUS.FAILURE)
      }
    }
    if (userId) load()
  }, [userId])

  if (apiStatus === API_STATUS.LOADING) return <Loader />

  if (apiStatus === API_STATUS.FAILURE) {
    return (
      <div style={{ background:'var(--danger-light)', color:'var(--danger)', borderRadius:8, padding:'16px 24px', display:'flex', justifyContent:'space-between' }}>
        <span>{error}</span>
        <button onClick={() => setApiStatus(API_STATUS.LOADING)} style={{ fontWeight:600, color:'var(--danger)', background:'none', border:'none', cursor:'pointer' }}>Retry</button>
      </div>
    )
  }

  return (
    <>
      <BalanceCards transactions={transactions} />
      <div className="dashboard-grid">
        <TransactionList transactions={transactions} />
        <OverviewChart transactions={transactions} />
      </div>
    </>
  )
}

export default Dashboard
