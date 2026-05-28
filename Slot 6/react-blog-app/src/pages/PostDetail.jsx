// src/pages/PostDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert, Breadcrumb } from 'react-bootstrap';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`http://localhost:3001/posts/${id}`).then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      }),
      fetch('http://localhost:3001/posts').then(res => res.json()),
    ])
      .then(([postData, allData]) => {
        setPost(postData);
        setAllPosts(allData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải bài viết...</p>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: '600px' }}>
        <Alert variant='warning' style={{ borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤔</div>
          <Alert.Heading style={{ fontWeight: '800' }}>Không tìm thấy bài viết!</Alert.Heading>
          <p style={{ color: '#666' }}>Bài viết với mã số id={id} hiện tại không tồn tại trong hệ thống dữ liệu.</p>
          <Button onClick={() => navigate('/posts')} variant='dark' style={{ borderRadius: '12px', fontWeight: '600', padding: '10px 24px', marginTop: '10px' }}>
            ← Về danh sách bài viết
          </Button>
        </Alert>
      </Container>
    );
  }

  const currentIndex = allPosts.findIndex(p => p.id === Number(id));
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <Container className="py-5" style={{ maxWidth: '750px' }}>
      <Breadcrumb 
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(10px)',
          padding: '10px 16px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #f1f5f9'
        }}
      >
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home', style: { textDecoration: 'none', color: '#0ea5e9', fontWeight: '600' } }}>🏠 Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/posts', style: { textDecoration: 'none', color: '#0ea5e9', fontWeight: '600' } }}>📚 Bài viết</Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: '#64748b', fontWeight: '500' }}>{post.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Button 
        variant='light' 
        onClick={() => navigate(-1)} 
        className='mb-3'
        style={{
          borderRadius: '10px',
          padding: '6px 14px',
          fontWeight: '600',
          color: '#475569',
          border: '1px solid #e2e8f0',
          background: '#fff',
          fontSize: '0.9rem'
        }}
      >
        ← Trở về
      </Button>

      <Card 
        style={{
          borderRadius: '20px',
          border: 'none',
          boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
          background: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div style={{
          height: '220px',
          backgroundImage: `url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        <Card.Body className="p-4" style={{ marginTop: '-30px', background: '#fff', borderRadius: '30px 30px 0 0', position: 'relative' }}>
          <div className='d-flex flex-wrap gap-2 mb-3 justify-content-center'>
            <Badge 
              style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {post.category}
            </Badge>
          </div>

          <h1 className='text-center mb-3' style={{ fontWeight: '800', color: '#0f172a', fontSize: '2rem', lineHeight: '1.3', letterSpacing: '-0.5px' }}>
            {post.title}
          </h1>
          
          <div 
            className='d-flex align-items-center justify-content-center text-muted mb-4 pb-4' 
            style={{ 
              borderBottom: '1px solid #f1f5f9',
              fontSize: '0.95rem',
              gap: '15px'
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>
                {post.author.charAt(0)}
              </div>
              <span style={{ fontWeight: '600', color: '#334155' }}>{post.author}</span>
            </div>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#64748b' }}>{post.date}</span>
          </div>

          <div 
            style={{ 
              lineHeight: '2', 
              fontSize: '1.15rem', 
              color: '#334155',
              whiteSpace: 'pre-line',
              padding: '0 20px'
            }}
          >
            {post.body}
          </div>

          <div className='d-flex flex-wrap gap-2 mt-5 pt-4' style={{ borderTop: '1px solid #f1f5f9', padding: '0 20px' }}>
            <span style={{ fontWeight: '600', color: '#64748b', marginRight: '10px' }}>Tags:</span>
            {post.tags.map(tag => (
              <Badge 
                key={tag} 
                bg='light' 
                text='secondary'
                style={{
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Row className='mt-5 pt-4 g-4'>
        <Col xs={12} md={6}>
          {prevPost && (
            <div
              onClick={() => navigate(`/posts/${prevPost.id}`)}
              style={{
                borderRadius: '16px',
                padding: '24px',
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' }}>← BÀI TRƯỚC</div>
              <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prevPost.title}</div>
            </div>
          )}
        </Col>
        <Col xs={12} md={6} className='text-md-end'>
          {nextPost && (
            <div
              onClick={() => navigate(`/posts/${nextPost.id}`)}
              style={{
                borderRadius: '16px',
                padding: '24px',
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' }}>BÀI SAU →</div>
              <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nextPost.title}</div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
