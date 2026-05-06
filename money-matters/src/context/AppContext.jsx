// src/context/AppContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'
import { USER_ID_KEY, USER_EMAIL_KEY } from '../utils/constants'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem(USER_ID_KEY)
  )
  const [userId, setUserId] = useState(() => localStorage.getItem(USER_ID_KEY) || null)
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem(USER_EMAIL_KEY) || '')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const login = useCallback(({ userId: id, email }) => {
    localStorage.setItem(USER_ID_KEY, String(id))
    localStorage.setItem(USER_EMAIL_KEY, String(email))
    setIsAuthenticated(true)
    setUserId(String(id))
    setUserEmail(String(email))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(USER_ID_KEY)
    localStorage.removeItem(USER_EMAIL_KEY)
    setIsAuthenticated(false)
    setUserId(null)
    setUserEmail('')
  }, [])

  const toggleSidebar = useCallback(() => setIsSidebarOpen(p => !p), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  return (
    <AppContext.Provider value={{
      isAuthenticated, userId, userEmail,
      login, logout, isSidebarOpen, toggleSidebar, closeSidebar,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}

export default AppContext
