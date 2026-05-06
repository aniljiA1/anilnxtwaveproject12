// src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from './context/AppContext'
import AppRoutes from './routes/AppRoutes'
import './styles/global.css'
import './styles/responsive.css'

const App = () => (
  <BrowserRouter>
    <AppProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppProvider>
  </BrowserRouter>
)

export default App
