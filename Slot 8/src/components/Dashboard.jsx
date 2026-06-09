import { Card, Badge, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { state, dispatch } = useAuth()
  const { user } = state

  if (!user) return null

  return (
    <Card>
      <Card.Header>Dashboard</Card.Header>
      <Card.Body>
        <Card.Title>Welcome, {user.name}!</Card.Title>
        <Card.Text>
          Role: <Badge bg={user.role === 'admin' ? 'danger' : 'success'}>{user.role}</Badge>
        </Card.Text>
        <Button onClick={() => dispatch({ type: 'LOGOUT' })}>Đăng xuất</Button>
      </Card.Body>
    </Card>
  )
}
