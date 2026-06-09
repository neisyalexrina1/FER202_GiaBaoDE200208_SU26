import { Alert, Table, Badge, Card } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import USERS from '../data/users'

export default function UserListPage() {
  const { state } = useAuth()
  const { user } = state

  if (user?.role !== 'admin') {
    return (
      <Alert variant="danger" className="mt-3">
        Bạn không có quyền truy cập
      </Alert>
    )
  }

  return (
    <Card>
      <Card.Header className="bg-primary text-white">Quản lý Users</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Họ tên</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.name}</td>
                <td>
                  <Badge bg={u.role === 'admin' ? 'danger' : 'success'}>
                    {u.role}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
