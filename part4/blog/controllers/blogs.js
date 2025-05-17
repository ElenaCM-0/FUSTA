const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
  return response.json(blogs)
})

const middleware = require('../utils/middleware')

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

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
          likes: body.likes ? body.likes: 0,
          user: user._id
        })

  const saved_blog = await blog.save()

  user.blogs = user.blogs.concat(saved_blog._id)

  await user.save()
  
  return response.status(201).json(saved_blog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const userid = request.user.id

  const blog = await Blog.findById(request.params.id)

  if ( blog === null ) {
    return response.status(204).end()
  }

  if ( blog.user.toString() !== userid.toString() ) {
    return response.status(400).json({
      error: 'You can only delete your own posts'
    })
  }
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