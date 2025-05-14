const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, cur_element) => {
        return total + cur_element.likes
    },  0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length == 0) {
      return []
    }
    
    return blogs.reduce((cur_max, cur_element) => {
        if (cur_element.likes > cur_max.likes) {
          return cur_element
        }
        return cur_max
    },  blogs[0])
}

module.exports = {
  dummy, totalLikes, favouriteBlog
}