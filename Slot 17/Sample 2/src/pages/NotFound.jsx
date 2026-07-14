// TODO-08: Create a proper "Page Not Found" (404) UI
// Requirements:
// - Import useNavigate from 'react-router-dom'
// - Display "404" prominently (e.g. <h1 className="display-1 fw-bold text-danger">)
// - Display "Page Not Found" message
// - Add a Button that navigates to '/' when clicked (text must contain "Back" or "Home")
// - Wrap everything in <Container className="mt-5 text-center">

import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="mt-5 text-center">
      {/* TODO-08: implement 404 page */}
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2>Page Not Found</h2>
      <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>Back</Button>
    </Container>
  )
}

export default NotFound
