import React from 'react'
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
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
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
  const Content = (props) => (
    <>
    <Paragraph part={props.parts[0]} />
    <Paragraph part={props.parts[1]} />
    <Paragraph part={props.parts[2]} />
    </>
  )

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App