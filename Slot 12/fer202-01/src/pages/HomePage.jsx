import { useEffect, useState } from 'react'
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useFeedback } from '../contexts/FeedbackContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddFeedbackForm from '../components/AddFeedbackForm'
import FeedbackTable from '../components/FeedbackTable'
import EditFeedbackModal from '../components/EditFeedbackModal'

function HomePage() {
  const { user } = useAuth()
  const { items, loading, error, fetchFeedbacks } = useFeedback()
  const [editTarget, setEditTarget] = useState(null)

  useEffect(() => {
    if (user) fetchFeedbacks(user.id)
  }, [user])

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <Container className="flex-grow-1 py-4">
        <Row className="mb-4">
          <Col>
            <h4 className="fw-bold" style={{ color: '#0b3d6b' }}>
              📊 Dashboard
            </h4>
            <p className="text-muted mb-0">
              Welcome back, <strong>{user?.fullName}</strong>! Manage your course feedbacks below.
            </p>
          </Col>
        </Row>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2">Loading your feedbacks...</p>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="rounded-3">
            <strong>⚠️ Error:</strong> {error}
          </Alert>
        )}
        {!loading && (
          <>
            <AddFeedbackForm />
            <FeedbackTable feedbacks={items} onEdit={setEditTarget} />
          </>
        )}
      </Container>
      <Footer />

      <EditFeedbackModal
        show={!!editTarget}
        feedback={editTarget}
        onHide={() => setEditTarget(null)}
      />
    </div>
  )
}

export default HomePage
