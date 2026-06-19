import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmModal({ show, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>⚠️ Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <span style={{ fontSize: '3rem' }}>🗑️</span>
        <p className="mt-3 mb-0 fs-5">Are you sure you want to delete this feedback?</p>
        <small className="text-muted">This action cannot be undone.</small>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0 pb-4">
        <Button variant="outline-secondary" onClick={onHide} className="px-4">Cancel</Button>
        <Button variant="danger" onClick={onConfirm} className="px-4 fw-bold shadow-sm">🗑️ Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmModal
