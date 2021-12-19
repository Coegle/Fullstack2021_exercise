import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
const blog = {
  title: 'testTitle',
  author: 'admin',
  url: 'https://www.baidu.com',
  likes: 1000
}

describe('test blog component', () => {
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('blogHead is default displayed', () => {
    const blogHead = component.container.querySelector('.blogHead')
    const blogDetail = component.container.querySelector('.blogDetail')

    expect(blogHead).not.toHaveStyle('display: none')
    expect(blogHead).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(blogDetail).toBeNull()
  })
  test('click to show blog detail', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const blogHead = component.container.querySelector('.blogHead')
    const blogDetail = component.container.querySelector('.blogDetail')
    expect(blogHead).toBeNull
    expect(blogDetail.querySelector('.url')).toHaveTextContent(blog.url)
    expect(blogDetail.querySelector('.likes')).toHaveTextContent(blog.likes)
  })
})
test('like button can be clicked', () => {
  const handleLikes = jest.fn()
  const component = render(<Blog blog={blog} addLikes={handleLikes} />)

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLikes.mock.calls).toHaveLength(2)
})
