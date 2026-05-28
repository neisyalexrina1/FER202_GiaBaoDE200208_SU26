// src/pages/PostList.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, Pagination, Breadcrumb } from 'react-bootstrap';

const POSTS_PER_PAGE = 2;

function PostList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredCard, setHoveredCard] = useState(null);

  const searchFromUrl = searchParams.get('q') || '';
  const categoryFromUrl = searchParams.get('category') || 'Tất cả';
  const pageFromUrl = Number(searchParams.get('page')) || 1;

  const [search, setSearch] = useState(searchFromUrl);
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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

  useEffect(() => {
    const params = {};
    if (search) params.q = search;
    if (activeCategory !== 'Tất cả') params.category = activeCategory;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [search, activeCategory, currentPage, setSearchParams]);

  const categories = ['Tất cả', ...new Set(posts.map(p => p.category))];

  const filtered = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tất cả' || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

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

  return (
    <Container className="py-5" style={{ maxWidth: '1100px' }}>
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
        <Breadcrumb.Item href="/home" linkProps={{ style: { textDecoration: 'none', color: '#0ea5e9', fontWeight: '600' } }}>🏠 Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: '#64748b', fontWeight: '500' }}>📚 Bài viết</Breadcrumb.Item>
      </Breadcrumb>

      <div className="text-center mb-5">
        <h2 style={{ fontWeight: '800', color: '#0f172a', letterSpacing: '-1px', fontSize: '2.5rem' }}>Khám Phá Bài Viết</h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Tìm kiếm những kiến thức và chia sẻ mới nhất từ cộng đồng.</p>
      </div>

      <Row className="mb-5 justify-content-center">
        <Col lg={8}>
          {/* Thanh tìm kiếm */}
          <InputGroup
            style={{
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              background: '#fff',
              padding: '4px'
            }}
          >
            <InputGroup.Text style={{ background: 'transparent', border: 'none', paddingLeft: '20px', fontSize: '1.2rem' }}>🔍</InputGroup.Text>
            <Form.Control
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder='Tìm kiếm bài viết theo tiêu đề...'
              style={{
                border: 'none',
                boxShadow: 'none',
                fontSize: '1.05rem',
                padding: '14px 10px',
                color: '#334155',
                background: 'transparent'
              }}
            />
            {search && (
              <Button
                variant='light'
                onClick={() => handleSearchChange('')}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  color: '#64748b',
                  borderRadius: '16px',
                  margin: '4px',
                  fontWeight: '600'
                }}
              >
                Xóa
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>

      {/* Bộ lọc category */}
      <div className='mb-5 d-flex gap-2 flex-wrap justify-content-center'>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'primary' : 'light'}
            onClick={() => handleCategoryChange(cat)}
            style={{
              borderRadius: '24px',
              padding: '8px 20px',
              fontWeight: '600',
              border: 'none',
              transition: 'all 0.3s ease',
              background: activeCategory === cat ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' : '#fff',
              color: activeCategory === cat ? '#fff' : '#475569',
              boxShadow: activeCategory === cat ? '0 8px 16px rgba(59, 130, 246, 0.25)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ fontWeight: '700', color: '#0f172a', margin: 0 }}>Kết quả tìm kiếm</h4>
        <Badge bg="light" text="dark" style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
          {filtered.length} bài viết
        </Badge>
      </div>

      {filtered.length === 0 ? (
        <div className='text-center py-5' style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px dashed #cbd5e1' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🥲</div>
          <h5 style={{ fontWeight: '700', color: '#475569' }}>Không tìm thấy bài viết nào!</h5>
          <p style={{ color: '#94a3b8' }}>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm nhé.</p>
        </div>
      ) : (
        <>
          <Row>
            {paginatedPosts.map(post => (
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
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  <Card.Body className="p-4 p-lg-5 d-flex flex-column flex-grow-1">
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <Badge
                        style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        {post.category}
                      </Badge>
                      <small style={{ color: '#94a3b8', fontWeight: '500' }}>{post.date}</small>
                    </div>

                    <Card.Title style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px', color: '#0f172a', lineHeight: '1.4' }}>
                      {post.title}
                    </Card.Title>

                    <Card.Text style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                      {post.body.substring(0, 150)}...
                    </Card.Text>

                    <div className='d-flex flex-wrap gap-2 mt-auto pt-4' style={{ borderTop: '1px solid #f1f5f9' }}>
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          bg='light'
                          text='secondary'
                          style={{
                            background: '#f8fafc',
                            color: '#64748b',
                            border: '1px solid #e2e8f0',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: '#f8fafc',
                      borderTop: 'none',
                      padding: '16px 32px',
                      fontSize: '0.9rem',
                      color: '#475569',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff' }}>
                      {post.author.charAt(0)}
                    </div>
                    {post.author}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.First
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default PostList;
