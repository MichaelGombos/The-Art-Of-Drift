import React from "react"

const BackToListButton = ({setter}) => {
  return (
    <button onClick = {()=> {
      setter("list")
      }}>Back to map list</button>
  )
}

export default BackToListButton;