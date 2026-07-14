import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

export default function NotFound() {
  // TODO-09: Thiết kế trang 404 — hiển thị mã lỗi 404, thông báo, và nút Back to Home
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-5 text-muted">The page you are looking for does not exist or has been moved.</p>
      <Button as={Link} to="/" variant="primary" size="lg">Back to Home</Button>
    </Container>
  )
}
