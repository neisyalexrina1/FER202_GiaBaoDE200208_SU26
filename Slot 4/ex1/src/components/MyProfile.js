import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function MyProfile({ profile }) {
  return (
    <div>
      { }
      <Container>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={profile.avatarSrc} />
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                  ID: {profile.id} <br />
                  Email: {profile.email} <br />
                  GitHub: <a href={profile.githubLink}>{profile.githubLink}</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyProfile;
