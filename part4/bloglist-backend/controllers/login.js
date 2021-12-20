const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).send({ error: 'password or username is not correct' })
  }

  const jwtPayload = {
    id: user.id,
    username: user.username
  }
  const token = jwt.sign(jwtPayload, config.SECRET)
  res.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter