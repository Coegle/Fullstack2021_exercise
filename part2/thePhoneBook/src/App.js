import React, { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons, filter}) => (
  <>
  {(filter === '' ? persons : persons.filter(it => it.name.toLowerCase().includes(filter.toLowerCase())))
    .map(it => <Person key={it.name} person={it} />)}
  </>
)
const Filter = ({onSetFilter}) => (
  <div>filter shown with <input onChange={onSetFilter} /></div>
)

const PersonForm = ({onSubmit, newName, onNewNameChange, newNumber, onNewNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={newName} onChange={onNewNameChange} /></div>
    <div>number: <input value={newNumber} onChange={onNewNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.map(it => it.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }
  const onNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const onSetFilter = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSetFilter={onSetFilter} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={onSubmit} newName={newName} onNewNameChange={onNewNameChange} newNumber={newNumber} onNewNumberChange={onNewNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App