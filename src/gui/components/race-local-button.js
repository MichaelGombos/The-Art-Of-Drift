import React from "react";

import {startGame} from "../../game/main.js"
import {setMapData,setEnableGhost, setSpectateMode, setGameMapIndex} from "../../game/game.js"
import { maps } from "../../game/map-data.js";
import { replays } from "../../game/replay.js"
import { colorGhostCar, colorPlayerCar, nameGhost } from '../../game/graphics.js';
import { useNavigate } from "react-router-dom";
import Button from "./button.js";

const ghostNames = {
  easy : "Bronze",
  normal : "Silver",
  hard : "Gold",
  author : "Author",
  personalBest: "best time"
}

const setMap = (index,difficulty) => { //sets map returns ghost name
  if(difficulty == "personalBest"){
    setGameMapIndex(index);
    setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))
    return ("personal best");
  }
  else{ 
    setGameMapIndex(index);
    setMapData(maps[index],replays[index][difficulty]["replay"])
    return (ghostNames[difficulty] + " medal");
  }
}





const RaceLocalButton = ({mapIndex,difficulty,isGhostEnabled, children,style}) => {
  const navigate = useNavigate();

  const handleRaceLocal = (index,difficulty,isGhostEnabled) =>{
  
    console.log("starting", performance.now());
    let ghostName = setMap(index,difficulty);
    
    setEnableGhost(isGhostEnabled);
    setSpectateMode(false)
    startGame();
    nameGhost(ghostName)
    colorGhostCar(difficulty);
    colorPlayerCar()
    navigate("/countdown");
    console.log("finish", performance.now());
  }

  return (
    <Button className="play-button f-h3" style={style} clickHandler = {()=> {
      handleRaceLocal(mapIndex,difficulty,isGhostEnabled,navigate);
      }}>{children}</Button>
  )
}

export default RaceLocalButton;