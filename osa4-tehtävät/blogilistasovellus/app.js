const blog = require("./models/blog");
const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");
require("express-async-errors");
const User = require("./models/user");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

app.get("/api/blogs", async (request, response) => {
  const blogs = await blog.find({}).populate("user");
  response.json(blogs);
});

app.post("/api/blogs", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (request.body.likes === null || request.body.likes === undefined) {
    request.body.likes = 0;
  }
  if (
    request.body.title === null ||
    request.body.title === undefined ||
    request.body.url === null ||
    request.body.url === undefined
  ) {
    return response.status(400).json({ error: "bad request" });
  }
  /*const users = await User.find({});*/

  request.body.user = user.id;
  const newblog = new blog(request.body);

  newblog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.delete("/api/blogs/:id", async (request, response) => {
  await blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = app;
