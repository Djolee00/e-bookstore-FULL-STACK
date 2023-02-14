import React from 'react'
import "../style/Button.css"


const Button = ({handle, btnName}) => {


  return (
    <button type="submit" className="btn btn-dark btn-sm" onClick={handle}>{btnName}</button>
  )
}

export default Button