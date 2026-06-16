import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Table, Button, Form, Row, Col, Badge, Card, Navbar, Nav, InputGroup, Pagination, Spinner } from 'react-bootstrap';
import { userApi } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';
import UserForm from '../components/UserForm';

export default function UsersPage() {
  const { currentUser, logout } = useContext(AuthContext);
  const isAdmin = currentUser?.role === 'Admin';

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const showToast = (message) => alert(message);
  const queryClient = useQueryClient();

  const queryParams = { 
    _page: page, 
    _per_page: 5, // json-server v1.0.0-beta dùng _per_page thay vì _limit
    _sort: sortOrder === 'desc' ? `-${sortField}` : sortField, // v1.0.0-beta dùng -field cho desc
    ...(filterRole ? { role: filterRole } : {})
  };

  const { data, isLoading: loading, error: queryError } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: async () => {
      const response = await userApi.getAll(queryParams);
      let fetchedUsers = [];
      let totalPagesFetched = 1;
      if (Array.isArray(response.data)) {
        fetchedUsers = response.data;
        const total = response.headers['x-total-count'] || response.data.length;
        totalPagesFetched = Math.ceil(total / 5);
      } else if (response.data && Array.isArray(response.data.data)) {
        fetchedUsers = response.data.data;
        totalPagesFetched = response.data.pages || 1;
      }
      return { users: fetchedUsers, totalPages: totalPagesFetched };
    }
  });

  const { data: allUsersData } = useQuery({
    queryKey: ['users-stats'],
    queryFn: async () => {
      const response = await userApi.getAll();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  const allUsers = allUsersData || [];
  const users = data?.users || [];
  const totalPagesLocal = data?.totalPages || 1;
  const error = queryError ? queryError.message : null;

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  const createMutation = useMutation({
    mutationFn: (newData) => userApi.create(newData),
    onSuccess: () => { showToast('Thêm người dùng thành công!'); queryClient.invalidateQueries({ queryKey: ['users'] }); queryClient.invalidateQueries({ queryKey: ['users-stats'] }); },
    onError: (err) => showToast('Có lỗi: ' + err.message)
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, newData }) => userApi.update(id, newData),
    onSuccess: () => { showToast('Cập nhật thành công!'); queryClient.invalidateQueries({ queryKey: ['users'] }); queryClient.invalidateQueries({ queryKey: ['users-stats'] }); },
    onError: (err) => showToast('Có lỗi: ' + err.message)
  });
  const patchMutation = useMutation({
    mutationFn: ({ id, patchData }) => userApi.patch(id, patchData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); queryClient.invalidateQueries({ queryKey: ['users-stats'] }); },
    onError: () => showToast('Cập nhật trạng thái thất bại.')
  });

  const handleSubmitForm = (formData) => {
    if (editUser) {
      updateMutation.mutate({ id: editUser.id, newData: { ...editUser, ...formData } });
    } else {
      createMutation.mutate(formData);
    }
    setShowForm(false);
  };
  const handleToggleStatus = (user) => {
    patchMutation.mutate({ id: user.id, patchData: { status: user.status === 'active' ? 'inactive' : 'active' } });
  };
  const openAddForm = () => { setEditUser(null); setShowForm(true); };
  const openEditForm = (user) => { setEditUser(user); setShowForm(true); };

  const paginationItems = [];
  for (let i = 1; i <= totalPagesLocal; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>{i}</Pagination.Item>
    );
  }

  const stats = [
    { label: 'Tổng người dùng', value: allUsers.length, variant: 'primary' },
    { label: 'Đang hoạt động', value: allUsers.filter(u => u.status === 'active').length, variant: 'success' },
    { label: 'Đã vô hiệu hóa', value: allUsers.filter(u => u.status === 'inactive').length, variant: 'danger' },
    { label: 'Quản trị viên', value: allUsers.filter(u => u.role === 'Admin').length, variant: 'warning' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="border-bottom px-4 py-3">
        <Navbar.Brand className="fw-bold fs-5 text-dark">User Manager</Navbar.Brand>
        <Nav className="ms-auto d-flex flex-row align-items-center gap-3">
          {currentUser && (
            <>
              <Navbar.Text className="text-dark fw-medium">{currentUser.fullName}</Navbar.Text>
              <Badge pill bg={currentUser.role === 'Admin' ? 'dark' : 'secondary'}>{currentUser.role}</Badge>
              <Button variant="outline-secondary" size="sm" onClick={logout}>Đăng xuất</Button>
            </>
          )}
        </Nav>
      </Navbar>

      <Container fluid className="px-4 py-4">
        {/* Thống kê Cards - Chỉ Admin mới thấy */}
        {isAdmin && (
          <Row className="g-3 mb-4">
            {stats.map((s) => (
              <Col key={s.label} xs={6} lg={3}>
                <Card className="border-0 shadow-sm bg-white">
                  <Card.Body className="py-3">
                    <div className="text-muted small mb-1">{s.label}</div>
                    <div className={`fs-3 fw-bold text-${s.variant}`}>{s.value}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Main Card */}
        <Card className="border-0 shadow-sm bg-white">
          <Card.Header className="bg-white border-bottom py-3">
            <Row className="g-2 align-items-center">
              <Col lg={3}>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-white border-end-0">&#128269;</InputGroup.Text>
                  <Form.Control
                    className="border-start-0"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col lg={2}>
                <Form.Select size="sm" value={filterRole} onChange={(e) => { setFilterRole(e.target.value); setPage(1); }}>
                  <option value="">Tất cả vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </Form.Select>
              </Col>
              <Col lg={2}>
                <Form.Select size="sm" value={`${sortField}|${sortOrder}`} onChange={(e) => {
                  const [f, o] = e.target.value.split('|');
                  setSortField(f); setSortOrder(o);
                }}>
                  <option value="fullName|asc">Tên A–Z</option>
                  <option value="fullName|desc">Tên Z–A</option>
                  <option value="email|asc">Email A–Z</option>
                  <option value="createdAt|desc">Mới nhất</option>
                  <option value="createdAt|asc">Cũ nhất</option>
                </Form.Select>
              </Col>
              <Col lg={5} className="text-end">
                {isAdmin && (
                  <Button variant="dark" size="sm" onClick={openAddForm}>+ Thêm người dùng</Button>
                )}
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" size="sm" variant="secondary" />
                <span className="ms-2 text-muted">Đang tải...</span>
              </div>
            ) : error ? (
              <p className="text-danger text-center py-4 mb-0">{error}</p>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead>
                  <tr className="text-muted small text-uppercase">
                    <th className="ps-4 fw-semibold">#</th>
                    <th className="fw-semibold">Họ tên</th>
                    <th className="fw-semibold">Email</th>
                    <th className="fw-semibold">SĐT</th>
                    <th className="fw-semibold">Vai trò</th>
                    <th className="fw-semibold">Trạng thái</th>
                    <th className="fw-semibold pe-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, index) => (
                    <tr key={user.id}>
                      <td className="ps-4 text-muted">{(page - 1) * 5 + index + 1}</td>
                      <td className="fw-medium text-dark">{user.fullName}</td>
                      <td className="text-muted">{user.email}</td>
                      <td className="text-muted">{user.phone}</td>
                      <td>
                        <Badge pill bg={user.role === 'Admin' ? 'dark' : user.role === 'Manager' ? 'primary' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Badge pill bg={user.status === 'active' ? 'success' : 'danger'} className="bg-opacity-10 text-success border border-success" 
                          style={user.status !== 'active' ? { color: '#dc3545', borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,0.1)' } : undefined}>
                          {user.status === 'active' ? 'Active' : 'Disabled'}
                        </Badge>
                      </td>
                      <td className="pe-4">
                        {(currentUser?.role === 'Admin' || currentUser?.id === user.id) && (
                          <Button variant="link" size="sm" className="text-decoration-none p-0 me-3 text-primary" onClick={() => openEditForm(user)}>
                            Sửa
                          </Button>
                        )}
                        {currentUser?.role === 'Admin' && (
                          <Button
                            variant="link" size="sm"
                            className={`text-decoration-none p-0 ${user.status === 'active' ? 'text-danger' : 'text-success'}`}
                            onClick={() => handleToggleStatus(user)}
                            disabled={patchMutation.isPending}
                          >
                            {user.status === 'active' ? 'Disable' : 'Enable'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-5">Không tìm thấy người dùng nào.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>

          {totalPagesLocal > 1 && (
            <Card.Footer className="bg-white border-top d-flex justify-content-between align-items-center py-3">
              <small className="text-muted">Trang {page} / {totalPagesLocal}</small>
              <Pagination size="sm" className="mb-0">
                <Pagination.Prev disabled={page === 1} onClick={() => setPage(p => p - 1)} />
                {paginationItems}
                <Pagination.Next disabled={page === totalPagesLocal} onClick={() => setPage(p => p + 1)} />
              </Pagination>
            </Card.Footer>
          )}
        </Card>
      </Container>

      <UserForm show={showForm} onHide={() => setShowForm(false)} onSubmit={handleSubmitForm} user={editUser} />
    </>
  );
}
