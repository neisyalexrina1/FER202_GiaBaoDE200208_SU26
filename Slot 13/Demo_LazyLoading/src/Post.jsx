import React from "react";
import Col from "react-bootstrap/Col";

const Post = ({ post }) => {
  return (
    <Col md={6} className="mb-4">
      <h5 className="fw-bold">{post.title}</h5>
      <p className="text-muted">{post.body}</p>
    </Col>
  );
};

export default Post;
