import { useState } from 'react'
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col } from 'react-bootstrap'
import { useFeedback } from '../contexts/FeedbackContext'
import { formatDate } from '../utils/format'
import DeleteConfirmModal from './DeleteConfirmModal'

function FeedbackTable({ feedbacks, onEdit }) {
  const { deleteFeedback } = useFeedback()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filterCourse, setFilterCourse] = useState('')

  const filteredFeedbacks = feedbacks.filter(fb =>
    fb.course.toLowerCase().includes(filterCourse.toLowerCase())
  )

  const avgRating = filteredFeedbacks.length > 0
    ? (filteredFeedbacks.reduce((acc, curr) => acc + Number(curr.rating), 0) / filteredFeedbacks.length).toFixed(1)
    : 0

  const handleDeleteConfirm = () => {
    deleteFeedback(deleteTarget)
    setDeleteTarget(null)
  }

  const ratingColor = (r) => {
    const n = Number(r)
    if (n >= 4) return 'success'
    if (n === 3) return 'warning'
    return 'danger'
  }

  return (
    <>
      <Card className="mb-4 shadow-sm border-0 rounded-3">
        <Card.Header className="text-white rounded-top-3"
          style={{ background: 'linear-gradient(135deg, #0b3d6b, #0a1e3d)' }}>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="d-flex align-items-center mb-2 mb-md-0">
              <span className="me-2">📋</span>
              <strong>Feedback Management</strong>
              <Badge className="ms-2" style={{ background: '#1a7fc4' }}>{filteredFeedbacks.length}</Badge>
            </Col>
            <Col xs={12} md={4} className="text-center mb-2 mb-md-0">
              {filteredFeedbacks.length > 0 && (
                <Badge className="fs-6 px-3 py-2"
                  style={{ background: '#145da0' }}>
                  ⭐ Average Rating: {avgRating} / 5
                </Badge>
              )}
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-md-end">
              <InputGroup size="sm" style={{ maxWidth: '250px' }}>
                <InputGroup.Text className="border-0 text-white"
                  style={{ background: '#145da0' }}>🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Filter by course..."
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="border-0"
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0 align-middle">
            <thead>
              <tr style={{ background: '#e8f0fe' }}>
                <th className="text-center" style={{ width: '50px' }}>#</th>
                <th>📚 Course</th>
                <th>📝 Topic</th>
                <th className="text-center">⭐ Rating</th>
                <th>💬 Comment</th>
                <th className="text-center">📅 Date</th>
                <th className="text-center" style={{ width: '160px' }}>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    <span style={{ fontSize: '2rem' }}>📭</span>
                    <p className="mt-2 mb-0">No feedbacks found.</p>
                  </td>
                </tr>
              ) : (
                filteredFeedbacks.map((fb, idx) => (
                  <tr key={fb.id}>
                    <td className="text-center fw-bold text-muted">{idx + 1}</td>
                    <td className="fw-semibold">{fb.course}</td>
                    <td>{fb.topic}</td>
                    <td className="text-center">
                      <Badge bg={ratingColor(fb.rating)} className="px-3 py-2 fs-6">
                        {fb.rating} ⭐
                      </Badge>
                    </td>
                    <td className="text-muted">{fb.comment}</td>
                    <td className="text-center">
                      <Badge bg="light" text="dark" className="border">{formatDate(fb.date)}</Badge>
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <Button size="sm" className="fw-semibold border-0 text-white"
                          style={{ background: '#145da0' }}
                          onClick={() => onEdit(fb)}>✏️ Edit</Button>
                        <Button variant="outline-danger" size="sm" className="fw-semibold"
                          onClick={() => setDeleteTarget(fb.id)}>🗑️ Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <DeleteConfirmModal
        show={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onHide={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default FeedbackTable
