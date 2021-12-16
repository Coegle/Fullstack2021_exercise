import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const createBlogFormRef = useRef()

  useEffect(() => {
    getBlogs()
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
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
      notify(msg)
    }
  }
  const notify = msg => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('userInfo')
    setUser(null)
  }
  const addLikes = async id => {
    const oldBlog = blogs.find(it => it.id === id)
    oldBlog.likes += 1
    try {
      const updatedBlog = await blogService.update(oldBlog)
      const updatedBlogs = blogs.map(it => it.id === id ? updatedBlog : it)
      setBlogs(updatedBlogs)
    } catch (excep) {
      console.log(excep.response)
    }
  }
  const createNewBlog = async newBlog => {
    createBlogFormRef.current.toggleVisibility()
    try {
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
    } catch (excep) {
      const msg = { error: excep.response.data.error }
      notify(msg)
    }
    const msg = { info: `a new blog ${newBlog.title} by ${newBlog.author} added` }
    notify(msg)
  }

  const createBlogForm = () => {
    return (
      <Togglable
        buttonLabel={'create a blog'} ref={createBlogFormRef}>
        <CreateBlogForm
          createNewBlog={createNewBlog}
        />
      </Togglable>
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
          {blogs
            .sort((a, b) => { return b.likes - a.likes })
            .map(blog =>
              <Blog key={blog.id} blog={blog} addLikes={addLikes} updateBlogs={getBlogs} notify={notify}/>
            )}
        </div>
      }
    </div>
  )
}

export default App