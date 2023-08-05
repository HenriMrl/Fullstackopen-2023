const Blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const oneBlogLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes;
};

const favoriteBlog = (blogs) => {
  let maxLikes = -1;
  let blogWithMaxLikes = null;

  for (const blog of blogs) {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      blogWithMaxLikes = blog;
    }
  }
  return blogWithMaxLikes;
};

module.exports = {
  totalLikes,
  oneBlogLikes,
  favoriteBlog,
  blogsInDb,
};
