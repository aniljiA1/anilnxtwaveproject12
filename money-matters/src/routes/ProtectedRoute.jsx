// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { ROUTES } from '../utils/constants'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return children
}

export default ProtectedRoute
