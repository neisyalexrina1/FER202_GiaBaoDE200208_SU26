import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { fetchAllPosts } from "./api";

const PostComponent = React.lazy(() => import("./Post"));

const PostListWrapper = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">Error loading posts: {error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <div
        className="text-white text-center py-5"
        style={{ backgroundColor: "#1a0a4e" }}
      >
        <h1>
          <span className="me-2">👥</span> Posts
        </h1>
      </div>
      <Container className="mt-4">
        <Row>
          {posts.map((post) => (
            <React.Suspense
              key={post.id}
              fallback={
                <div className="text-center py-3">
                  <Spinner animation="border" size="sm" variant="secondary" />
                </div>
              }
            >
              <PostComponent post={post} />
            </React.Suspense>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PostListWrapper;
