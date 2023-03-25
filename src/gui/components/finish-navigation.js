import React, {useState , useEffect} from "react";
import { useFetcher, useNavigate } from "react-router-dom";

import Button from "./button.js";
import { maps } from '../../game/map-data.js';
import { getInSpectateMode,getGameMapIndex,getReplayString,setEnableGhost,setMapData, getReplayObject } from "../../game/game";
import { pauseGame, resetGame, startGame,turnOffGame } from "../../game/main";
import { getCurrentAuthReplay, getCurrentAuthReplayTime } from "../helpers/databaseFacade.js";
import { auth } from "../helpers/firebase.js";

const racePB = (index,replay) => {
  setMapData(maps[index],replay)
 }

const FinishNavigation = ({newBest,mapIndex}) => {

  const navigate = useNavigate();
  const [inviteCopied, setInviteCopied] = useState(false);
  const [replayCopied, setReplayCopied] = useState(false);
  const [bestReplayObject , setBestReplayObject] = useState({
    inputs:[],
    stats:[],
    playerName:"placeholder"
  });

  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  useEffect(() => {
    getCurrentAuthReplay(mapIndex).then( obj => {
      setBestReplayObject(obj)
    })
  } , [])


  const setAndResetInviteCopied = () => {
    setInviteCopied(true)
    setTimeout(() => {
      setInviteCopied(false)}
      , 3000) 
  }

  const setAndResetReplayCopied = () => {
    setReplayCopied(true)
    setTimeout(() => {
      setReplayCopied(false)}
      , 3000) 
  }

  const packageReplay = (information) => {
    return "export default \n\n" + JSON.stringify({
      inputs: JSON.stringify(information.inputs),
      stats: JSON.stringify(information.stats)
    })
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

          <Button className = {replayCopied ? "disabled" : ""}clickHandler={() => {
            copyToClipboard(packageReplay(getReplayObject())).then(setReplayCopied(true)).then(setAndResetReplayCopied());
          }}>{replayCopied ? "Copied!" : "Copy Replay Object"}</Button>
            <Button clickHandler={() => {
              resetGame();
              navigate("/hidden")
            }}>Race Again</Button>  
            {newBest && 
            <Button clickHandler = {()=> {
              racePB(mapIndex,bestReplayObject.replay);
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