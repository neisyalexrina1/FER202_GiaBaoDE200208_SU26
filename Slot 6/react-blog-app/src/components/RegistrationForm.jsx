// src/components/RegistrationForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import MyModal from './MyModal';

function RegistrationForm() {
  const navigate = useNavigate();

  // state lưu trữ giá trị form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // state lưu trữ lỗi
  const [errors, setErrors] = useState({});
  // state hiển thị modal thành công
  const [showModal, setShowModal] = useState(false);

  // Xử lý thay đổi dữ liệu ô nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Hàm kiểm tra tính hợp lệ (Validation)
  const validateForm = () => {
    const tempErrors = {};

    if (!formData.username.trim()) {
      tempErrors.username = 'Tên tài khoản không được để trống';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Địa chỉ email không được để trống';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = 'Định dạng email không đúng (ví dụ: user@example.com)';
      }
    }

    if (!formData.password) {
      tempErrors.password = 'Mật khẩu không được để trống';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_+\-[\]\\/]).{6,}$/;
      if (!passwordRegex.test(formData.password)) {
        tempErrors.password = 'Mật khẩu phải ≥ 6 ký tự, gồm 1 chữ HOA, 1 thường, 1 số và 1 ký tự đặc biệt';
      }
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Vui lòng xác nhận lại mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const handleConfirmRedirect = () => {
    setShowModal(false);
    navigate('/home');
  };

  // Styles dùng chung cho các ô input để tái sử dụng
  const inputStyle = {
    borderRadius: '12px',
    padding: '14px 18px',
    fontSize: '0.95rem',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
    color: '#334155'
  };

  const labelStyle = { 
    fontWeight: '600', 
    color: '#475569', 
    fontSize: '0.9rem',
    marginBottom: '8px' 
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <Card 
        style={{
          maxWidth: '1000px',
          width: '100%',
          borderRadius: '24px',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          background: '#fff'
        }}
      >
        <Row className="g-0">
          {/* Cột trái: Hình ảnh Cover kiểu Blog */}
          <Col md={5} lg={6} className="d-none d-md-block" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></div>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, rgba(30,60,114,0.2) 0%, rgba(15,23,42,0.9) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              color: 'white'
            }}>
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '6px 12px', 
                borderRadius: '20px', 
                fontSize: '0.8rem',
                fontWeight: '600',
                backdropFilter: 'blur(4px)',
                width: 'fit-content',
                marginBottom: '16px'
              }}>
                ✨ Dành cho tác giả
              </span>
              <h2 style={{ fontWeight: '800', fontSize: '2.2rem', lineHeight: '1.2', marginBottom: '16px' }}>
                Tham gia cộng đồng Blog của chúng tôi
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#e2e8f0', margin: 0 }}>
                Nơi chia sẻ kiến thức, lưu giữ những câu chuyện và kết nối với hàng ngàn độc giả khác.
              </p>
            </div>
          </Col>
          
          {/* Cột phải: Form Đăng Ký */}
          <Col md={7} lg={6}>
            <div className="p-4 p-md-5 p-lg-5">
              <div className="text-center mb-5">
                <div style={{ 
                  display: 'inline-block', 
                  padding: '12px 20px', 
                  background: '#f1f5f9', 
                  borderRadius: '16px',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>👋</span>
                </div>
                <h3 style={{ fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Tạo Tài Khoản</h3>
                <p style={{ color: '#64748b' }}>Bắt đầu hành trình viết lách của bạn ngay hôm nay</p>
              </div>

              <Form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <Form.Group className="mb-4" controlId="username">
                  <Form.Label style={labelStyle}>
                    Tên tài khoản <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên tài khoản..."
                    isInvalid={!!errors.username}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontWeight: '500' }}>
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label style={labelStyle}>
                    Địa chỉ Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    isInvalid={!!errors.email}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontWeight: '500' }}>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label style={labelStyle}>
                    Mật khẩu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tối thiểu 6 ký tự..."
                    isInvalid={!!errors.password}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontWeight: '500' }}>
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-5" controlId="confirmPassword">
                  <Form.Label style={labelStyle}>
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu phía trên..."
                    isInvalid={!!errors.confirmPassword}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontWeight: '500' }}>
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Button 
                    variant="primary" 
                    type="submit"
                    style={{
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      border: 'none',
                      boxShadow: '0 8px 16px rgba(59, 130, 246, 0.25)',
                      flex: 1
                    }}
                  >
                    Đăng Ký Ngay
                  </Button>
                  
                  <Button 
                    variant="light" 
                    type="button" 
                    onClick={handleCancel}
                    style={{
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontWeight: '600',
                      color: '#475569',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      flex: 1
                    }}
                  >
                    Hủy bỏ
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Modal báo thành công */}
      <MyModal 
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="🎉 Đăng Ký Thành Công!"
        message={`Chào mừng tác giả "${formData.username}". Nhấn "Đồng ý" để bắt đầu trải nghiệm Blog ngay!`}
        onConfirm={handleConfirmRedirect}
      />
    </div>
  );
}

export default RegistrationForm;

