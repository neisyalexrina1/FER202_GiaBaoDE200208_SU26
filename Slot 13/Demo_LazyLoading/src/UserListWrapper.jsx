import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { fetchAllUsers } from "./api";

const UserComponent = React.lazy(() => import("./User"));

const UserListWrapper = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        setUsers(data);
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
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">Error loading users: {error}</Alert>
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
          <span className="me-2">👥</span> Users
        </h1>
      </div>
      <Container>
        {users.map((user) => (
          <React.Suspense
            key={user.id}
            fallback={
              <div className="text-center py-3">
                <Spinner animation="border" size="sm" variant="secondary" />
              </div>
            }
          >
            <UserComponent user={user} />
          </React.Suspense>
        ))}
      </Container>
    </div>
  );
};

export default UserListWrapper;
