const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
// very important so express can use json parser for POST
app.use(express.json())
// allows backend in port 3001 to communicate with frontend in port 3000
app.use(cors())
// after every GET request, express will verify if build has the requested file
app.use(express.static('build'))

// modelo de Person mongodb
const Person = require('./models/person')

// modulo (archivo) con las operaciones crud de mongodb
const personCrud = require('./services/personCRUD')


// middleware that logs rquest and response info
app.use(morgan(':method :url :status :http-version :response-time'))


app.get('/', (request, response) => {
  // we use .send because its a string
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

// using express two dot notation, :id will be an arbitrary string, accesed by request.params.id
app.get('/api/persons/:id', (request, response) => {
  personCrud.getPersonById(Person, request, response)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(elem => elem.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  personCrud.addPerson(Person, request, response)
})

app.get('/api/info', (request, response) => {
  var currentTime = new Date();
  response.send(`<p>phonebook has info for ${persons.length} people</p> ${currentTime}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})