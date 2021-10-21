import React from 'react'
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => (
    <>
    <h1>{props.course}</h1>
    </>
  )
  const Paragraph = (props) => (
    <>
    <p>{props.part} {props.exercise}</p>
    </>
  )
  const Total = (props) => (
    <>
    <p>Number of exercises {props.number}</p>
    </>
  )
  const Content = () => (
    <>
    <Paragraph part={part1} exercise={exercises1} />
    <Paragraph part={part2} exercise={exercises2} />
    <Paragraph part={part3} exercise={exercises3} />
    </>
  )

  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App