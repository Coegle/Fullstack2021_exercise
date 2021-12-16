import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
        >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
