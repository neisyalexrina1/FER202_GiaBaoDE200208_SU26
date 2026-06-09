/**
 * RegistrationForm.jsx – Form đăng ký với validation (Bài 3)
 */
import FormField from './FormField';
import { useFormContext } from '../../context/FormContext';
import { validateField } from '../../utils/validators';

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'VALIDATE_ALL' });

    let hasError = false;
    for (const key in state.values) {
      if (validateField(key, state.values[key], state.values)) {
        hasError = true;
      }
    }

    if (hasError) return;

    dispatch({ type: 'SET_STATUS', status: 'submitting' });
    setTimeout(() => {
      dispatch({ type: 'SET_STATUS', status: 'success' });
    }, 1000);
  };

  if (state.status === 'success') {
    return (
      <div className="alert alert-success text-center">
        <h4>Đăng ký thành công!</h4>
        <button className="btn btn-success mt-3" onClick={() => dispatch({ type: 'RESET' })}>
          Đăng ký lại
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {state.status === 'error' && (
        <div className="alert alert-danger">Vui lòng kiểm tra lại các trường bị lỗi.</div>
      )}

      <FormField name="fullName" label="Họ và tên" placeholder="Nhập họ và tên" />
      <FormField name="email" label="Email" type="email" placeholder="Nhập email" />
      <FormField name="password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />
      <FormField name="confirmPassword" label="Xác nhận mật khẩu" type="password" placeholder="Xác nhận mật khẩu" />

      <button 
        type="submit" 
        className="btn btn-primary w-100 mt-3" 
        disabled={state.status === 'submitting'}
      >
        {state.status === 'submitting' ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  );
}
