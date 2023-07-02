import React, {useState} from "react"

import Button from "./button"

const DebugMenu = ({setShowDebugMenu}) => {

  return (
    <div className="hidden-menu__debug-menu col-6" >
      
      <Button
      clickHandler={()=> {console.log("hi")}}
      >
        Example
      </Button>
      <Button
      clickHandler={()=> {setShowDebugMenu(false)}}
      >
        close
      </Button>
    </div>
  )
}

export default DebugMenu;