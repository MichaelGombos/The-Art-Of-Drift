import React from "react";

import {resetGame, startGame} from "../../game/main.js"
import {setMapData,setEnableGhost, setSpectateMode, setGameMapIndex, updateGhostCarEnabledList} from "../../game/game.js"
import { maps } from "../../game/map-data.js";
import { replays } from "../../game/replay.js"
import { colorGhostCar, colorPlayerCar, drawGhostVehicle, drawPlayerVehicle, nameGhost } from '../../game/graphics.js';
import { useNavigate } from "react-router-dom";
import Button from "./button.js";
import { getCurrentAuthProfile, getCurrentAuthReplay } from "../helpers/databaseFacade.js";

const ghostNames = {
  easy : "Bronze",
  normal : "Silver",
  hard : "Gold",
  author : "Author",
  personalBest: "best time"
}

const setMap = async(index,difficulty) => { //sets map 
  if(difficulty == "personalBest"){
    await getCurrentAuthReplay(index).then(replayObject => {
      setGameMapIndex(index);
      console.log(replayObject.replay);
      setMapData(maps[index],[replayObject.replay])// array of one
      return ("personal best");
    })
  }
  else{ 
    setGameMapIndex(index);
    console.log(replays[index][difficulty]["replay"])
    setMapData(maps[index],[replays[index][difficulty]["replay"]])
    return (ghostNames[difficulty] + " medal");
  }
}





const RaceLocalButton = ({mapIndex,difficulty,isGhostEnabled, children,style}) => {
  const navigate = useNavigate();

  const handleRaceLocal = (index,difficulty,isGhostEnabled) =>{
  
    console.log("starting", performance.now());
    let ghostName = difficulty == "personalBest" ? "personal best" : (ghostNames[difficulty] + " medal");

    updateGhostCarEnabledList(0, true)
    for(let i = 1; i < 5; i++){
      updateGhostCarEnabledList(i, false)
    }
    setMap(index,difficulty).then( () => {

      getCurrentAuthProfile().then(profileData => {
        setEnableGhost(isGhostEnabled);
        setSpectateMode(false)

        startGame();
        nameGhost(ghostName,0)
        colorGhostCar(difficulty,0);
        drawPlayerVehicle(profileData.vehicleID);
        drawGhostVehicle("campaign",0)
        //add a bot car for the local replays :)
        navigate("/countdown");
        console.log("finish", performance.now());
      })
      }
    )
  }

  return (
    <Button className="play-button f-h3" style={style} clickHandler = {()=> {
      handleRaceLocal(mapIndex,difficulty,isGhostEnabled,navigate);
      }}>{children}</Button>
  )
}

export default RaceLocalButton;