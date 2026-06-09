import { useState } from 'react'
import { Card, Form, Button, ToastContainer, Toast } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function ChangePasswordPage() {
  const { state, dispatch } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (currentPassword !== state.user.password) {
      setError('Mật khẩu hiện tại không đúng')
      return
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu không khớp')
      return
    }

    dispatch({ type: 'CHANGE_PASSWORD', payload: newPassword })
    setShowToast(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Header className="bg-primary text-white">Đổi mật khẩu</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control 
                type="password" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                isInvalid={!!error && error.includes('hiện tại')}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control 
                type="password" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                isInvalid={!!error && error.includes('Mật khẩu mới')}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control 
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                isInvalid={!!error && error.includes('khớp')}
                required
              />
              {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Cập nhật mật khẩu</Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto">Thành công</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Đổi mật khẩu thành công!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}
