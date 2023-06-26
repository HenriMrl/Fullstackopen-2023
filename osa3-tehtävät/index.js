const express = require("express");
const app = express();
var morgan = require("morgan");

const cors = require('cors')

app.use(cors())

app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body '));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Dan Abramov",
    number: "040-345343",
  },
  {
    id: 3,
    name: "Ada Lovelace",
    number: "040-345343",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const currentTime = new Date().toLocaleString();
  response.send(
    "phonebook has info for " + persons.length + " persons<br>" + currentTime
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person.number);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const minId = 1000000000000;
  const maxId = 9999999999999;
  min = Math.ceil(minId);
  max = Math.floor(maxId);
  return Math.floor(Math.random() * (maxId - minId) + minId);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  notes = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
