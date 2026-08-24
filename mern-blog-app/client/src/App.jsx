import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import AddBlog from './pages/AddBlog.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/add-new" element={<AddBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/signup" element={<SignUp />} />
        </Routes>
      </main>
    </>
  )
}
