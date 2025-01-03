import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const max = anecdotes.length - 1
  const [votes, setVotes] = useState(Array(max + 1).fill(0))
  
  function upVote(to_change){
    let copy = [...votes]

    copy[to_change] = copy[to_change] + 1

    setVotes(copy)
  }

  function argmax(array){
    let max = 0
    
    for(var i = 0; i < array.length; i++){
      
      if (array[i] > array[max]) {
        max = i
      }
    }

    return max
  }
  

  return (
    <div>
      <Title name="Anecdote of the day"/>
      {anecdotes[selected]}
      <p> has {votes[selected]} votes</p>
      <p>
        <button onClick = {() => setSelected(Math.floor(Math.random() * (max + 1)))}> next anecdote </button>
        <button onClick = {() => upVote(selected)}> vote </button>
      </p>
      <Title name="Anecdote with most votes"/>
      {anecdotes[argmax(votes)]}
    </div>
  )
}

const Title = ({name}) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}

export default App