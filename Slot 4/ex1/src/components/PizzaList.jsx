import React from 'react';
import MyPizza from "./MyPizza";
import { pizzaData } from '../data/pizzaData';
import { Container, Row, Col } from 'react-bootstrap';

function PizzaList() {
  return (
    <div>
      { }
      <Container style={{ marginTop: '20px' }}>
        <Row>
          {pizzaData.map((p) => (
            <Col key={p.id} sm={12} md={6} lg={4}>
              <MyPizza pizza={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PizzaList;
