import React, {useState , useEffect} from "react";
import { useFetcher, useNavigate } from "react-router-dom";

import Button from "./button.js";
import { maps } from '../../game/map-data.js';
import { getInSpectateMode,getGameMapIndex,getReplayString,setEnableGhost,setMapData, getReplayObject } from "../../game/game";
import { pauseGame, resetGame, startGame,turnOffGame } from "../../game/main";
import { getCurrentAuthProfile, getCurrentAuthReplay, getCurrentAuthReplayTime } from "../helpers/databaseFacade.js";
import { auth } from "../helpers/firebase.js";
import { colorGhostCar, drawGhostVehicle, drawPlayerVehicle } from "../../game/graphics.js";


const FinishNavigation = ({newBest, mapIndex,bestReplayObject}) => {

  const navigate = useNavigate();
  const [inviteCopied, setInviteCopied] = useState(false);
  const [replayCopied, setReplayCopied] = useState(false);

  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  useEffect(() => {

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

  const racePB = (index,replayObject) => {
    getCurrentAuthProfile().then(profileData => {
      setMapData(maps[index],replayObject.replay)
      setEnableGhost(true);
      console.log("race pb" , replayObject)
      colorGhostCar("personalBest")
      drawGhostVehicle(replayObject.playerVehicle)
      drawPlayerVehicle(profileData.vehicleID)
      resetGame();
      navigate("/hidden");
    })
   }

   

  return(
      <nav className="vertical-navigation-menu col-6 align-center gap-md">
            <Button 
            style="primary"
            
            clickHandler={() => {

              resetGame();
              navigate("/hidden")
            }}>Race Again</Button>  
            {getInSpectateMode() ? 
            <Button clickHandler={() => {
              resetGame(true);
              navigate("/hidden");
            }}>Watch Again</Button>
          : 
          <Button style={inviteCopied ? "disabled" : "light"} className = {inviteCopied ? "disabled" : ""}clickHandler={() => {
            copyToClipboard(`http://www.theartofdrift.com/invited?racer=${auth.currentUser.uid}&map=${mapIndex}`).then(setAndResetInviteCopied());
          }}>{inviteCopied ? "Copied!" : "Copy Invite Link"}</Button>}

          <Button className = {replayCopied ? "disabled" : ""}clickHandler={() => {
            copyToClipboard(packageReplay(getReplayObject())).then(setReplayCopied(true)).then(setAndResetReplayCopied());
          }}>{replayCopied ? "Copied!" : "Copy Replay Object"}</Button>

            {newBest ? 
            <Button clickHandler = {()=> {
              racePB(mapIndex,bestReplayObject);
              }}>Race New Best</Button> :  <Button clickHandler = {()=> {
                racePB(mapIndex,bestReplayObject);
                }}>Race Best</Button> 
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