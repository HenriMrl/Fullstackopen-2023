import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({
  blogFormRef,
  createBlog
}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    if(blogFormRef) {
      blogFormRef.current.toggleVisibility()
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id='title' type='text' value={newTitle} onChange={handleTitleChange} placeholder='write blog title here' />
        </div>
        <div>
          Author:
          <input id='author' type='text' value={newAuthor} onChange={handleAuthorChange} placeholder='write blog author here' />
        </div>
        <div>
          url:
          <input id='url' type='text' value={newUrl} onChange={handleUrlChange} placeholder='write blog url here' />
        </div>
        <button id='Create' type='submit'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm