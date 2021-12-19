import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
const blog = {
  title: 'testTitle',
  author: 'admin',
  url: 'https://www.baidu.com',
}
test('create a new blog can be done', () => {
  const mockHandler = jest.fn()
  const component = render(<CreateBlogForm createNewBlog={mockHandler} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, {
    target: { value: blog.title }
  })

  fireEvent.change(author, {
    target: { value: blog.author }
  })

  fireEvent.change(url, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
})