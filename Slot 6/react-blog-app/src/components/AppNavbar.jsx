// src/components/AppNavbar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar 
      variant="light" 
      expand="md" 
      sticky="top"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        padding: '12px 0',
        transition: 'all 0.3s ease',
        zIndex: 1030
      }}
    >
      <Container>
        {/* Logo / Brand trỏ về /home (Trang chủ Blog) */}
        <Navbar.Brand 
          as={NavLink} 
          to='/home'
          style={{
            fontWeight: '800',
            fontSize: '1.4rem',
            letterSpacing: '-0.5px',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '1.6rem' }}>✧</span> React Blog
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" style={{ border: 'none' }} />
        <Navbar.Collapse id="main-nav">
          <Nav className='ms-auto align-items-center gap-2'>
            <Nav.Link 
              as={NavLink} 
              to='/home' 
              end
              style={({ isActive }) => ({
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                color: isActive ? '#0ea5e9' : '#475569',
                transition: 'all 0.2s ease',
              })}
            >
              Trang chủ
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to='/posts'
              style={({ isActive }) => ({
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                color: isActive ? '#0ea5e9' : '#475569',
                transition: 'all 0.2s ease',
              })}
            >
              Bài viết
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to='/about'
              style={({ isActive }) => ({
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                color: isActive ? '#0ea5e9' : '#475569',
                transition: 'all 0.2s ease',
              })}
            >
              Giới thiệu
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to='/registration'
              style={({ isActive }) => ({
                fontWeight: '600',
                padding: '8px 20px',
                borderRadius: '12px',
                background: isActive ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' : '#0f172a',
                color: '#fff',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 4px 12px rgba(15, 23, 42, 0.15)',
                marginLeft: '10px'
              })}
            >
              Tạo tài khoản
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
