import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { validateLogin } from '../utils/validate'

function LoginPage() {
  const { login, loading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = validateLogin(email, password)
    if (err) { setLocalError(err); return }

    setLocalError(null)
    clearError()

    const success = await login({ email, password })
    if (success) navigate('/home')
  }

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        {/* Cột trái - Form Login */}
        <Col xs={12} md={6} lg={5} className="d-flex flex-column justify-content-center px-4 px-md-5 bg-white">
          <div className="mx-auto" style={{ maxWidth: '380px', width: '100%' }}>
            
            {/* Logo */}
            <div className="mb-5 d-flex align-items-center">
              <span className="me-2 fs-4">🎓</span>
              <h5 className="mb-0 fw-bold text-dark">Course Management</h5>
            </div>

            {/* Tiêu đề */}
            <h2 className="fw-bold mb-2 text-dark">Log in to your account</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>Please enter your details</p>

            {/* Báo lỗi */}
            {(localError || error) && (
              <Alert variant="danger" className="rounded-3 py-2 border-0 bg-danger bg-opacity-10 text-danger">
                <small className="fw-semibold">⚠️ {localError || error}</small>
              </Alert>
            )}

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="student01@fpt.edu.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  className="rounded-3 shadow-none border-secondary-subtle"
                  style={{ fontSize: '0.95rem', padding: '0.75rem 1rem' }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  className="rounded-3 shadow-none border-secondary-subtle"
                  style={{ fontSize: '0.95rem', padding: '0.75rem 1rem' }}
                />
              </Form.Group>

              <Button
                type="submit"
                size="lg"
                className="w-100 fw-medium rounded-3 border-0 text-white"
                disabled={loading}
                style={{ padding: '0.75rem', background: 'linear-gradient(135deg, #1a7fc4, #0b3d6b)' }}
              >
                {loading ? <Spinner size="sm" animation="border" /> : 'Log in'}
              </Button>
            </Form>
            
            {/* Footer Form */}
            <div className="mt-5 pt-4 text-center">
              <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                By logging in, you agree to our Terms of Use
              </small>
            </div>
            
          </div>
        </Col>

        {/* Cột phải - Banner Xanh */}
        <Col xs={0} md={6} lg={7}
          className="d-none d-md-flex align-items-center justify-content-center p-5"
          style={{ background: 'linear-gradient(180deg, #1a7fc4 0%, #145da0 40%, #0b3d6b 70%, #0a1e3d 100%)' }}
        >
          <div className="text-white text-md-start px-xl-5" style={{ maxWidth: '600px' }}>
            <div className="mb-4 d-flex align-items-center" style={{ opacity: 0.8 }}>
              <span className="me-2 fs-5">🎓</span>
              <h5 className="mb-0 fw-semibold" style={{ letterSpacing: '2px' }}>FPT UNIVERSITY</h5>
            </div>
            <h1 className="fw-bold mb-4" style={{ fontSize: '3.5rem', lineHeight: '1.15' }}>
              Empowering student learning
            </h1>
            <p className="fs-5 mb-0" style={{ maxWidth: '420px', opacity: 0.75 }}>
              Access your course materials, submit feedbacks, and manage your academic journey in one place.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
