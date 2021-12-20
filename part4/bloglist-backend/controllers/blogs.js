const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).send(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
  res.send(result)
})


blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const toBeDeletedBlogId = req.params.id
  const blog = await Blog.findById(toBeDeletedBlogId)
  const user = req.user
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(toBeDeletedBlogId)
    user.blogs = user.blogs.filter(it => it._id.toString() !== toBeDeletedBlogId)
    await user.save()
    res.status(204).end()
  }
  else {
    res.status(401).end()
  }
})

module.exports = blogsRouter