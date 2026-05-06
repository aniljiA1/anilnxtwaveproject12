// src/pages/Profile/index.jsx
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { fetchUserProfile } from '../../services/profileApi'
import { fetchAllTransactions } from '../../services/transactionApi'
import Loader from '../../components/common/Loader'
import UserProfile from '../../components/profile/UserProfile'
import { API_STATUS } from '../../utils/constants'
import './Profile.css'

const Profile = () => {
  const { userId } = useAppContext()
  const [user, setUser] = useState({})
  const [transactions, setTransactions] = useState([])
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)

  useEffect(() => {
    const load = async () => {
      try {
        const [profileData, txData] = await Promise.all([
          fetchUserProfile(userId),
          fetchAllTransactions(userId, 100, 0),
        ])
        console.log('Profile data:', profileData)
        const userList = profileData?.users || profileData?.profile || []
        setUser(Array.isArray(userList) ? userList[0] : userList)
        setTransactions(txData?.transactions || txData?.all_transactions || [])
        setApiStatus(API_STATUS.SUCCESS)
      } catch (err) {
        setApiStatus(API_STATUS.FAILURE)
      }
    }
    if (userId) load()
  }, [userId])

  if (apiStatus === API_STATUS.LOADING || apiStatus === API_STATUS.INITIAL) return <Loader />

  return (
    <div className="profile-page">
      <UserProfile user={user} transactions={transactions} />
    </div>
  )
}

export default Profile
