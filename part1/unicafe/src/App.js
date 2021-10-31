import React, { useState } from 'react'

const Title = ({caption}) => (
  <h2>{caption}</h2>
)

const Button = ({caption, onClick}) => (
  <button onClick={onClick}>{caption}</button>
)

const Statistics = ({statistics}) => {
  return (
  <>
  <Statistic caption={statistics[0].caption} num={statistics[0].num} />
  <Statistic caption={statistics[1].caption} num={statistics[1].num} />
  <Statistic caption={statistics[2].caption} num={statistics[2].num} />
  <Statistic caption={statistics[3].caption} num={statistics[3].num} />
  <Statistic caption={statistics[4].caption} num={statistics[4].num} />
  <Statistic caption={statistics[5].caption} num={statistics[5].num} />
  </>
)}

const Statistic = ({caption, num}) => (
  <div>{caption} {num}</div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const statistics = [
    {
      caption: 'good',
      num: good
    },
    {
      caption: 'neutral',
      num: neutral
    },
    {
      caption: 'bad',
      num: bad
    },
    {
      caption: 'all',
      num: all
    },
    {
      caption: 'average',
      num: (good-bad)/all
    },
    {
      caption: 'positive',
      num: good/all*100+'%'
    }
  ]
  return (
    <div>
      <Title caption='give feedback' />
      <Button caption='good' onClick={() => {setGood(good + 1)}}/>
      <Button caption='neutral' onClick={() => {setNeutral(neutral + 1)}}/>
      <Button caption='bad' onClick={() => {setBad(bad + 1)}}/>
      <Title caption='statistics' />
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App