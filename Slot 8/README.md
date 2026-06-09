[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/rB2Jd6cc)
# Lab: useContext + useReducer — Login App với React Bootstrap

## Mục tiêu

- Hiểu và áp dụng `useContext` để chia sẻ state toàn cục.
- Dùng `useReducer` quản lý logic xác thực (authentication).
- Xây dựng UI với **React Bootstrap**.
- Tổ chức code theo cấu trúc thư mục chuẩn.
- Viết code **pass toàn bộ automated test cases**.

---

## Cài đặt

```bash
npm install
npm run dev        # chạy app
npm test           # chạy tất cả test (1 lần)
npm run test:watch # chạy test ở chế độ watch
```

---

## Thông tin cá nhân
| Mã SV | Họ Tên | Email | Link Github|
|---------|---------|---------|---------|
| DE200208 | Đỗ Minh Gia Bảo | dominhgiabaobmg@gmail.com | https://github.com/neisyalexrina1 |

## Cấu trúc thư mục

```
src/
├── __tests__/                 ← [CÓ SẴN - KHÔNG CHỈNH SỬA]
│   ├── utils/
│   │   └── authHelpers.test.js
│   ├── context/
│   │   └── AuthContext.test.jsx
│   ├── components/
│   │   ├── LoginForm.test.jsx
│   │   ├── Dashboard.test.jsx
│   │   └── AppNavbar.test.jsx
│   └── App.test.jsx
│
├── context/                   ← [Tạo] AuthContext.jsx
├── components/                ← [Tạo] LoginForm.jsx, Dashboard.jsx, AppNavbar.jsx
├── pages/                     ← [Tạo] LoginPage.jsx, DashboardPage.jsx
├── hooks/                     ← [Tạo] useAuth.js
├── utils/                     ← [Tạo] authHelpers.js
├── data/                      ← [Tạo] users.js
├── App.jsx                    ← [Sửa] điều phối trang theo auth state
├── main.jsx                   ← [Sửa] bọc App bằng AuthProvider
└── setupTests.js              ← [CÓ SẴN - KHÔNG CHỈNH SỬA]
```

> **Quy tắc:** Không được chỉnh sửa các file trong `__tests__/`, `setupTests.js`, `package.json`, `vite.config.js`, `index.html`.

---

## Test Cases (automated)

Chạy `npm test` để kiểm tra. Mục tiêu: **tất cả test PASS**.

| Test file | Test Cases | Mô tả |
|---|---|---|
| `authHelpers.test.js` | TC-07a → TC-07f | Kiểm tra hàm `findUser()` |
| `AuthContext.test.jsx` | Initial state, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, TC-06 | Reducer logic + Provider |
| `LoginForm.test.jsx` | TC-01, TC-02 | Render form, hiển thị lỗi |
| `Dashboard.test.jsx` | TC-03, TC-04 | Thông tin user, Badge màu theo role |
| `AppNavbar.test.jsx` | Navbar hiển thị, Logout | Navbar khi đã đăng nhập |
| `App.test.jsx` | TC-01, TC-03, TC-05 | Integration: login flow, logout flow |

---

## Hướng dẫn từng bước

### Bước 1 — `src/data/users.js`

Tạo mảng người dùng. Phải có **ít nhất 2 user**: 1 `admin` và 1 `user`.

```js
// src/data/users.js
const USERS = [
  { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin' },
  { id: 2, username: 'user',  password: '123', name: 'Normal User', role: 'user'  },
]
export default USERS
```

---

### Bước 2 — `src/utils/authHelpers.js`

```js
// src/utils/authHelpers.js
import USERS from '../data/users'

export function findUser(username, password) {
  // Trả về object user nếu tìm thấy, null nếu không
}
```

✅ **Test liên quan:** `authHelpers.test.js` (TC-07a → TC-07f)

---

### Bước 3 — `src/context/AuthContext.jsx`

**Bắt buộc export:**
- `export function AuthProvider({ children })` — Provider component
- `export const AuthContext` — để test file import trực tiếp

**initialState:**
```js
{ isAuthenticated: false, user: null, error: null }
```

**authReducer xử lý 3 action types:**

| Action type | Kết quả |
|---|---|
| `LOGIN_SUCCESS` | `isAuthenticated: true`, lưu `user`, xóa `error` |
| `LOGIN_FAILURE` | `error: action.payload`, giữ `isAuthenticated: false` |
| `LOGOUT` | reset về `initialState` |

✅ **Test liên quan:** `AuthContext.test.jsx`

---

### Bước 4 — `src/hooks/useAuth.js`

```js
// src/hooks/useAuth.js
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return context
}
```

> ⚠️ Thông báo lỗi phải khớp **chính xác**: `'useAuth phải được dùng bên trong AuthProvider'`

✅ **Test liên quan:** `AuthContext.test.jsx` (TC-06)

---

### Bước 5 — `src/components/LoginForm.jsx`

**Yêu cầu UI (React Bootstrap):**
- `Card` với `Card.Header` màu primary, `Card.Body`, `Card.Footer`
- `Form.Group` + `Form.Control` với `placeholder="Username"` và `placeholder="Password"`
- Input password phải có `type="password"`
- `Alert variant="danger"` khi `state.error` có giá trị (`role="alert"` tự có trong Bootstrap Alert)
- `Button` loại `submit`, text chứa **"Đăng nhập"**

