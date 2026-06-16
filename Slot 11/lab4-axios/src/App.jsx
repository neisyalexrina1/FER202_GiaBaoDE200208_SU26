import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route 
        path="/" 
        element={currentUser ? <Navigate to="/users" replace /> : <LoginPage />} 
      />
      <Route 
        path="/users" 
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}
