import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CarRow from '../components/CarRow'

const mockCar = {
  id: '1', name: 'Car 101', carType: 'Economy', brand: 'Toyota',
  transmission: 'Automatic', priceWeekday: 800000, priceWeekend: 1200000, lastServiced: '15/03/2022'
}

const mockDelete = jest.fn()

const renderRow = (car = mockCar) =>
  render(
    <MemoryRouter>
      <table><tbody>
        <CarRow car={car} index={1} onDelete={mockDelete} />
      </tbody></table>
    </MemoryRouter>
  )

describe('TODO-06: CarRow — Delete với ModalConfirm', () => {
  test('nhấn Delete → modal xuất hiện với tên xe', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText(/Car 101/)).toBeInTheDocument()
    })
  })

  test('xác nhận modal → gọi onDelete với id xe', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => screen.getByText(/Car 101/))
    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }))
    expect(mockDelete).toHaveBeenCalledWith('1')
  })
})

describe('TODO-07: CarRow — Price Range column', () => {
  test('hiển thị giá weekday trong cột Price Range', () => {
    renderRow()
    expect(screen.getByText(/800/)).toBeInTheDocument()
  })

  test('hiển thị giá weekend trong cột Price Range', () => {
    renderRow()
    expect(screen.getByText(/1.200|1,200/)).toBeInTheDocument()
  })
})
