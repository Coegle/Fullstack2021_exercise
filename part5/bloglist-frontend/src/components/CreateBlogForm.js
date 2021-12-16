import React, { useState } from 'react'

const CreateBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('Tester')
  const [url, setUrl] = useState('https://www.baidu.com')

  const handleOnSubmit = event => {
    event.preventDefault()
    createNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleOnSubmit}>
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

export default CreateBlogForm