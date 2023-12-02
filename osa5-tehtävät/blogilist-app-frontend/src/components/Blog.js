import React, { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user, deleteBlog, toggleBlogDetailsMock, addLikeMock}) => {
  const [updatedBlog, setUpdatedBlog] = useState(blog)
  const [blogVisible, setVisible] = useState(false)
  
  const addLike = async (blog) => {

    if(addLikeMock) {
      addLikeMock()
      return
    }
    const updatedBlogData = {
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    const theUpdatedBlog = await blogs.update(blog.id, updatedBlogData)
    setUpdatedBlog(theUpdatedBlog);
  }

  const toggleBlogDetails = () => {
    if(toggleBlogDetailsMock){
      toggleBlogDetailsMock();
    }
    setVisible(!blogVisible);
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <li className='blog '>
      <div style={blogStyle}>
        <span>{updatedBlog.title}</span>
        <button id='view' onClick={toggleBlogDetails}>
          {blogVisible ? 'hide' : 'view'}
        </button>
        {blogVisible && (
          <div>
            <div>{updatedBlog.url}</div>
            <div>
              likes <span>{updatedBlog.likes}</span>
              <button id='like' onClick={() => addLike(updatedBlog)}>like</button>
            </div>
            <span>{updatedBlog.author}</span>
            <br />
            {blog.user.id === user.id && (
              <button id='delete' onClick={() => deleteBlog(updatedBlog)}>delete</button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default Blog
