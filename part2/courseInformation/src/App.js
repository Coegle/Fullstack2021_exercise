import React from 'react'
const Part = ({part}) => {
  return(
  <p>{part.name} {part.exercises}</p>
  )
}

const Header = ({header}) => <h2>{header}</h2>

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Content = ({content}) => {
  const parts = content.map((it) =><Part key={it.id} part={it} /> )
  return (
    <>
    {parts}
    </>
    )
}

const Course = ({course}) => {
  const total = course.parts.reduce((sum, it)=>sum + it.exercises, 0)
  return (
    <>
    <Header header={course.name} />
    <Content content={course.parts}/>
    <Total total={total}/>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const coursesEle = courses.map((it) => <Course key={it.id} course={it}/>)
  return (
    <div>
    <h1>Web development curriculum</h1>
    {coursesEle}
    </div>
  )
}

export default App