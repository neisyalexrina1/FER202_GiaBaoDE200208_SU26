/**
 * formReducer.js – Reducer quản lý form đăng ký (Bài 3)
 */
import { validateField } from '../utils/validators';

export const initialState = {
  values:  { fullName: '', email: '', password: '', confirmPassword: '' },
  errors:  { fullName: '', email: '', password: '', confirmPassword: '' },
  touched: { fullName: false, email: false, password: false, confirmPassword: false },
  status: 'idle'
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { field, value } = action;
      const newValues = { ...state.values, [field]: value };
      const newErrors = { ...state.errors };

      if (state.touched[field]) {
        newErrors[field] = validateField(field, value, newValues);
      }

      if (field === 'password' && state.touched.confirmPassword) {
        newErrors.confirmPassword = validateField('confirmPassword', newValues.confirmPassword, newValues);
      }

      return {
        ...state,
        values: newValues,
        errors: newErrors
      };
    }
    case 'BLUR': {
      const { field } = action;
      const error = validateField(field, state.values[field], state.values);
      return {
        ...state,
        touched: { ...state.touched, [field]: true },
        errors: { ...state.errors, [field]: error }
      };
    }
    case 'VALIDATE_ALL': {
      const newErrors = {};
      const newTouched = {};
      let hasError = false;

      for (const field in state.values) {
        newTouched[field] = true;
        const err = validateField(field, state.values[field], state.values);
        newErrors[field] = err;
        if (err) hasError = true;
      }

      return {
        ...state,
        errors: newErrors,
        touched: newTouched,
        status: hasError ? 'error' : state.status
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
