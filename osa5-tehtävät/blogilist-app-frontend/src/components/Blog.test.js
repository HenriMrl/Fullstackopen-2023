import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog';

test('renders title', () => {
  const blog = {
    title: 'moi',
  };

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('moi')
  expect(titleElement).toBeDefined()
});

test('renders the rest of the blog data by clicking views', async () => {
  const blog = {
    user: {id: 10},
    title: 'hoi',
    author: 'henri',
    likes: 999,
    url: 'http://testi',
  }
  const mockHandler = jest.fn()
  
  render(<Blog blog={blog} user={{id: 10}} toggleBlogDetails={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  
  const titleElement = screen.getByText('hoi')
  const authorElement = screen.getByText('henri')
  const likesElement = screen.getByText('999')
  const urlElement = screen.getByText('http://testi')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(urlElement).toBeDefined()
});



test("like called 2 times", async () => {
    const blog = {
      user: {id: 10},
      title: 'hoi',
      author: 'henri',
      likes: 0,
      url: 'http://testi',
    }
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
    
    render(<Blog blog={blog} user={{id: 10}} toggleBlogDetailsMock={mockHandler} addLikeMock={mockHandler2}  />)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler2.mock.calls).toHaveLength(2)
});
  

