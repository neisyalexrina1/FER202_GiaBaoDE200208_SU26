import LoginForm from '../components/LoginForm'

function LoginPage() { 
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <LoginForm />
      </div>
    </div>
  )
}
export default LoginPage
