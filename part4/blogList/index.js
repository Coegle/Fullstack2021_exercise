const http = require('http')
const mongoose = require('mongoose')

const app = require('./app')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

const server = http.createServer(app)
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})