import React from 'react'
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const Header = (props) => (
    <>
    <h1>{props.course}</h1>
    </>
  )
  const Paragraph = (props) => (
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
  const Total = (props) => (
    <>
    <p>Number of exercises {props.number}</p>
    </>
  )
  const Content = () => (
    <>
    <Paragraph part={part1} />
    <Paragraph part={part2} />
    <Paragraph part={part3} />
    </>
  )

  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App