// src/components/common/Loader/index.jsx
import { ThreeDots } from 'react-loader-spinner'
import './Loader.css'

const Loader = ({ size = 50 }) => (
  <div className="loader-container">
    <ThreeDots
      height={size}
      width={size}
      radius="9"
      color="var(--primary)"
      ariaLabel="loading"
      visible
    />
  </div>
)

export default Loader
