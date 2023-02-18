import React from "react"

import { getInSpectateMode } from "../../game/game"

const FinishHeader = ({spectateTime,playerTime,newBest,mapIndex}) => {

  return (
    <>
      {getInSpectateMode() ?  <h1 className="f-p1">Replay Over</h1> : <h1 className="f-h1">F I N I S H</h1>}
       
       <div>
         <p>{getInSpectateMode() ? `REPLAY TIME: ${spectateTime}` : `YOUR TIME: ${playerTime} `}<span className="best-time">{newBest ? "NEW BEST" : null}</span></p>
         <p>Your best: {localStorage.getItem(`pb${mapIndex}`)}</p>
       </div>
    </>
  )
}

export default FinishHeader;