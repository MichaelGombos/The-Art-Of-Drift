import React from "react";

import {startGame} from "../../game/main.js"
import {setMapData,setEnableGhost, setSpectateMode, setGameMapIndex} from "../../game/game.js"
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

const setMap = async(index,difficulty) => { //sets map returns ghost name
  if(difficulty == "personalBest"){
    await getCurrentAuthReplay(index).then(replayObject => {
      setGameMapIndex(index);
      console.log(replayObject.replay);
      setMapData(maps[index],replayObject.replay)
      return ("personal best");
    })
  }
  else{ 
    setGameMapIndex(index);
    console.log(replays[index][difficulty]["replay"])
    setMapData(maps[index],replays[index][difficulty]["replay"])
    return (ghostNames[difficulty] + " medal");
  }
}





const RaceLocalButton = ({mapIndex,difficulty,isGhostEnabled, children,style}) => {
  const navigate = useNavigate();

  const handleRaceLocal = (index,difficulty,isGhostEnabled) =>{
  
    console.log("starting", performance.now());
    let ghostName = difficulty == "personalBest" ? "personal best" : (ghostNames[difficulty] + " medal");

    setMap(index,difficulty).then( name => {

      getCurrentAuthProfile().then(profileData => {
        setEnableGhost(isGhostEnabled);
        setSpectateMode(false)
        startGame();
        nameGhost(ghostName)
        colorGhostCar(difficulty);
        drawPlayerVehicle(profileData.vehicleID);
        drawGhostVehicle("campaign")
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