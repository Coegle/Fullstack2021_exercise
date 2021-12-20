const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  return list.map(it => it.likes).reduce((sum, it) => sum + it, 0)
}

const favoriteBlog = (list) => {
  const favoriteBlog = list.reduce((pre, cur) => { return cur.likes > pre.likes ? cur : pre }, list[0])
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = list => {
  const res = {}
  _.chain(list)
    .countBy(it => it.author)
    .forOwn((val, key) => {
      if (val > (!res.blogs ? 0 : res.blogs)) {
        res.blogs = val
        res.author = key
      }
    })
    .value()
  return res
}

const mostLikes = list => {
  const res = {}
  const cnt = list.reduce((pre, cur) => {
    pre[cur.author]
      ? pre[cur.author] += cur.likes
      : pre[cur.author] = cur.likes
    return pre
  }, {})
  Object.keys(cnt).forEach(key => {
    if (cnt[key] > (res.likes ? res.likes : 0)) {
      res.author = key
      res.likes = cnt[key]
    }
  })
  return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}