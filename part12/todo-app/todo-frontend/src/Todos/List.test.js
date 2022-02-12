import TodoList from './List'
import { render } from '@testing-library/react'

test('render a todo view', () => {
  const todos = [
    { text: "todo 1", done: false }
  ]
  const toDoList = render(<TodoList todos={todos} />)
  expect(toDoList.container).toHaveTextContent('todo 1')
})