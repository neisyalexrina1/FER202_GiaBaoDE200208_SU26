/**
 * AuthNavbar.jsx – Thanh điều hướng hiển thị thông tin đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user và logout.
 *       Nếu user tồn tại:  hiển thị tên user và nút "Đăng xuất"
 *       Nếu chưa đăng nhập: hiển thị "Chưa đăng nhập"
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useAuth } from '../../context/AuthContext';

export default function AuthNavbar() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <span>Xin chào, {user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </div>
  );
}
