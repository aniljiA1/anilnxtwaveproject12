// src/components/layout/AppLayout/index.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { useAppContext } from '../../../context/AppContext'
import './AppLayout.css'

const AppLayout = () => {
  const { isSidebarOpen, closeSidebar } = useAppContext()

  return (
    <div className="app-layout">
      <div className={`sidebar-container${isSidebarOpen ? ' open' : ''}`}>
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="sidebar-backdrop visible"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <main className="app-main">
        <Navbar />
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
