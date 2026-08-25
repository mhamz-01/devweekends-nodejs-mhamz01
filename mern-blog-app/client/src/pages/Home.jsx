import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../api'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data.blogs || [])
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading blogs...</p>

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.length === 0 && <p>No blogs yet. Be the first to write one!</p>}
      {blogs.map((blog) => (
        <Link to={`/blog/${blog._id}`} key={blog._id} className="blog-card">
          <div>
            <h2>{blog.title}</h2>
            <p>By {blog.createdBy?.fullName || 'Unknown'}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
