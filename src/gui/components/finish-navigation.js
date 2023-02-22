import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { maps } from '../../game/map-data.js';
import { getInSpectateMode,getReplayString,setEnableGhost,setMapData } from "../../game/game";
import { resetGame } from "../../game/main";

const racePB = (index) => {
  setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))
 }

const FinishNavigation = ({newBest,mapIndex}) => {
  const playerName = localStorage.getItem("playerName")
  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  const navigate = useNavigate();
  const [inviteCopied, setInviteCopied] = useState(false);
  const [replayCopied, setReplayCopied] = useState(false);

  return(
    <>
      <nav>
            {getInSpectateMode() ? 
            <button onClick={() => {
              resetGame(true);
              navigate("/hidden");
            }}>Watch Again</button>
          : 
          <button className = {inviteCopied ? "disabled" : ""}onClick={() => {
            copyToClipboard(`http://www.theartofdrift.com/invited?racer=${playerName}&map=${mapIndex}`).then(setInviteCopied(true));
          }}>{inviteCopied ? "Copied!" : "Copy Invite Link"}</button>}

          <button className = {replayCopied ? "disabled" : ""}onClick={() => {
            copyToClipboard(getReplayString()).then(setReplayCopied(true));
          }}>{inviteCopied ? "Copied!" : "Copy Replay String"}</button>
            <button onClick={() => {
              resetGame();
              navigate("/hidden")
            }}>Race Again</button>  
            {newBest && 
            <button onClick = {()=> {
              racePB(mapIndex,localStorage.getItem(`pbReplay${mapIndex}`));
              setEnableGhost(true);
              resetGame();
              navigate("/hidden");
              }}>Race New Best</button>
            }

            <button onClick={() => {
              navigate("/map-select");
            }}>Back to map select</button>
      </nav>
    </>
  )
}

export default FinishNavigation;