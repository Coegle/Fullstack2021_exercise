const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.send(users)
})

usersRouter.post('/', async (req, res) => {
  const password = req.body.password
  const username = req.body.username


  if (!password || password.length < 3) {
    return res.status(400).send({ error: 'invalid password' })
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name: req.body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.send(savedUser)
})

module.exports = usersRouter