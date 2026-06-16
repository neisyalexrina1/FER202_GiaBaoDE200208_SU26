import { useEffect, useContext, useReducer } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const emptyForm = { fullName: '', email: '', phone: '', role: 'User', status: 'active' };

const initialState = {
  data: emptyForm,
  errors: {}
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: { ...emptyForm, ...action.payload }, errors: {} };
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        // Xóa lỗi của trường đó khi người dùng bắt đầu gõ lại
        errors: { ...state.errors, [action.field]: '' }
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function UserForm({ show, onHide, onSubmit, user }) {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.role === 'Admin';
  
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    if (show) {
      if (user) {
        dispatch({ type: 'SET_DATA', payload: user });
      } else {
        dispatch({ type: 'RESET' });
      }
    }
  }, [show, user]);

  const validate = () => {
    const newErrors = {};
    const { fullName, email, phone } = state.data;
    
    if (!fullName.trim()) newErrors.fullName = 'Họ tên không được để trống.';
    else if (fullName.trim().length < 3) newErrors.fullName = 'Họ tên phải có ít nhất 3 ký tự.';
    
    if (!email.trim()) newErrors.email = 'Email không được để trống.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email không hợp lệ.';
    
    if (!phone.trim()) newErrors.phone = 'Số điện thoại không được để trống.';
    else if (!/^0\d{9}$/.test(phone)) newErrors.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.';
    
    return newErrors;
  };

  const handleFieldChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form HTML
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: newErrors });
      return;
    }
    onSubmit(state.data);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={state.data.fullName}
              onChange={handleFieldChange}
            />
            {state.errors.fullName && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                {state.errors.fullName}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={state.data.email}
              onChange={handleFieldChange}
            />
            {state.errors.email && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                {state.errors.email}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={state.data.phone}
              onChange={handleFieldChange}
            />
            {state.errors.phone && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                {state.errors.phone}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select 
              name="role" 
              value={state.data.role} 
              onChange={handleFieldChange} 
              disabled={!isAdmin}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </Form.Select>
            {state.errors.role && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                {state.errors.role}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select 
              name="status" 
              value={state.data.status} 
              onChange={handleFieldChange} 
              disabled={!isAdmin}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm khóa</option>
            </Form.Select>
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">Hủy</Button>
            <Button variant="primary" type="submit">Lưu</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
