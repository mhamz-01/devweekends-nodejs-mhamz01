const BASE_URL = 'http://localhost:4000'

export async function getBlogs() {
  const res = await fetch(`${BASE_URL}/blog`, { credentials: 'include' })
  return res.json()
}

export async function getBlog(id) {
  const res = await fetch(`${BASE_URL}/blog/${id}`, { credentials: 'include' })
  return res.json()
}

export async function createBlog(formData) {
  const res = await fetch(`${BASE_URL}/blog/add-new`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  return res.json()
}

export async function addComment(blogId, content) {
  const res = await fetch(`${BASE_URL}/blog/comment/${blogId}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  return res.json()
}

export async function signup(fullName, email, password) {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
  })
  return res.json()
}

export async function signin(email, password) {
  const res = await fetch(`${BASE_URL}/user/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/user/logout`, { credentials: 'include' })
  return res.json()
}

export async function getCurrentUser() {
  const res = await fetch(`${BASE_URL}/user/me`, { credentials: 'include' })
  return res.json()
}
