import { useState } from 'react'
import { Table, Spinner, Alert, Pagination, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCar } from '../context/CarContext'
import { deleteCar } from '../api/carApi'
import FilterBar from '../components/FilterBar'
import CarRow from '../components/CarRow'

const PAGE_SIZE = 5

export default function CarList() {
  const { state, dispatch } = useCar()
  const { cars, carTypes, loading, error } = state
  const navigate = useNavigate()
  const [nameFilter, setNameFilter] = useState('')
  const [carTypeFilter, setCarTypeFilter] = useState('')
  const [page, setPage] = useState(1)

  const enriched = cars.map((r) => ({
    ...r,
    carType: carTypes.find((rt) => String(rt.id) === String(r.carTypeId))?.name ?? '—',
  }))

  const filtered = enriched.filter((r) => {
    const nameMatch = r.name.toLowerCase().includes(nameFilter.toLowerCase())
    const typeMatch = !carTypeFilter || String(r.carTypeId) === String(carTypeFilter)
    return nameMatch && typeMatch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)
      dispatch({ type: 'DELETE_CAR', payload: id })
    } catch {
      alert('Failed to delete car.')
    }
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Car List</h2>
        <Button variant="primary" onClick={() => navigate('/add')}>+ Add Car</Button>
      </div>
      <FilterBar
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setPage(1) }}
        carTypeFilter={carTypeFilter}
        setCarTypeFilter={(v) => { setCarTypeFilter(v); setPage(1) }}
        carTypes={carTypes}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Car Type</th>
            <th>Brand</th>
            <th>Transmission</th>
            <th>Last Serviced</th>
            <th>Price Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr><td colSpan={8} className="text-center">No cars found.</td></tr>
          ) : (
            paginated.map((r, i) => (
              <CarRow
                key={r.id}
                car={r}
                index={(page - 1) * PAGE_SIZE + i + 1}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  )
}
