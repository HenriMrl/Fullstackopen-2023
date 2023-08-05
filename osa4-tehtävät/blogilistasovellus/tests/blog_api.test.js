const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_helper");
const Blog = require("../models/blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Id is returned as id", async () => {
  response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("post blogs", async () => {
  const newBlog = {
    title: "jeps",
    author: "terve",
    url: "jepulisjoo",
    likes: 5,
  };

  const currentResponse = await api.get("/api/blogs");
  const currentLength = currentResponse.body.length;

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.statusCode).toBe(201);

  const updatedResponse = await api.get("/api/blogs");
  const updatedLength = updatedResponse.body.length;

  expect(updatedLength).toEqual(currentLength + 1);
});

test("no like value", async () => {
  const newBlog = {
    title: "jeps",
    author: "terve",
    url: "jepulisjoo",
  };

  const response = await api.post("/api/blogs").send(newBlog);
  expect(response.body.likes).toEqual(0);
});

test("no title or no url", async () => {
  const newBlog = {
    author: "terve",
    likes: 0,
  };

  response = await api.post("/api/blogs").send(newBlog);
  expect(response.statusCode).toBe(400);
});


  test('delete blog, succeeds with status code 204 if id is valid', async () => {
  
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })


afterAll(async () => {
  await mongoose.connection.close();
});
