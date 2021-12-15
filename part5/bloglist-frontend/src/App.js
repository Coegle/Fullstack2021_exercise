import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('Tester')
  const [url, setUrl] = useState('https://www.baidu.com')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userInLocal = window.localStorage.getItem('userInfo')
    if (userInLocal) {
      const user = JSON.parse(userInLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('userInfo', JSON.stringify(user))
      blogService.setToken(user.token)
    }
    catch (excep) {
      const msg = { error: excep.response.data.error }
      notification(msg)
    }
  }
  const notification = msg => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('userInfo')
    setUser(null)
  }

  const handleCreateNewBlog = async event => {
    event.preventDefault()
    try {
      const res = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(res))
      const msg = { info: `a new blog ${title} by ${author} added` }
      notification(msg)
    } catch (excep) {
      const msg = { error: excep.response.data.error }
      notification(msg)
    }
  }

  const createBlogForm = () => {
    return (
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              type='text'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              type='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification messageObj={message} />
      {user === null
        ? loginForm()
        : <div>
          <h2>blogs</h2>
          <p>{user.username} logged in
            <button
              onClick={handleLogout}>
              logout
            </button>
          </p>
          {createBlogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App