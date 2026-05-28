// src/pages/About.jsx
import { Container, Card, Badge, Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function About() {
  const techs = [
    { name: 'React 18', color: 'primary' },
    { name: 'React Router v6', color: 'success' },
    { name: 'React-Bootstrap', color: 'info' },
    { name: 'Bootstrap 5', color: 'secondary' },
  ];

  return (
    <Container className="py-5" style={{ maxWidth: 1000 }}>
      {/* Breadcrumb */}
      <Breadcrumb 
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(10px)',
          padding: '12px 20px',
          borderRadius: '16px',
          marginBottom: '30px',
          border: '1px solid #f1f5f9'
        }}
      >
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home', style: { textDecoration: 'none', color: '#0ea5e9', fontWeight: '600' } }}>🏠 Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: '#64748b', fontWeight: '500' }}>ℹ️ Giới thiệu</Breadcrumb.Item>
      </Breadcrumb>

      <Card 
        style={{
          borderRadius: '24px',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          background: '#fff'
        }}
      >
        <Row className="g-0">
          {/* Cột hình ảnh */}
          <Col md={5} className="d-none d-md-block" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></div>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              color: 'white'
            }}>
              <h2 style={{ fontWeight: '800', fontSize: '2rem' }}>Về Dự Án Này</h2>
              <p style={{ opacity: 0.9 }}>Xây dựng với niềm đam mê công nghệ và sự tỉ mỉ trong thiết kế.</p>
            </div>
          </Col>

          {/* Cột nội dung */}
          <Col md={7}>
            <Card.Body className="p-4 p-md-5">
              <div style={{ display: 'inline-block', padding: '12px', background: '#f1f5f9', borderRadius: '16px', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
              </div>
              <h3 className='mb-4' style={{ fontWeight: '800', color: '#0f172a' }}>Giới thiệu hệ thống</h3>
              
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', marginBottom: '20px' }}>
                Hệ thống Blog này được phát triển như một dự án thực hành chuẩn của môn học <strong>FER202</strong> (Frontend Web Development with React).
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#64748b', marginBottom: '30px' }}>
                Dự án tích hợp đầy đủ các chức năng quản lý, tìm kiếm thời gian thực, lưu trữ trạng thái tìm kiếm qua URL, phân trang thông minh, cấu trúc định tuyến SPA và tải dữ liệu thời gian thực từ một REST API giả lập.
              </p>
              
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
                <h5 className='mb-3' style={{ fontWeight: '700', color: '#334155' }}>🛠️ Công nghệ & Thư viện sử dụng:</h5>
                <div className='d-flex flex-wrap gap-2 mt-2'>
                  {techs.map(t => (
                    <Badge 
                      key={t.name} 
                      bg='light'
                      text='dark'
                      style={{
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        border: '1px solid #e2e8f0',
                        color: '#475569'
                      }}
                    >
                      {t.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default About;
