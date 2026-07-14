import { render, screen } from '@testing-library/react'
import App from '../App'

test('scaffold renders without crashing', () => {
  render(<App />)
  expect(screen.getAllByText(/Car Rental Management App/i)[0]).toBeInTheDocument()
})
