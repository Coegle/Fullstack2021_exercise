const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const config = require('../utils/config')
const helper = require('./test_helper')

const api = supertest(app)

describe('get all blogs', () => {
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    if (res.body.length !== 0) {
      res.body.forEach(it =>
        expect(it.id).toBeDefined()
      )
    }
  })
})

describe('add blog', () => {
  test('a blog can be added', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const newBlog = {
      title: 'How to create a react app',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs')
      .set('Authorization', config.TEST_AUTH)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd.map(it => it.title)).toContain(newBlog.title)
  })

  test('a blog\'s like is default to zero', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const newBlog = {
      title: 'This is a blog nobody likes',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
    const result = await api.post('/api/blogs')
      .set('Authorization', config.TEST_AUTH)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(0)
    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })

  test('a blog without tilte property is not added', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
    await api.post('/api/blogs')
      .set('Authorization', config.TEST_AUTH)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('a blog without url property is not added', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const newBlog = {
      title: 'This is a blog without url',
      author: 'Edsger W. Dijkstra'
    }
    await api.post('/api/blogs')
      .set('Authorization', config.TEST_AUTH)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('a blog without auth is not added', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const newBlog = {
      title: 'How to create a react app',
      author: 'Edsger W. Dijkstra',
      url: 'http'
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})