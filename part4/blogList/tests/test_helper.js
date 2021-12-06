const Blog = require('../models/blog')

const getAllBlog = async () => {
  const blogs = await Blog.find({})
  return blogs.map(it => it.toJSON())
}

module.exports = {
  getAllBlog
}