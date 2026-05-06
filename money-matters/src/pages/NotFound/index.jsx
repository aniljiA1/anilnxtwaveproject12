// src/pages/NotFound/index.jsx
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import { ROUTES } from '../../utils/constants'
import './NotFound.css'

const NotFound = () => (
  <div className="not-found-page">
    <p className="not-found-code">404</p>
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-subtitle">
      The page you are looking for doesn&apos;t exist or has been moved.
    </p>
    <Link to={ROUTES.DASHBOARD}>
      <Button>Go to Dashboard</Button>
    </Link>
  </div>
)

export default NotFound
