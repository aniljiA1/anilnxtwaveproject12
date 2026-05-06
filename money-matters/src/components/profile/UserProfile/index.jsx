// src/components/profile/UserProfile/index.jsx
import ProfileCard from '../ProfileCard'
import './UserProfile.css'

const FIELD_MAP = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'mobile_number', label: 'Mobile Number' },
  { key: 'date_of_birth', label: 'Date of Birth' },
  { key: 'present_address', label: 'Present Address' },
  { key: 'permanent_address', label: 'Permanent Address' },
  { key: 'city', label: 'City' },
  { key: 'postal_code', label: 'Postal Code' },
  { key: 'country', label: 'Country' },
]

const UserProfile = ({ user = {}, transactions = [] }) => (
  <div className="user-profile-grid profile-grid">
    <ProfileCard user={user} transactions={transactions} />

    <div className="user-profile-details">
      <h2 className="user-profile-details-title">Personal Information</h2>
      {FIELD_MAP.map(({ key, label }) =>
        user[key] ? (
          <div key={key} className="user-profile-field">
            <span className="user-profile-field-label">{label}</span>
            <span className="user-profile-field-value">{user[key]}</span>
          </div>
        ) : null
      )}
    </div>
  </div>
)

export default UserProfile
