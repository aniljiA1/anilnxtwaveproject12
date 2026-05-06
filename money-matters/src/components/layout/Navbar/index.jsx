// src/components/layout/Navbar/index.jsx
import { useLocation } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { useAppContext } from '../../../context/AppContext'
import { getInitials } from '../../../utils/helpers'
import { ROUTES } from '../../../utils/constants'
import './Navbar.css'

const PAGE_TITLES = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.TRANSACTIONS]: 'Transactions',
  [ROUTES.PROFILE]: 'Profile',
}

const Navbar = () => {
  const { userEmail, toggleSidebar } = useAppContext()
  const { pathname } = useLocation()

  const pageTitle = PAGE_TITLES[pathname] || 'Money Matters'
  const initials = getInitials(userEmail)

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-hamburger"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <MdMenu />
        </button>
        <h1 className="navbar-page-title">{pageTitle}</h1>
      </div>
      <div className="navbar-right">
        <span className="navbar-user-email">{userEmail}</span>
        <div className="navbar-avatar" aria-label={`User: ${userEmail}`}>
          {initials}
        </div>
      </div>
    </header>
  )
}

export default Navbar
