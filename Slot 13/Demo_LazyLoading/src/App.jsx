import React, { Suspense, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";

// Lazy load components using React.lazy
const UserListWrapper = React.lazy(() => import("./UserListWrapper"));
const PostListWrapper = React.lazy(() => import("./PostListWrapper"));

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#">Logo</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              active={activeTab === "posts"}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading...</p>
          </div>
        }
      >
        {activeTab === "home" && <UserListWrapper />}
        {activeTab === "posts" && <PostListWrapper />}
      </Suspense>
    </div>
  );
};

export default App;
