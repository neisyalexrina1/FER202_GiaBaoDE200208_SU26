import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar variant="dark" expand="lg" className="shadow-sm" sticky="top"
      style={{ background: 'linear-gradient(135deg, #0b3d6b, #0a1e3d)' }}>
      <Container>
        <Navbar.Brand className="d-flex align-items-center fw-bold">
          <span className="me-2" style={{ fontSize: '1.5rem' }}>🎓</span>
          Course Management System
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="align-items-center">
            {user && (
              <>
                <Navbar.Text className="me-3 text-light">
                  Signed in as{' '}
                  <Badge className="ms-1 fs-6 fw-normal"
                    style={{ background: '#1a7fc4' }}>{user.fullName}</Badge>
                </Navbar.Text>
                <Button size="sm" className="fw-semibold border-0"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                  onClick={handleLogout}>
                  🚪 Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