**Yêu cầu logic:**
- Dùng `useAuth()` từ `hooks/useAuth.js`
- Gọi `findUser()` từ `utils/authHelpers.js` khi submit
- Dispatch `LOGIN_SUCCESS` hoặc `LOGIN_FAILURE`

✅ **Test liên quan:** `LoginForm.test.jsx` (TC-01, TC-02)

---

### Bước 6 — `src/components/Dashboard.jsx`

**Yêu cầu UI:**
- Hiển thị `user.name`
- `Badge` cho role:
  - `role === 'admin'` → `bg="danger"` (class `bg-danger`)
  - `role === 'user'`  → `bg="success"` (class `bg-success`)
- Text bên trong Badge phải là đúng chuỗi `"admin"` hoặc `"user"` (chữ thường)
- `Button` với text chứa **"Đăng xuất"** hoặc **"Logout"**

✅ **Test liên quan:** `Dashboard.test.jsx` (TC-03, TC-04)

---

### Bước 7 — `src/components/AppNavbar.jsx`

**Yêu cầu UI:**
- Phải render thẻ `<nav>` (React Bootstrap `Navbar` tự render `role="navigation"`)
- Hiển thị `user.name`
- Có `Button` với text chứa **"Logout"** hoặc **"Đăng xuất"**
- Click nút Logout → dispatch `{ type: 'LOGOUT' }`

```jsx
import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
```

✅ **Test liên quan:** `AppNavbar.test.jsx`

---

### Bước 8 — `src/pages/LoginPage.jsx`

```jsx
import LoginForm from '../components/LoginForm'
function LoginPage() { return <LoginForm /> }
export default LoginPage
```

---

### Bước 9 — `src/pages/DashboardPage.jsx`

```jsx
import Dashboard from '../components/Dashboard'
function DashboardPage() { return <Dashboard /> }
export default DashboardPage
```

---

### Bước 10 — Hoàn thiện `src/App.jsx`

- Import `useAuth` từ `hooks/useAuth.js`
- Khi `isAuthenticated === true`:
  - Render `<AppNavbar />` **và** `<DashboardPage />`
- Khi `isAuthenticated === false`:
  - Render `<LoginPage />` (không có Navbar)

✅ **Test liên quan:** `App.test.jsx` (TC-01, TC-03, TC-05)

---

### Bước 11 — Hoàn thiện `src/main.jsx`

Bỏ comment, bọc `<App />` bằng `<AuthProvider>`.

---

## Tài khoản test

| Username | Password | Role  |
|----------|----------|-------|
| admin    | 123      | admin |
| user     | 123      | user  |

---

## Kiểm tra kết quả

```bash
npm test
```

Output mong đợi:

```
✓ src/__tests__/utils/authHelpers.test.js        (6 tests)
✓ src/__tests__/context/AuthContext.test.jsx     (9 tests)
✓ src/__tests__/components/LoginForm.test.jsx    (8 tests)
✓ src/__tests__/components/Dashboard.test.jsx    (7 tests)
✓ src/__tests__/components/AppNavbar.test.jsx    (4 tests)
✓ src/__tests__/App.test.jsx                     (8 tests)

Test Files  6 passed (6)
Tests      42 passed (42)
```

---

## Phần mở rộng (Extension)

Hoàn thành phần cơ bản (tất cả test pass) trước, sau đó chọn **ít nhất 2** mục:

### EXT-01 — Loading state khi login

Thêm `isLoading: false` vào `initialState`. Hiển thị `<Spinner animation="border" size="sm" />` bên trong nút Đăng nhập khi đang xử lý.

### EXT-02 — Đổi mật khẩu (Change Password)

Thêm trang `ChangePasswordPage`:
- Form: mật khẩu hiện tại, mật khẩu mới, xác nhận mật khẩu mới.
- Validate: mật khẩu mới >= 6 ký tự, 2 trường xác nhận phải khớp.
- Thêm action `CHANGE_PASSWORD` vào reducer.
- Hiển thị `Toast` thành công sau khi đổi.

### EXT-03 — Danh sách User (chỉ Admin)

Thêm trang `UserListPage`:
- Chỉ hiển thị khi `user.role === 'admin'`.
- Dùng `Table` liệt kê tất cả users trong `data/users.js`.
- User thường truy cập → hiển thị `Alert` "Bạn không có quyền truy cập".

### EXT-04 — Persist Login với localStorage

- `LOGIN_SUCCESS` → lưu user vào `localStorage`.
- App khởi động → đọc `localStorage`, khôi phục state nếu có.
- `LOGOUT` → xóa khỏi `localStorage`.

### EXT-05 — Theme Toggle (Dark / Light Mode)

- Tạo `ThemeContext` riêng với `ThemeProvider`.
- Nút toggle trong Navbar.
- Áp dụng `data-bs-theme="dark"` vào container để Bootstrap tự render dark mode.

---

## Nộp bài

1. Commit toàn bộ code lên repository GitHub Classroom.
2. Không commit `node_modules`.
3. Đảm bảo `npm install && npm test` chạy không lỗi trên máy khác.
4. Commit message cuối ghi rõ phần mở rộng đã làm:
   ```
   feat: complete base (42 tests pass) + EXT-01 + EXT-04
   ```

---

## Tham khảo

- [React – useContext](https://react.dev/reference/react/useContext)
- [React – useReducer](https://react.dev/reference/react/useReducer)
- [React Bootstrap](https://react-bootstrap.netlify.app/docs/components/alerts)
- [Vitest](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
