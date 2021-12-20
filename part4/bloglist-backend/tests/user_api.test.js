const supertest = require('supertest')


const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('add user', () => {
  test('of a normal data', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: 'Normal User',
      password: '123456'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd.map(it => it.username)).toContain(newUser.username)
  })

  test('of a user without username', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      password: '123456'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('of a user without password', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: 'Normal User'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('of a user with password shorter than 3 characters', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: 'Normal User',
      password: '12'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('of a user with password shorter than 3 characters', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: 'Normal User',
      password: '12'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('of a user with username shorter than 3 characters', async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: 'No',
      password: '123456'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('of a user with duplicated username', async () => {
    const res = await api
      .post('/api/users')
      .send({
        username: 'Normal User',
        password: '123456'
      })

    const usersAtStart = await helper.getAllUsers()
    const duplicatedUser = {
      username: res.body.username,
      password: '123456'
    }
    await api
      .post('/api/users')
      .send(duplicatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})