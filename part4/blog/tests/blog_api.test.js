const assert = require('node:assert')

const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')

const {initialBlogs} = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {      
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property is called id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blog_entry = response.body[0]
  assert(blog_entry.id)
  assert(!blog_entry._id)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)})

after(async () => {
  await mongoose.connection.close()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(authors.includes('Robert C. Martin'))
})

test('blog without likes gets default value 0', async () => {
  const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const added_blog = response.body.find(b => {
    return b.title === "Type wars"
  })

  assert.strictEqual(added_blog.likes, 0)
})

test('a blog without title cannot be added ', async () => {
  const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog without url cannot be added ', async () => {
  const newBlog = {
      title: "Type wars",
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      likes: 2,
      __v: 0
    }  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

describe('delete', () => {
  test('succeeds when given a correct id', async () => {
        const blogToDelete = initialBlogs[0]

        await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)

        const response = await api.get('/api/blogs')

        const ids = response.body.map(n => n.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(ids.length, initialBlogs.length - 1)
  })

  test('does not change the database when given a non-existent id', async () => {

        await api.delete(`/api/blogs/5a422ba71b54a676234d17fe`).expect(204)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)
  })
  
})

describe('put', () => {
  test('succeeds when given a correct id', async () => {
        let blogToChange = {...initialBlogs[0]}

        blogToChange.likes = initialBlogs[0].likes + 1

        const returned_blog = await api.put(`/api/blogs/${blogToChange._id}`)
          .send(blogToChange).expect(200)

        assert.strictEqual(returned_blog.body.likes, blogToChange.likes)

        const all_blogs = await api.get(`/api/blogs/`)

        assert.strictEqual(all_blogs.body.length, initialBlogs.length)

        const modified_blog = all_blogs.body.find(b => b.id === blogToChange._id)

        assert.strictEqual(modified_blog.likes, blogToChange.likes)
  })

  test('does not change the database when given a non-existent id', async () => {

        await api.put(`/api/blogs/5a422ba71b54a676234d17fe`).expect(404)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)
  })
  
})