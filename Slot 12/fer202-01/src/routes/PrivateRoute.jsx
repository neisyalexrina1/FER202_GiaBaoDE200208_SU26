import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()       // lấy từ context
  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
