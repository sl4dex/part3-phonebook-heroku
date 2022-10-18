
const getPersonById = (people, request, response) => {
    people.findById(request.params.id)
        .then(p => {
            if (p)
                return response.json(p)
            else
                return response.status(404).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'maformatted id' })
        })
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

module.exports = { getPersonById, addPerson}