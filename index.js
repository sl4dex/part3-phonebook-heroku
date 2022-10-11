const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
//
// very important so express can use json parser for POST
app.use(express.json())

app.use(cors())


let persons = [
    {
        "name": "Salvador diaz",
        "num": "092 362 123",
        "id": 4
      },
      {
        "name": "Oriana Goro ",
        "num": "098333333",
        "id": 5
      },
      {
        "name": "Rosana Budes",
        "num": "123 4456 777",
        "id": 6
      }
]

// middleware that logs rquest and response info
app.use(morgan(':method :url :status :http-version :response-time '))

app.get('/', (request, response) => {
    // we use .send because its a string
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    // we use .json beacause its json notation 
    response.json(persons)
})

// using express two dot notation, :id will be an arbitrary string, accesed by request.params.id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(elem => elem.id === id) 
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(elem => elem.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  if (!person.name || !person.num)
    return response.status(400).json({
      error: 'no name and/or number' 
    })
  if (persons.filter(elem => elem.num === person.num).length > 0)
    return response.status(400).json({
      error: 'person with that num already exists'
    })
  person.id = Math.floor(Math.random() * 100000)
  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/info', (request, response) => {
    var currentTime = new Date();
    response.send(`<p>phonebook has info for ${persons.length} people</p> ${currentTime}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})