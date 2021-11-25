const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URL
const uniqueValidator = require('mongoose-unique-validator')
mongoose
  .connect(mongoUrl)
  .then(console.log('connected to MongoDB'))
  .catch(error => console.log(`failed: ${error}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)