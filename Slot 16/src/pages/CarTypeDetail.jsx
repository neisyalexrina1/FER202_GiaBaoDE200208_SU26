import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange, formatDateDisplay } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [carTypesData, allCarsData] = await Promise.all([fetchCarTypes(), fetchCars()])
        const found = carTypesData.find((rt) => String(rt.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setCarType(found)
        setCars(allCarsData.filter((r) => String(r.carTypeId) === String(id)))
      } catch (err) {
        setError(err.message || 'Failed to fetch data.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!carType) return null

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/car-types')}>← Back to Car Types</Button>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3">{carType.name} <Badge bg="secondary" className="ms-2 fs-6 align-middle">ID: {carType.id}</Badge></Card.Title>
        </Card.Body>
      </Card>
      <h4 className="mb-3">Cars of this type</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr><td colSpan={5} className="text-center">No cars found for this type.</td></tr>
          ) : (
            cars.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.seats}</td>
                <td>{c.transmission}</td>
                <td>{formatPriceRange(c.priceWeekday, c.priceWeekend)}</td>
                <td>{formatDateDisplay(c.lastServiced)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
