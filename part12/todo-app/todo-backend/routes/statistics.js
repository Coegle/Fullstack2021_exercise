const express = require('express')
const redis = require('../redis')
const router = express.Router()

router.get('/', async (req, res) => {
  const added_todos = await redis.getAsync('added_todos')
  res.send({ added_todos: added_todos == null ? 0 : parseInt(added_todos) })
})

module.exports = router