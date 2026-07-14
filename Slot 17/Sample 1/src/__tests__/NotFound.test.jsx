import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

describe('TODO-09: NotFound — trang 404', () => {
  test('hiển thị mã lỗi 404', () => {
    renderPage()
    expect(screen.getByText(/404/)).toBeInTheDocument()
  })

  test('có thông báo lỗi rõ ràng', () => {
    renderPage()
    expect(screen.getByText(/not found|không tồn tại|không tìm thấy/i)).toBeInTheDocument()
  })

  test('có nút/link quay về trang chủ (to="/")', () => {
    renderPage()
    // React-Bootstrap <Button as={Link}> render ra role="button" chứ không phải "link"
    const el = screen.getByText(/back to home|trang chủ/i).closest('a, button')
    expect(el).toHaveAttribute('href', '/')
  })
})
