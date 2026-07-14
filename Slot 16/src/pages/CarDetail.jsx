import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchCarById } from '../api/carApi'
import { useCar } from '../context/CarContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useCar()
  const { carTypes } = state
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCarById(id)
      .then((data) => { setCar(data); setLoading(false) })
      .catch((err) => { setError(err.message || 'Failed to load car.'); setLoading(false) })
  }, [id])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!car) return null

  const carTypeName = carTypes.find((rt) => String(rt.id) === String(car.carTypeId))?.name ?? '—'

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>← Back</Button>
      <Card className="shadow-sm">
        <Card.Header as="h4">{car.name}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Car Type:</strong> <Badge bg="primary">{carTypeName}</Badge></ListGroup.Item>
            <ListGroup.Item><strong>Seats:</strong> {car.seats}</ListGroup.Item>
            <ListGroup.Item><strong>Transmission:</strong> {car.transmission}</ListGroup.Item>
            <ListGroup.Item><strong>Price Weekday:</strong> {formatVND(car.priceWeekday)}</ListGroup.Item>
            <ListGroup.Item><strong>Price Weekend:</strong> {formatVND(car.priceWeekend)}</ListGroup.Item>
            <ListGroup.Item><strong>Last Serviced:</strong> {formatDateDisplay(car.lastServiced)}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
