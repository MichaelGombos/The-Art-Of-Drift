import React from "react";

const ToggleStatsButton = ({setShowStats,showStats}) => {
  return (
    <button className={showStats ? "set" : ""} onClick={() =>setShowStats(!showStats)}>{showStats ? "Disable Full Stats HUD" : "Enable Full Stats HUD"}</button>
  )
}

export default ToggleStatsButton;