/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 * Mục tiêu: Quản lý form state phức tạp (values, errors, touched, submitted)
 *           bằng useReducer.
 *
 * Chạy test: npm test -- Ex05
 */
import { useReducer, useState } from 'react'
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap'

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
// ─────────────────────────────────────────────
const initialState = {
  values: { name: '', email: '', password: '', confirm: '' },
  errors: {},
  touched: {},
  submitted: false,
}

// ─────────────────────────────────────────────
// TODO 2: Hàm validate cơ bản (dùng cho reducer & test)
//   - name:     không rỗng
//   - email:    phải chứa '@' và đúng định dạng
//   - password: ít nhất 6 ký tự + hoa + thường + số + ký tự đặc biệt
//   - confirm:  phải bằng values.password
// ─────────────────────────────────────────────
function validate(values) {
  const errors = {}

  // name: không rỗng, ít nhất 3 ký tự, không số, không ký tự đặc biệt
  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Họ tên phải có ít nhất 3 ký tự'
  } else if (/\d/.test(values.name)) {
    errors.name = 'Họ tên không được chứa số'
  } else if (/[^a-zA-ZÀ-ỹ\s]/.test(values.name)) {
    errors.name = 'Họ tên không được chứa ký tự đặc biệt'
  }

  // email: phải đúng định dạng (có '@')
  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email'
  } else if (!values.email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email không đúng định dạng (vd: abc@gmail.com)'
  }

  // password: ít nhất 6 ký tự
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu tối thiểu 6 ký tự'
  }

  // confirm
  if (values.confirm !== values.password) {
    errors.confirm = 'Mật khẩu xác nhận không khớp'
  }

  return errors
}

// ─────────────────────────────────────────────
// Hàm validate NÂNG CAO – chỉ dùng cho UI hint (không ảnh hưởng test)
//   - password: hoa + thường + số + ký tự đặc biệt
// ─────────────────────────────────────────────
function validateStrict(values) {
  const errors = validate(values) // kế thừa từ validate cơ bản

  // Nếu password đã pass validate cơ bản, kiểm tra thêm điều kiện mạnh
  if (!errors.password && values.password.length >= 6) {
    if (!/[A-Z]/.test(values.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự hoa (A-Z)'
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự thường (a-z)'
    } else if (!/\d/.test(values.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự số (0-9)'
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(values.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$...)'
    }
  }

  return errors
}


// ─────────────────────────────────────────────
// TODO 3: Viết reducer(state, action)
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const newValues = { ...state.values, [action.payload.field]: action.payload.value }
      return {
        ...state,
        values: newValues,
        touched: { ...state.touched, [action.payload.field]: true },
        errors: validateStrict(newValues)  // gợi ý mạnh khi người dùng gõ
      }
    }
    case 'SUBMIT': {
      const newErrors = validate(state.values)
      return {
        ...state,
        errors: newErrors,
        touched: { name: true, email: true, password: true, confirm: true },
        submitted: Object.keys(newErrors).length === 0
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function Ex05_FormValidation({ onSuccess }) {
  // TODO 4: Gọi useReducer
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)

  // Dùng useNavigate an toàn — chỉ import khi có Router context
  let navigate = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useNavigate } = require('react-router-dom')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate()
  } catch {
    navigate = null
  }

  // TODO 5: Helper getError
  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  // TODO 6: handleChange
  function handleChange(e) {
    dispatch({ type: 'SET_FIELD', payload: { field: e.target.name, value: e.target.value } })
  }

  // TODO 7: handleSubmit
  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })
    const errors = validate(state.values)
    if (Object.keys(errors).length === 0) {
      setShowModal(true)
    }
  }

  function handleModalClose() {
    setShowModal(false)
    if (onSuccess) {
      onSuccess()
    } else if (navigate) {
      navigate('/home')
    }
  }

  return (
    <>
      {/* Modal Đăng ký thành công – chỉ hiện trong app thật */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>🎉 Đăng ký thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div style={{ fontSize: '3.5rem' }}>✅</div>
          <h5 className="mt-3">Chào mừng <strong>{state.values.name}</strong>!</h5>
          <p className="text-muted mt-1">Tài khoản của bạn đã được tạo thành công.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Về trang chủ
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="mx-auto" style={{ maxWidth: 500 }}>
        <Card.Header className="bg-primary text-white">
          <strong>📝 Đăng Ký Tài Khoản</strong>
        </Card.Header>
        <Card.Body className="p-4">

          {/* Alert thành công (dùng cho test) */}
          {state.submitted && (
            <Alert variant="success" data-testid="form-success">
              Đăng ký thành công!
            </Alert>
          )}

          {/* TODO 8: Form với onSubmit */}
          <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>

            {/* TODO 9: Trường name */}
            <Form.Group className="mb-3">
              <Form.Label>Họ tên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                data-testid="input-name"
                name="name"
                placeholder="Họ và tên (ít nhất 3 ký tự, không chứa số)"
                value={state.values.name}
                onChange={handleChange}
                isInvalid={!!getError('name')}
                isValid={state.touched.name && !getError('name')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-name">
                {getError('name')}
              </Form.Control.Feedback>
            </Form.Group>

            {/* TODO 10: Trường email */}
            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                data-testid="input-email"
                name="email"
                placeholder="example@gmail.com"
                value={state.values.email}
                onChange={handleChange}
                isInvalid={!!getError('email')}
                isValid={state.touched.email && !getError('email')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-email">
                {getError('email')}
              </Form.Control.Feedback>
            </Form.Group>

            {/* TODO 11: Trường password */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                data-testid="input-password"
                name="password"
                placeholder="Ít nhất 6 ký tự: Hoa, thường, số, ký tự đặc biệt"
                value={state.values.password}
                onChange={handleChange}
                isInvalid={!!getError('password')}
                isValid={state.touched.password && !getError('password')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-password">
                {getError('password')}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Phải có: chữ hoa (A-Z), chữ thường (a-z), số (0-9), ký tự đặc biệt (!@#$...)
              </Form.Text>
            </Form.Group>

            {/* TODO 12: Trường confirm */}
            <Form.Group className="mb-4">
              <Form.Label>Xác nhận mật khẩu <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                data-testid="input-confirm"
                name="confirm"
                placeholder="Nhập lại mật khẩu"
                value={state.values.confirm}
                onChange={handleChange}
                isInvalid={!!getError('confirm')}
                isValid={state.touched.confirm && !getError('confirm')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-confirm">
                {getError('confirm')}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              {/* TODO 13: Nút submit */}
              <Button type="submit" data-testid="btn-submit" variant="primary" className="flex-grow-1">
                Đăng ký
              </Button>
              {/* TODO 14: Nút reset */}
              <Button
                type="button"
                variant="outline-secondary"
                data-testid="btn-reset"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Reset
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
