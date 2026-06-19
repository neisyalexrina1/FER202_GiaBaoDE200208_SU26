import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert, InputGroup } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useFeedback } from '../contexts/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL = { course: '', topic: '', rating: '', comment: '' }

function AddFeedbackForm() {
  const { user } = useAuth()
  const { addFeedback } = useFeedback()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timer)
  }, [success])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
    setSuccess(false)
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

    await addFeedback({
      userId: user.id,
      course: form.course.trim(),
      topic: form.topic.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: getTodayFormatted(),
    })
    setForm(INITIAL)
    setErrors({})
    setSuccess(true)
  }

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-3">
      <Card.Header className="text-white rounded-top-3 d-flex align-items-center"
        style={{ background: 'linear-gradient(135deg, #1a7fc4, #0b3d6b)' }}>
        <span className="me-2">➕</span>
        <strong>Add Feedback</strong>
      </Card.Header>
      <Card.Body className="p-4">
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible className="rounded-3">
            ✅ Feedback added successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-3 align-items-start">
            <Col md={3}>
              <Form.Label className="fw-semibold text-secondary small">Course</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">📚</InputGroup.Text>
                <Form.Control
                  name="course"
                  placeholder="e.g. FER202"
                  value={form.course}
                  onChange={handleChange}
                  isInvalid={!!errors.course}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.course}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Label className="fw-semibold text-secondary small">Topic</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">📝</InputGroup.Text>
                <Form.Control name="topic" type="number" placeholder="Topic"
                  value={form.topic} onChange={handleChange} />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Label className="fw-semibold text-secondary small">Rating</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">⭐</InputGroup.Text>
                <Form.Control
                  name="rating" type="number" placeholder="1-5"
                  min="1" max="5"
                  value={form.rating}
                  onChange={handleChange}
                  isInvalid={!!errors.rating}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.rating}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Label className="fw-semibold text-secondary small">Comment</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">💬</InputGroup.Text>
                <Form.Control name="comment" placeholder="Your comment"
                  value={form.comment} onChange={handleChange} />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Label className="d-none d-md-block">&nbsp;</Form.Label>
              <Button type="submit" className="w-100 fw-bold shadow-sm border-0 text-white"
                style={{ background: 'linear-gradient(135deg, #1a7fc4, #0b3d6b)' }}>
                ➕ Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddFeedbackForm
