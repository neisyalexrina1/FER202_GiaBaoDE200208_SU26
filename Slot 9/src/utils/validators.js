/**
 * validators.js – Hàm validate cho từng field của form đăng ký (Bài 3)
 */
export function validateField(name, value, allValues = {}) {
  switch (name) {
    case 'fullName':
      if (!value || value.trim() === '') return 'Không được để trống';
      if (value.trim().length < 3) return 'Cần ít nhất 3 ký tự';
      return '';

    case 'email':
      if (!value || value.trim() === '') return 'Không được để trống';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không hợp lệ';
      return '';

    case 'password':
      if (!value) return 'Không được để trống';
      if (value.length < 6) return 'Cần ít nhất 6 ký tự';
      if (!/[A-Z]/.test(value)) return 'Cần ít nhất 1 chữ hoa';
      if (!/[0-9]/.test(value)) return 'Cần ít nhất 1 chữ số';
      return '';

    case 'confirmPassword':
      if (!value) return 'Không được để trống';
      if (value !== allValues.password) return 'Mật khẩu không khớp';
      return '';

    default:
      return '';
  }
}
