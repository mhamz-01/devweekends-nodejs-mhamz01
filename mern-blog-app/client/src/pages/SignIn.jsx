import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signin } from '../api'
import { useAuth } from '../context/AuthContext.jsx'

export default function SignIn() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const data = await signin(email, password)
    if (data.user) {
      setUser(data.user)
      navigate('/')
    } else {
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      <p>Don't have an account? <Link to="/user/signup">Sign Up</Link></p>
    </form>
  )
}
