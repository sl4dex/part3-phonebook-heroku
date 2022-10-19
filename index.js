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

// mongoose model Person
const Person = require('./models/person')

// modulo (archivo) con las operaciones crud de mongodb
const personCrud = require('./services/personCRUD')


// middleware that logs rquest and response info
app.use(morgan(':method :url :status :http-version :response-time'))


app.get('/', (request, response) => {
  // we use .send because its a string
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {
  var currentTime = new Date()
  response.send(`<p>phonebook has info for ${Person.length} people</p> ${currentTime}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

// using express two dot notation, :id will be an arbitrary string, accesed by request.params.id
app.get('/api/persons/:id', (request, response, next) => {
  personCrud.getPersonById(Person, request, response, next)
})

app.post('/api/persons', (request, response, next) => {
  personCrud.addPerson(Person, request, response, next)
})

app.delete('/api/persons/:id', (request, response, next) => {
  personCrud.delPerson(Person, request, response, next)
})

app.put('/api/persons/:id', (request, response, next) => {
  personCrud.updatePerson(Person, request, response, next)
})

// error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // else, handle it with node's default error handler
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})