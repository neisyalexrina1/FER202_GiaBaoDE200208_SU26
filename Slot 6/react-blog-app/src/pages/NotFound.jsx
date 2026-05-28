// src/pages/NotFound.jsx
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Card 
        style={{
          maxWidth: '600px',
          width: '100%',
          borderRadius: '24px',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
          overflow: 'hidden',
          background: '#fff'
        }}
      >
        <div style={{ height: '200px', background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 
            style={{ 
              fontSize: '100px', 
              fontWeight: '900', 
              color: 'rgba(255,255,255,0.2)',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '10px'
            }}
          >
            404
          </h1>
        </div>
        
        <Card.Body className="p-5" style={{ marginTop: '-40px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: '#fff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            fontSize: '2.5rem'
          }}>
            🧭
          </div>
          
          <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>
            Không Tìm Thấy Trang!
          </h4>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px', padding: '0 20px' }}>
            Có vẻ như bạn đã đi lạc. Đường dẫn (URL) này không tồn tại hoặc đã bị thay đổi vị trí. Hãy trở về trang chủ nhé!
          </p>
          <Button 
            as={Link} 
            to='/home' 
            style={{
              borderRadius: '12px',
              padding: '12px 32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
              border: 'none',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.25)',
              fontSize: '1.05rem'
            }}
          >
            Trở Về Trang Chủ
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;
