import { Navbar, Container, Button, Nav } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../context/ThemeContext'

export default function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { user } = state
  
  const theme = useTheme()
  const isDarkMode = theme?.isDarkMode ?? false
  const toggleTheme = theme?.toggleTheme ?? (() => {})

  let navigate = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useNavigate } = require('react-router-dom')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate()
  } catch {
    navigate = null
  }

  if (!user) return null

  return (
    <Navbar bg={isDarkMode ? "dark" : "primary"} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate && navigate('/')}
        >
          Login App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate && navigate('/')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate && navigate('/change-password')}>Đổi mật khẩu</Nav.Link>
            {user.role === 'admin' && (
              <Nav.Link onClick={() => navigate && navigate('/users')}>Quản lý Users</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            <Navbar.Text className="me-3">
              Signed in as: <span className="text-white fw-bold">{user.name}</span>
            </Navbar.Text>
            <Button 
              variant="outline-light" 
              size="sm" 
              className="me-2" 
              onClick={toggleTheme}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </Button>
            <Button variant="danger" size="sm" onClick={() => dispatch({ type: 'LOGOUT' })}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

