// src/components/layout/Sidebar/index.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  MdDashboard,
  MdSwapHoriz,
  MdPerson,
  MdLogout,
  MdAttachMoney,
} from 'react-icons/md'
import { useAppContext } from '../../../context/AppContext'
import { ROUTES } from '../../../utils/constants'
import './Sidebar.css'

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', Icon: MdDashboard },
  { to: ROUTES.TRANSACTIONS, label: 'Transactions', Icon: MdSwapHoriz },
  { to: ROUTES.PROFILE, label: 'Profile', Icon: MdPerson },
]

const Sidebar = () => {
  const { logout, closeSidebar } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <MdAttachMoney />
        </div>
        <span className="sidebar-logo-text">Money Matters</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              ['sidebar-nav-link', isActive ? 'active' : ''].join(' ')
            }
            onClick={closeSidebar}
          >
            <Icon className="sidebar-nav-link-icon" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-logout">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <MdLogout style={{ fontSize: 20 }} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
