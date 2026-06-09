import { BrowserRouter } from 'react-router-dom'
import AppNavbar from './components/shared/AppNavbar'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <AppRoutes />
    </BrowserRouter>
  )
}
