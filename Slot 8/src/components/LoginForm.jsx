import { useState } from 'react'
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

export default function LoginForm() {
  const { state, dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Bắt đầu quá trình login
    dispatch({ type: 'LOGIN_START' })
    
    const user = findUser(username, password)
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Tên đăng nhập hoặc mật khẩu không đúng' })
    }
  }

  return (
    <Card>
      <Card.Header className="bg-primary text-white">
        Đăng nhập
      </Card.Header>
      <Card.Body>
        {state.error && <Alert variant="danger" role="alert">{state.error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={state.isLoading}
            />
          </Form.Group>
          <Button type="submit" disabled={state.isLoading}>
            {state.isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Đang xử lý...
              </>
            ) : 'Đăng nhập'}
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted">
        Vui lòng nhập thông tin để tiếp tục
      </Card.Footer>
    </Card>
  )
}
