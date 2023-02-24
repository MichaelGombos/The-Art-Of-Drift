import React from "react";

import {resetGame} from "../../game/main.js"
import {setMapData,setEnableGhost, setSpectateMode} from "../../game/game.js"
import { maps } from "../../game/map-data.js";
import { replays } from "../../game/replay.js"
import { colorGhostCar, colorPlayerCar, nameGhost } from '../../game/graphics.js';
import { useNavigate } from "react-router-dom";

const ghostNames = {
  easy : "Bronze",
  normal : "Silver",
  hard : "Gold",
  author : "Author",
  personalBest: "best time"
}

const setMap = (index,difficulty) => { //sets map returns ghost name
  if(difficulty == "personalBest"){
    setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))

    return ("personal best");
  }
  else{ 
    setMapData(maps[index],replays[index][difficulty]["replay"])
    return (ghostNames[difficulty] + " medal");
  }
}


const handleRaceLocal = (index,difficulty,isGhostEnabled, navigate) =>{
  console.log("starting", performance.now());
  let ghostName = setMap(index,difficulty);
  setEnableGhost(isGhostEnabled);
  setSpectateMode(false)
  resetGame();
  nameGhost(ghostName)
  colorGhostCar(difficulty);
  colorPlayerCar()
  navigate("/hidden");
  console.log("finish", performance.now());
}

const RaceLocalButton = ({mapIndex,difficulty,isGhostEnabled}) => {
  const navigate = useNavigate();
  return (
    <button className="play-button f-h3" onClick = {()=> {
      handleRaceLocal(mapIndex,difficulty,isGhostEnabled,navigate);
      }}>P L A Y</button>
  )
}

export default RaceLocalButton;