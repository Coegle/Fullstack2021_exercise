const mongoose = require('mongoose')
const pass = process.argv[2]
const url = `mongodb+srv://fullstack:${pass}@cluster0.0abtm.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose
  .connect(url)
  .then(console.log('connected to MongoDB'))
  .catch(error => console.log(`failed: ${error}`))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person
    .save()
    .then(savedPerson => {
      console.log(`saved: ${(savedPerson)}`)
      mongoose.connection.close()
    })
    .catch(error => console.log(error))
}
else {
  Person.find({}).then(people => {
    console.log('phonebook:')
    people.forEach(it => {
      console.log(`${it.name} ${it.number}`)
    })
    mongoose.connection.close()
  })
}
