const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user:
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // The id parameter of Mongoose objects is an object, not a string, deal with this
    returnedObject.id = returnedObject._id.toString()

    // Don't want to return unused things
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)