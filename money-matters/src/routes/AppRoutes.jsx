// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'
import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import { ROUTES } from '../utils/constants'
import { useAppContext } from '../context/AppContext'

const AppRoutes = () => {
  const { isAuthenticated } = useAppContext()

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />}
      />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
