
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Syntax: node mongo.js <password>')
  process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack2022.ch2jao9.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  num: String,
})

const Person = mongoose.model('person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p)
        })
        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        num: process.argv[4]
      })
      
      person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })    
}

