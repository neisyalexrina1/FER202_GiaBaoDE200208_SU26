import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AppNavbar from './components/AppNavbar'
import ChangePasswordPage from './pages/ChangePasswordPage'
import UserListPage from './pages/UserListPage'

function App() {
  const { state } = useAuth()

  return (
    <BrowserRouter>
      {state.isAuthenticated && <AppNavbar />}
      <div className="container mt-4">
        <Routes>
          <Route 
            path="/" 
            element={state.isAuthenticated ? <DashboardPage /> : <LoginPage />} 
          />
          <Route 
            path="/change-password" 
            element={state.isAuthenticated ? <ChangePasswordPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/users" 
            element={state.isAuthenticated ? <UserListPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
