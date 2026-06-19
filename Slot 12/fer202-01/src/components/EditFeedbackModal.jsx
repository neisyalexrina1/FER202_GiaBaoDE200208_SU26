import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useFeedback } from '../contexts/FeedbackContext'

function EditFeedbackModal({ show, feedback, onHide }) {
  const { editFeedback } = useFeedback()
  const [form, setForm] = useState({ course: '', topic: '', rating: '', comment: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (feedback) {
      setForm({
        course: feedback.course || '',
        topic: feedback.topic || '',
        rating: feedback.rating || '',
        comment: feedback.comment || '',
      })
      setErrors({})
    }
  }, [feedback])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.course.trim()) newErrors.course = 'Course name is required'
    const r = Number(form.rating)
    if (!form.rating || isNaN(r) || r < 1 || r > 5)
      newErrors.rating = 'Rating must be between 1 and 5'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    await editFeedback(feedback.id, { ...feedback, ...form })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="text-white"
        style={{ background: 'linear-gradient(135deg, #1a7fc4, #0b3d6b)' }}>
        <Modal.Title>✏️ Edit Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Label className="fw-semibold text-secondary">📚 Course</Form.Label>
              <Form.Control
                name="course" value={form.course} onChange={handleChange}
                isInvalid={!!errors.course}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold text-secondary">📝 Topic</Form.Label>
              <Form.Control name="topic" type="number" value={form.topic} onChange={handleChange} size="lg" />
            </Col>
          </Row>
          <Row className="g-3 mb-4">
            <Col md={6}>
              <Form.Label className="fw-semibold text-secondary">⭐ Rating (1–5)</Form.Label>
              <Form.Control
                type="number" name="rating" min="1" max="5"
                value={form.rating} onChange={handleChange}
                isInvalid={!!errors.rating}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.rating}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold text-secondary">💬 Comment</Form.Label>
              <Form.Control name="comment" value={form.comment} onChange={handleChange} size="lg" />
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={onHide} className="px-4">Cancel</Button>
            <Button type="submit" className="px-4 fw-bold shadow-sm border-0 text-white"
              style={{ background: 'linear-gradient(135deg, #1a7fc4, #0b3d6b)' }}>
              💾 Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditFeedbackModal
