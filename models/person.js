require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log("connecting to mongodb");
mongoose.connect(url)
    .catch(error => console.log('error connecting to mongodb: ', error.message))

const personSchema = new mongoose.Schema({
    name: String,
    num: String,
})

// change default _id to id and remove __v
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)