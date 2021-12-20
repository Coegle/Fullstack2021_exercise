require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV !== 'test'
  ? process.env.MONGODB_URI
  : process.env.TEST_MONGODB_URI

const SECRET = process.env.SECRET
const TEST_AUTH = process.env.TEST_AUTH
module.exports = { PORT, MONGODB_URI, SECRET, TEST_AUTH }