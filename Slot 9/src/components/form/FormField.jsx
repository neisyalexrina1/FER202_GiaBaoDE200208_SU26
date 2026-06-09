/**
 * FormField.jsx – Input field tái sử dụng cho form đăng ký (Bài 3)
 */
import { useFormContext } from '../../context/FormContext';

export default function FormField({ name, label, type = 'text', placeholder }) {
  const { state, dispatch } = useFormContext();

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE', field: name, value: e.target.value });
  };

  const handleBlur = () => {
    dispatch({ type: 'BLUR', field: name });
  };

  const hasError = state.touched[name] && state.errors[name];

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={state.values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {hasError && <div className="invalid-feedback">{state.errors[name]}</div>}
    </div>
  );
}
