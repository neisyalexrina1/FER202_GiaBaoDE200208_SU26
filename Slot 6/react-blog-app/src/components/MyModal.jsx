// src/components/MyModal.jsx
import { Modal, Button } from 'react-bootstrap';

function MyModal({ show, handleClose, title, message, onConfirm }) {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border-0 shadow-lg"
      style={{
        borderRadius: '20px',
        overflow: 'hidden'
      }}
    >
      {/* Accent gradient header */}
      <div style={{ height: '8px', background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)' }}></div>
      
      <Modal.Header className="border-0 pb-0 d-flex justify-content-center">
        <Modal.Title style={{ fontWeight: '800', color: '#155724', fontSize: '1.5rem', textAlign: 'center', marginTop: '15px' }}>
          {title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="text-center px-4 py-3">
        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🎉</div>
        <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
          {message}
        </p>
      </Modal.Body>
      
      <Modal.Footer className="border-0 pt-0 d-flex justify-content-center pb-4">
        <Button 
          variant="success" 
          onClick={onConfirm}
          style={{
            borderRadius: '25px',
            padding: '10px 30px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.2)',
            minWidth: '150px'
          }}
        >
          OK, Khám phá Blog!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
