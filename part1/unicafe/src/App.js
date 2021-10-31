import React, { useState } from 'react'

const Title = ({caption}) => (
  <h2>{caption}</h2>
)

const Button = ({caption, onClick}) => (
  <button onClick={onClick}>{caption}</button>
)

const Statistic = ({caption, num}) => (
  <div>{caption} {num}</div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  return (
    <div>
      <Title caption='give feedback' />
      <Button caption='good' onClick={() => {setGood(good + 1)}}/>
      <Button caption='neutral' onClick={() => {setNeutral(neutral + 1)}}/>
      <Button caption='bad' onClick={() => {setBad(bad + 1)}}/>
      <Title caption='statistics' />
      <Statistic caption='good' num={good} />
      <Statistic caption='neutral' num={neutral} />
      <Statistic caption='bad' num={bad} />
      <Statistic caption='all' num={all}/>
      <Statistic caption='average' num={(good-bad)/all}/>
      <Statistic caption='positive' num={good/all*100+'%'}/>
    </div>
  )
}

export default App