import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Spinner, Table, Badge } from 'react-bootstrap'
import { fetchGenres, fetchMovies } from '../api/movieApi'

function GenreDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [genre, setGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // TODO-09: Use Promise.all([fetchGenres(), fetchMovies()]) to fetch both concurrently.
      //          Find genre: genres.find(g => String(g.id) === String(id))
      //          If not found → navigate('/not-found', { replace: true }) then return.
      //          Filter movies: allMovies.filter(b => String(b.genreId) === String(id))
      //          On success: setGenre(found), setMovies(filtered).
      //          Finally: setLoading(false).
      try {
        const [genres, allMovies] = await Promise.all([fetchGenres(), fetchMovies()])
        const found = genres.find(g => String(g.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        const filtered = allMovies.filter(b => String(b.genreId) === String(id))
        setGenre(found)
        setMovies(filtered)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-09: if loading → return <Container className="mt-4"><Spinner animation="border" role="status" /></Container>
  if (loading) return <Container className="mt-4"><Spinner animation="border" role="status" /></Container>

  // TODO-09: if !genre → return null  (safety while navigating)
  if (!genre) return null

  return (
    <Container className="mt-4" style={{ maxWidth: 700 }}>
      {/* TODO-09: <Button> onClick={() => navigate('/genres')} — text "← Back to Genres" */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/genres')}>← Back to Genres</Button>

      {/* TODO-09: <Card> showing:
            Card.Header: "Genre Detail"
            Card.Body:
              <p><strong>Name:</strong> <Badge bg="primary">{genre.name}</Badge></p>
              <p><strong>Total Movies:</strong> {movies.length}</p>
      */}
      <Card className="mb-4">
        <Card.Header>Genre Detail</Card.Header>
        <Card.Body>
          <p className="mb-2"><strong>Name:</strong> <Badge bg="primary">{genre.name}</Badge></p>
          <p className="mb-0"><strong>Total Movies:</strong> {movies.length}</p>
        </Card.Body>
      </Card>

      {/* TODO-09: <Table bordered hover size="sm">
            Columns: #, Title, Director, Studio, Release Date
            If movies.length === 0 → colSpan row "No movies in this genre"
            Else → movies.map(...)
      */}
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Director</th>
            <th>Studio</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr><td colSpan={5} className="text-center text-muted">No movies in this genre</td></tr>
          ) : (
            movies.map((m, idx) => (
              <tr key={m.id}>
                <td>{idx + 1}</td>
                <td>{m.title}</td>
                <td>{m.director}</td>
                <td>{m.studio}</td>
                <td>{m.releaseDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default GenreDetail
