import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog, addComment } from '../api'
import { useAuth } from '../context/AuthContext.jsx'

export default function BlogDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlog(id).then((data) => {
      setBlog(data.blog)
      setComments(data.comments || [])
      setLoading(false)
    })
  }, [id])

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return

    const data = await addComment(id, content)
    if (data.comment) {
      setComments([...comments, { ...data.comment, createdBy: user }])
      setContent('')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Blog not found.</p>

  return (
    <div className="blog-detail">
      {blog.coverImageURL && (
        <img src={`http://localhost:4000${blog.coverImageURL}`} alt={blog.title} />
      )}
      <h1>{blog.title}</h1>
      <p className="author">By {blog.createdBy?.fullName}</p>
      <p className="body">{blog.body}</p>

      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <strong>{c.createdBy?.fullName || 'You'}:</strong> {c.content}
          </li>
        ))}
      </ul>

      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      ) : (
        <p>Sign in to leave a comment.</p>
      )}
    </div>
  )
}
