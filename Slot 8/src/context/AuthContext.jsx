import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext(null)

// Hàm lấy state ban đầu từ localStorage (EXT-04)
function getInitialState() {
  const savedUser = localStorage.getItem('authUser')
  if (savedUser) {
    return { isAuthenticated: true, user: JSON.parse(savedUser), error: null, isLoading: false }
  }
  return { isAuthenticated: false, user: null, error: null, isLoading: false }
}

const initialState = getInitialState()

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS': {
      const newState = { isAuthenticated: true, user: action.payload, error: null, isLoading: false }
      localStorage.setItem('authUser', JSON.stringify(action.payload))
      return newState
    }
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, error: action.payload, isLoading: false }
    case 'CHANGE_PASSWORD': {
      // Cập nhật user object với password mới
      const updatedUser = { ...state.user, password: action.payload }
      const newState = { ...state, user: updatedUser }
      localStorage.setItem('authUser', JSON.stringify(updatedUser))
      return newState
    }
    case 'LOGOUT':
      localStorage.removeItem('authUser')
      return { isAuthenticated: false, user: null, error: null, isLoading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
