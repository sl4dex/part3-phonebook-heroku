require('dotenv').config()

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to mongodb')
mongoose.connect(url)
  .catch(error => console.log('error connecting to mongodb: ', error.message))

//SCHEMA
// defines structure (metadata) of the table/s
const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  num: { type: String, minlength: 8 },
})

// change default _id to id and remove __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

// MODEL
// a Mongoose model provides an interface to the database for making operations
// with the schema. An instance of a model is called a document
module.exports = mongoose.model('Person', personSchema)