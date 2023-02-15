import React from "react";

const ToggleGhostButton = ({setter, currentGhostSetting}) => {
  return (<button  
            onClick={(e) => {setter(!currentGhostSetting)}} 
            className={currentGhostSetting ? "set" : "none"}>{currentGhostSetting ? "disable ghost car" : "enable ghost car"}
         </button>
        )
}

export default ToggleGhostButton;