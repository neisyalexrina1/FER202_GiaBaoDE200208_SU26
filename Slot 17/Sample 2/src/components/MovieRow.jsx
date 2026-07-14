import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatPriceRange } from '../utils/format'
// TODO-06: import ModalConfirm from './ModalConfirm'
import ModalConfirm from './ModalConfirm'

function MovieRow({ movie, index, onDelete }) {
  const navigate = useNavigate()
  // TODO-06: const [showModal, setShowModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // TODO-06: handleDeleteConfirm — call onDelete(movie.id) then setShowModal(false)
  const handleDeleteConfirm = () => {
    // TODO-06
    onDelete(movie.id)
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.director}</td>
        <td>{movie.studio}</td>
        <td>{movie.releaseDate}</td>
        {/* PROVIDED */}
        <td>{formatPriceRange(movie.ticketPrice, movie.vipPrice)}</td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-1"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            View
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            Delete
          </Button>
        </td>
      </tr>
      {/* TODO-06: Add ModalConfirm with show={showModal}, title, message, onConfirm, onCancel */}
      <ModalConfirm
        show={showModal}
        title="Delete Movie"
        message={`Are you sure you want to delete "${movie.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}

export default MovieRow
