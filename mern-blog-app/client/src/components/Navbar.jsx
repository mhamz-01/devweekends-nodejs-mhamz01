import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { logout } from '../api'

export default function Navbar() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Blogify</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/blog/add-new">Write a Blog</Link>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/user/signin">Sign In</Link>
            <Link to="/user/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
