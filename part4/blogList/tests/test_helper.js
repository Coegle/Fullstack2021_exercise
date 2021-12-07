const Blog = require('../models/blog')
const User = require('../models/user')

const getAllBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(it => it.toJSON())
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(it => it.toJSON())
}

module.exports = {
  getAllBlogs,
  getAllUsers
}