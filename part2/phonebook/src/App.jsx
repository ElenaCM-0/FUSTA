import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const checkExists = (name) => {
    return persons.some((cur_element) => {
      return cur_element.name === name
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (checkExists(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter = {{value: newFilter, funct: setNewFilter}}/>
      <h2>Add a new</h2>
        <PersonForm handleSubmit = {handleSubmit} name = {{value: newName, funct: setNewName}} number = {{value: newNumber, funct: setNewNumber}}/>
      <h2>Numbers</h2>
        <ShowPersons persons = {persons} filter = {newFilter}/>
    </div>
  )
}

const Filter = ({filter}) => {
    return (
    <div>
      filter shown with: <input value = {filter.value} onChange={(event) => filter.funct(event.target.value.toLowerCase())}/>
    </div>)
}

const Person = ({person}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value = {props.name.value} onChange={(event) => props.name.funct(event.target.value)}/>
      </div>
      <div>
        number: <input value = {props.number.value} onChange={(event) => props.number.funct(event.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPersons = ({persons, filter}) => {
  return (
    <table>
      <tbody>
        {persons.filter((person) => {
          const inLowerCase = person.name.toLowerCase()
          return inLowerCase.includes(filter)
        })
        .map((person) => 
                          <Person key = {person.name} person={person}/>
              )
        }
      </tbody>
    </table>
  )
}

export default App