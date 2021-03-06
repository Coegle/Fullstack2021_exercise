import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setNewVote] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0)
  const getNextAnecdote = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    while (randomNum == selected) {
      randomNum = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomNum)
  }
  const vote = () => {
    const newVotes = [...allVotes]
    newVotes[selected] += 1
    if (newVotes[selected] > newVotes[mostVoted]) setMostVoted(selected)
    setNewVote(newVotes)
  }

  const maxIdx = allVotes.indexOf(Math.max(...allVotes))
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {allVotes[selected]} votes </p>
      <button onClick= { vote }>vote</button>
      <button onClick={ getNextAnecdote } >next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxIdx]}</p>
      <p>has {allVotes[mostVoted]} votes</p>
    </div>
  )
}

export default App