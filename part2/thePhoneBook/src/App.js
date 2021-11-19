import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Person = ({person, onClick}) => (
  <p>
    {person.name} {person.number}
    <button onClick={()=>{onClick(person)}}>delete</button>
  </p>
)

const Persons = ({persons, filter, onClick}) => (
  <>
  {(filter === '' ? persons : persons.filter(it => it.name.toLowerCase().includes(filter.toLowerCase())))
    .map(it => <Person key={it.name} person={it} onClick={onClick} />)}
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
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.map(it => it.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = {
          name: newName,
          number: newNumber
        }
        const id = persons.find(it => it.name === newName).id
        personsService
          .update(id, updatedPerson)
          .then( data =>
            setPersons(persons.map(it => it.id === id ? data : it))
          )
      }
      return
    }
    const newPerson = {name: newName, number: newNumber}
    personsService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
    })
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
  const onClickDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      personsService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(it => it.id !== person.id))
      })
    }
  }
  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSetFilter={onSetFilter} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={onSubmit} newName={newName} onNewNameChange={onNewNameChange} newNumber={newNumber} onNewNumberChange={onNewNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} onClick={onClickDelete} />
    </div>
  )
}

export default App