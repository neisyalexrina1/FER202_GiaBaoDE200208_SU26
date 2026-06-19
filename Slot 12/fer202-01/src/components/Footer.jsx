import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="text-light mt-5 py-4"
      style={{ background: 'linear-gradient(135deg, #0b3d6b, #0a1e3d)' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <span className="me-2">🎓</span>
            <strong>Course Management System</strong>
          </Col>
          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
            <small style={{ opacity: 0.6 }}>© 2026 FPT University — FER202 Spring 2026</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
