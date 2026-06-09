/**
 * AuthContext.jsx – Context quản lý trạng thái đăng nhập (Bài 2)
 *
 * Import dữ liệu: import USERS from '../data/users'
 *
 * TODO 1: Tạo AuthContext bằng createContext()
 *
 * TODO 2: Tạo AuthProvider component
 *         State cần quản lý:
 *         - user    : object | null  (null = chưa đăng nhập)
 *         - loading : boolean        (đang xử lý đăng nhập)
 *         - error   : string         (thông báo lỗi)
 *
 *         Hàm login(email, password):
 *         - Bật loading, xóa error
 *         - Giả lập API call bằng setTimeout (800ms)
 *         - Tìm user trong USERS theo email và password
 *         - Nếu tìm thấy: setUser, tắt loading
 *         - Nếu không: setError('Email hoặc mật khẩu không đúng.'), tắt loading
 *
 *         Hàm logout():
 *         - Xóa user (null) và error
 *
 *         Truyền { user, loading, error, login, logout } vào value của Provider
 *
 * TODO 3: Tạo custom hook useAuth()
 *         - Gọi useContext(AuthContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: AuthProvider, useAuth
 */
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import USERS from '../data/users';

const AuthContext = createContext();
const FAKE_API_DELAY_MS = 800;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = (email, password) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const foundUser = USERS.find((u) => u.email === email && u.password === password);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('Email hoặc mật khẩu không đúng.');
      }
      setLoading(false);
    }, FAKE_API_DELAY_MS);
  };

  const logout = () => {
    setUser(null);
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
