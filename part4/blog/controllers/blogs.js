const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes ? body.likes: 0
        })

  const saved_blog = await blog.save()
  
  return response.status(201).json(saved_blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)

  if (!blog)
    return response.status(404).end()

  blog.title = request.body.title ? request.body.title : blog.title
  blog.author = request.body.author ? request.body.author : blog.author
  blog.url = request.body.url ? request.body.url : blog.url
  blog.likes = request.body.likes ? request.body.likes : blog.likes

  newBlog = await blog.save()

  return response.json(newBlog)
}
)

module.exports = blogsRouter