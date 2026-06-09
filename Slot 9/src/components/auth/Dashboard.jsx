/**
 * Dashboard.jsx – Màn hình sau khi đăng nhập thành công (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user.
 *       Hiển thị thông tin: tên, email, vai trò của user.
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useAuth } from '../../context/AuthContext';

const readOnlyInputStyle = {
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  outline: 'none',
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <p>tên: <input readOnly value={user.name} style={readOnlyInputStyle} /></p>
        <p>email: <input readOnly value={user.email} style={readOnlyInputStyle} /></p>
        <p>vai trò: <input readOnly value={user.role} style={readOnlyInputStyle} /></p>
      </div>
    </div>
  );
}
