import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function MyPizza({pizza}) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={pizza.imageSrc} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          <strong>ID:</strong> {pizza.id} <br />
          <strong>Description:</strong> {pizza.description} <br />
          <strong>Old Price:</strong> {pizza.oldPrice ? <del>{pizza.oldPrice}</del> : 'N/A'} <br />
          <strong>New Price:</strong> <span className="text-danger">{pizza.newPrice}</span> <br />
          {pizza.tag && (
            <Badge bg={pizza.tag === 'Sale' ? 'danger' : 'success'} className="mt-2">
              {pizza.tag}
            </Badge>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyPizza;
