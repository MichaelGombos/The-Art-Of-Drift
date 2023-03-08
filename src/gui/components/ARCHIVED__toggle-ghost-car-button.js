import React from "react";

const ToggleGhostCarButton = ({newEnableGhost, setNewEnableGhost}) => {
  return (
    <button  
    onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
    className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "Disable ghost car" : "Enable ghost car"}</button>
  )
}

export default ToggleGhostCarButton;