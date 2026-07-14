import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { formatVND } from '../utils/format'

export default function CarRow({ car, index, onDelete, canManage = true }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleDeleteConfirm = () => {
    onDelete(car.id)
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{car.name}</td>
        <td>{car.carType}</td>
        <td>{car.seats}</td>
        <td>{car.transmission}</td>
        <td>{car.lastServiced}</td>
        <td>{formatVND(car.priceWeekday)}</td>
        <td className="d-flex gap-2">
          <Button size="sm" variant="info" onClick={() => navigate(`/cars/${car.id}`)}>View</Button>
          {canManage && (
            <Button size="sm" variant="danger" aria-label="Delete row" onClick={() => setShowModal(true)}>Delete</Button>
          )}
        </td>
      </tr>
      <ModalConfirm
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        body="Are you sure you want to delete this car?"
      />
    </>
  )
}
