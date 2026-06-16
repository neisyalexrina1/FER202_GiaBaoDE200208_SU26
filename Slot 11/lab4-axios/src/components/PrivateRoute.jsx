import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Nếu chưa đăng nhập, đá về trang Login (/)
    return <Navigate to="/" replace />;
  }

  // Đã đăng nhập, cho phép truy cập component con
  return children;
}
