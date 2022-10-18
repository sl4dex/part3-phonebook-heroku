
const getPersonById = (people, request, response, next) => {
    people.findById(request.params.id)
        .then(p => {
            if (p)
                return response.json(p)
            else
                return response.status(404).end()
        })
        .catch(error => next(error)) // calls custom errorHandler() in index.js
}

const addPerson = (people, request, response) => {
    const per = request.body

    if (!per.name || !per.num) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new people({
        name: per.name,
        num: per.num
    })

    // we use .json beacause its json notation 
    person.save().then(savedp => response.json(savedp))
}

const delPerson = (people, request, response, next) => {
    people.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
}

const updatePerson = (people, request, response, next) => {
    const person = {
        name: request.body.name,
        num: request.body.num
    }
    people.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
}


module.exports = { getPersonById, addPerson, delPerson, updatePerson}