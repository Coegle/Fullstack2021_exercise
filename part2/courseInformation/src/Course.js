import React from "react";

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Header = ({ header }) => <h2>{header}</h2>

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Content = ({ content }) => {
    const parts = content.map((it) => <Part key={it.id} part={it} />)
    return (
        <>
            {parts}
        </>
    )
}

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, it) => sum + it.exercises, 0)
    return (
        <>
            <Header header={course.name} />
            <Content content={course.parts} />
            <Total total={total} />
        </>
    )
}
export default Course