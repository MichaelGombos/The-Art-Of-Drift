import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import Button from "./button.js";
import { maps } from '../../game/map-data.js';
import { getInSpectateMode,getGameMapIndex,getReplayString,setEnableGhost,setMapData } from "../../game/game";
import { pauseGame, resetGame, startGame,turnOffGame } from "../../game/main";

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

  const setAndResetInviteCopied = () => {
    setInviteCopied(true)
    setTimeout(() => {
      setInviteCopied(false)}
      , 3000) 
  }

  return(
      <nav className="col-6 align-center gap-md">
            {getInSpectateMode() ? 
            <Button clickHandler={() => {
              resetGame(true);
              navigate("/hidden");
            }}>Watch Again</Button>
          : 
          <Button style={inviteCopied ? "disabled" : "primary"} className = {inviteCopied ? "disabled" : ""}clickHandler={() => {
            copyToClipboard(`http://www.theartofdrift.com/invited?racer=${playerName}&map=${mapIndex}`).then(setAndResetInviteCopied());
          }}>{inviteCopied ? "Copied!" : "Copy Invite Link"}</Button>}

          {/* <Button className = {replayCopied ? "disabled" : ""}clickHandler={() => {
            copyToClipboard(getReplayString()).then(setReplayCopied(true));
          }}>{inviteCopied ? "Copied!" : "Copy Replay String"}</Button> */}
            <Button clickHandler={() => {
              resetGame();
              navigate("/hidden")
            }}>Race Again</Button>  
            {newBest && 
            <Button clickHandler = {()=> {
              racePB(mapIndex,localStorage.getItem(`pbReplay${mapIndex}`));
              setEnableGhost(true);
              resetGame();
              navigate("/hidden");
              }}>Race New Best</Button>
            }
          {
            getGameMapIndex() ?
            <Button clickHandler={() => {
              navigate(`/campaign/${getGameMapIndex()}`);
              turnOffGame();
            }}>Back to level screen</Button>
            : ""
          }
            <Button clickHandler={() => {
              navigate("/map-select");
              turnOffGame();
            }}>Back to map select</Button>
      </nav>
  )
}

export default FinishNavigation;