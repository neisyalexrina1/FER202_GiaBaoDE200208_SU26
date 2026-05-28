// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import RegistrationForm from './components/RegistrationForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%)',
        fontFamily: "'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      }}>
        {/* Navbar luôn hiển thị ở mọi trang */}
        <AppNavbar />

        {/* Định nghĩa các route */}
        <Routes>
          {/* Đăng ký chạy trước tiên ở trang chủ / */}
          <Route path='/' element={<RegistrationForm />} />
          
          {/* Trang chủ blog được định tuyến về /home */}
          <Route path='/home' element={<Home />} />
          
          <Route path='/posts' element={<PostList />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/registration' element={<RegistrationForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
