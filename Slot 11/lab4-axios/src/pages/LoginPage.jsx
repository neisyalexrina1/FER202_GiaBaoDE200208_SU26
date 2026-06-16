import { useState, useContext } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/users');
    }
  };

  return (
    <Row className="g-0" style={{ minHeight: '100vh' }}>
      {/* Bên trái – Trang trí */}
      <Col lg={5} className="d-none d-lg-flex" style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Các khối trang trí */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '60%', height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-10%',
          width: '70%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '30%',
          width: '40%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div className="d-flex flex-column justify-content-end p-5 text-white" style={{ position: 'relative', zIndex: 1 }}>
          <p className="text-uppercase small fw-light mb-4" style={{ letterSpacing: '3px', opacity: 0.7 }}>
            User Manager
          </p>
          <h1 className="display-4 fw-bold lh-1 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Quản lý<br />Người dùng<br />Hiệu quả
          </h1>
          <p className="mt-3" style={{ opacity: 0.6, maxWidth: '320px' }}>
            Hệ thống quản lý người dùng toàn diện với đầy đủ phân quyền và bảo mật.
          </p>
        </div>
      </Col>

      {/* Bên phải – Form đăng nhập */}
      <Col lg={7} className="d-flex align-items-center justify-content-center bg-white">
        <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <div className="text-center mb-5">
            <h2 className="text-dark mb-2" style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 700 }}>Welcome Back</h2>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>Nhập tên đăng nhập và mật khẩu để truy cập hệ thống</p>
          </div>

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleLogin} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-medium text-dark">Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                size="lg"
                className="bg-light border-0"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-medium text-dark">Mật khẩu</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="lg"
                className="bg-light border-0"
              />
            </Form.Group>

            <Button 
              variant="dark" 
              type="submit" 
              size="lg"
              className="w-100 rounded-3" 
              style={{ padding: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Đang đăng nhập...
                </>
              ) : 'Đăng nhập'}
            </Button>
          </Form>

        </div>
      </Col>
    </Row>
  );
}
