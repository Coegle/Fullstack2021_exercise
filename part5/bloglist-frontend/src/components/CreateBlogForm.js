import React, { useState } from 'react'

const CreateBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = event => {
    event.preventDefault()
    createNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <div >
        title:
        <input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button
        id='createBlogButton'
        type='submit'>
        create
      </button>
    </form>
  )
}

export default CreateBlogForm