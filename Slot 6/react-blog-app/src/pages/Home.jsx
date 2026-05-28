// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi fetch dữ liệu:', err);
        setLoading(false);
      });
  }, []);

  const latestPosts = posts.slice(0, 2);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Hero section */}
      <Row className="mb-5">
        <Col>
          <Card 
            className="text-center text-white"
            style={{
              border: 'none',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Background Image */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}></div>
            
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.85) 100%)',
              zIndex: 1
            }}></div>

            <Card.Body style={{ position: 'relative', zIndex: 2, padding: '4rem 2rem' }}>
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(8px)',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                🌟 Chào mừng bạn đến với React Blog
              </span>
              
              <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
                Khám phá thế giới công nghệ
              </h1>
              
              <p style={{ fontSize: '1.25rem', fontWeight: '400', color: '#e2e8f0', maxWidth: '600px', margin: '0 auto 30px' }}>
                Chia sẻ kiến thức lập trình, câu chuyện nghề nghiệp và những xu hướng công nghệ mới nhất.
              </p>
              
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button 
                  as={Link} 
                  to='/posts' 
                  variant='primary'
                  style={{
                    padding: '14px 32px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                    border: 'none',
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Đọc Blog Ngay
                </Button>
                <Button 
                  as={Link} 
                  to='/about' 
                  variant='light'
                  style={{
                    padding: '14px 32px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1.05rem',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Về Chúng Tôi
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bài viết mới nhất */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 style={{ fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
          🔥 Bài viết mới nhất
        </h4>
        <Badge bg="light" text="dark" style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
          Tổng cộng {posts.length} bài
        </Badge>
      </div>

      <Row>
        {latestPosts.map(post => (
          <Col md={6} key={post.id} className="mb-4">
            <Card 
              style={{
                borderRadius: '20px',
                border: 'none',
                boxShadow: hoveredCard === post.id ? '0 20px 40px rgba(0,0,0,0.08)' : '0 10px 20px rgba(0,0,0,0.03)',
                transform: hoveredCard === post.id ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                background: '#ffffff',
                height: '100%',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              as={Link}
              to={`/posts/${post.id}`}
              className="text-decoration-none text-dark"
            >
              <Card.Body className="p-4 p-lg-5 d-flex flex-column">
                <div className="mb-auto">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <Badge 
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      {post.category}
                    </Badge>
                    <small style={{ color: '#94a3b8', fontWeight: '500' }}>
                      {post.date}
                    </small>
                  </div>
                  
                  <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1.4' }}>
                    {post.title}
                  </h4>
                  
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: 0 }}>
                    {post.body.substring(0, 120)}...
                  </p>
                </div>

                <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#475569' }}>
                      {post.author.charAt(0)}
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{post.author}</span>
                  </div>
                  <span style={{ color: '#0ea5e9', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Đọc tiếp <span style={{ transform: hoveredCard === post.id ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>→</span>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

