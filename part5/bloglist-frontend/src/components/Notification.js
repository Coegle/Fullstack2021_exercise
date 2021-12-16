import React from 'react'

const Notification = ({ messageObj }) => {
  if (messageObj === null) {
    return null
  }
  const style = 'error' in messageObj
    ? {
      'color': 'red',
    }
    : {
      'color': 'green',
    }

  style['borderStyle'] = 'solid'
  return (
    <div style={style}>{Object.values(messageObj)[0]}</div>
  )
}

export default Notification