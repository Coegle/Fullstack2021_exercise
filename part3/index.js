require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('req-body', (req) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.get('/api/persons', (_req, res) => {
  Person
    .find({})
    .then(persons => {
      console.log(persons)
      res.send(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        console.log(person)
        res.json(person)
      } else {
        res.status(404).send({ error: 'person is not existed!' })
      }
    })
    .catch(error => next(error))
})

app.get('/info', (_res, req) => {
  Person.count({}).then( result => {
    req.send(`<p>Phonebook has info for ${result} people</p><p>${new Date()}</p>`)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person
    .save()
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  console.log(req.body)

  const person = {
    ...req.body
  }
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(result => res.json(result))
    .catch(error => next(error))
})

const errorHandler = (error, _req, res, next) => {
  if(error.name==='CastError'&&error.kind==='ObjectId') {
    res.status(400).json({ error: 'malformatted id' })
  }
  else if (error.name==='ValidationError') {
    res.status(400).send({ error: error.message })
  }
  else {
    res.status(400).send(error)
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})
