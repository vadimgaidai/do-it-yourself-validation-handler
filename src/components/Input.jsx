import React from 'react'

const Input = props => {
  return (
    <label>
      <span style={{ marginBottom: '10px', display: 'block' }}>
        {props.label}
      </span>
      <input
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span style={{ marginTop: '10px', display: 'block', color: 'tomato' }}>
        {props.errorMessage}
      </span>
    </label>
  )
}

export default Input
