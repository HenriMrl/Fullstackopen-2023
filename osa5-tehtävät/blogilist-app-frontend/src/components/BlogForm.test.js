import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('blogform test', async () => {
  const user = userEvent.setup()

  const createBlog = jest.fn();
  

  render(
    <BlogForm
      createBlog={createBlog}
    />
  );
  
  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'uusiblogi')
  await user.type(authorInput, 'henri')
  await user.type(urlInput, 'url')

  await user.click(createButton);

  expect(createBlog.mock.calls[0][0].title).toBe('uusiblogi')
  expect(createBlog.mock.calls[0][0].author).toBe('henri')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
  
  })