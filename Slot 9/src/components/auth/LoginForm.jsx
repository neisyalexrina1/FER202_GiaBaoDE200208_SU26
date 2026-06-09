/**
 * LoginForm.jsx – Form đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy login, loading, error.
 *       Local state (useState) cho email và password chỉ dùng trong component này.
 *
 *       Render:
 *         - Input email (có label, id="email")
 *         - Input password (có label, id="password")
 *         - Hiển thị error nếu có
 *         - Nút "Đăng nhập" (disabled khi loading, hiện text loading khi đang xử lý)
 *
 *       Khi submit: gọi login(email, password)
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'loading' : 'Đăng nhập'}
      </button>
    </form>
  );
}
