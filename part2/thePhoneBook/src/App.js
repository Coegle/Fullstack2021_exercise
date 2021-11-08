import React, { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>

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
  
  const filteredList = (filter === '' ? 
                        persons : 
                        persons.filter(it => it.name.toLowerCase().includes(filter.toLowerCase())))
                        .map(it => <Person key={it.name} person={it} />)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={onSetFilter} /></div>
      <h2>Add a new</h2>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={onNewNameChange} /></div>
        <div>number: <input value={newNumber} onChange={onNewNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredList}
    </div>
  )
}

export default App