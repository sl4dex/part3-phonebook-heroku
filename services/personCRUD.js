
const getPersonById = (Person, request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if (p)
        return response.json(p)
      else
        return response.status(404).end()
    })
    .catch(error => next(error)) // calls custom errorHandler() in index.js
}

const addPerson = (Person, request, response, next) => {
  const per = request.body

  if (!per.name || !per.num) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: per.name,
    num: per.num
  })

  // .save() is an asynchronous function, so you can use for example a .then()
  // we use .json beacause its json notation
  person.save()
    .then(savedp => response.json(savedp.toJSON()))
    .catch(error => next(error))
}

const delPerson = (Person, request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
}

const updatePerson = (Person, request, response, next) => {
  const person = {
    name: request.body.name,
    num: request.body.num
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
}


module.exports = { getPersonById, addPerson, delPerson, updatePerson }