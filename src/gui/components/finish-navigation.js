import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Button from "./button.js";
import { maps } from '../../game/map-data.js';
import { getInSpectateMode,getGameMapIndex,getReplayString,setEnableGhost,setMapData } from "../../game/game";
import { pauseGame, resetGame, startGame,turnOffGame } from "../../game/main";
import { getCurrentAuthReplay, getCurrentAuthReplayTime } from "../helpers/databaseFacade.js";
import { auth } from "../helpers/firebase.js";

const racePB = (index,inputs) => {
  setMapData(maps[index],JSON.parse(inputs))
 }

const FinishNavigation = ({newBest,mapIndex}) => {

  const navigate = useNavigate();
  const [inviteCopied, setInviteCopied] = useState(false);
  const [replayCopied, setReplayCopied] = useState(false);
  const [bestReplayObject , setBestReplayObject] = useState({
    playerInputs:[],
    playerName:"placeholder"
  });

  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  
  getCurrentAuthReplay(mapIndex).then( obj => {
    setBestReplayObject(obj)
  })

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
            copyToClipboard(`http://www.theartofdrift.com/invited?racer=${auth.currentUser.uid}&map=${mapIndex}`).then(setAndResetInviteCopied());
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
              racePB(mapIndex,bestReplayObject.playerInputs);
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
              navigate("/campaign");
              turnOffGame();
            }}>Back to map select</Button>
      </nav>
  )
}

export default FinishNavigation;