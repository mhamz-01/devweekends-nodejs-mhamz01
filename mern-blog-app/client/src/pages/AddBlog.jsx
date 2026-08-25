import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../api'
import { useAuth } from '../context/AuthContext.jsx'

export default function AddBlog() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')

    try {
      const data = await createBlog(title, body)
      if (data.blog) {
        navigate(`/blog/${data.blog._id}`)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError(err.message || 'Could not reach the server')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) return <p>You must be signed in to write a blog.</p>

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h1>Write a New Blog</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your blog..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={10}
        required
      />
      <button type="submit" disabled={submitting}>{submitting ? 'Publishing...' : 'Publish'}</button>
    </form>
  )
}
