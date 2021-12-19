import React, { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, updateBlogs, notify }) => {
  const [isDetailed, setIsDetailed] = useState(false)
  const toggleDetailed = () => setIsDetailed(!isDetailed)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const onClickAddLikes = () => {
    addLikes(blog.id)
  }
  const onClickRemoveBlog = async () => {
    if (window.confirm(`Remove blog: ${blog.title} ?`)) {
      try {
        await BlogService.remove(blog.id)
      } catch (excep) {
        console.log(excep)
        const msg = { error: excep.response.status }
        notify(msg)
      }
      updateBlogs()
    }
  }
  const blogDetail = () => {
    return (
      <div style={blogStyle} className='blogDetail'>
        <div className='title'>
          {blog.title}
          <button onClick={toggleDetailed}>hide</button>
        </div>
        <div className='url'>
          {blog.url}
        </div>
        <div className='likes'>
          likes:{blog.likes}
          <button onClick={onClickAddLikes}>like</button>
        </div>
        <div className='author'>
          {blog.author}
        </div>
        <button onClick={onClickRemoveBlog}>Remove</button>
      </div>
    )
  }

  const blogHead = () => {
    return (
      <div className='blogHead'>
        {blog.title} {blog.author}
        <button onClick={toggleDetailed}>view</button>
      </div>
    )
  }
  return (
    <div>
      {
        isDetailed
          ? blogDetail()
          : blogHead()
      }
    </div>
  )
}

Blog.prototypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default Blog