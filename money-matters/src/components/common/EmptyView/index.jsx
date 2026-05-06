// src/components/common/EmptyView/index.jsx
import { MdInbox } from 'react-icons/md'
import './EmptyView.css'

const EmptyView = ({ title = 'No data found', subtitle = '' }) => (
  <div className="empty-view">
    <MdInbox className="empty-view-icon" />
    <p className="empty-view-title">{title}</p>
    {subtitle && <p className="empty-view-subtitle">{subtitle}</p>}
  </div>
)

export default EmptyView
