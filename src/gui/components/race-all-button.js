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

const setMap = async(index) => { //sets map 
  await getCurrentAuthReplay(index).then(replayObject => {
    setGameMapIndex(index);
    setMapData(maps[index],[
      replayObject.replay , 
      replays[index]["easy"]["replay"],
      replays[index]["normal"]["replay"],
      replays[index]["hard"]["replay"],
      replays[index]["author"]["replay"]
    ] )
  })
  
}





const RaceAllLocalButton = ({mapIndex,difficulty,isGhostEnabled, children,style,difficultyList}) => {
  const navigate = useNavigate();

  const handleRaceLocal = (index,difficulty,isGhostEnabled) =>{
  
    console.log("starting", performance.now());

    const ghostNames = [
      "personal best",
      "bronze",
      "silver",
      "gold",
      "author"
    ]

    const ghostColors = [
      "personalBest",
      "easy",
      "normal",
      "hard",
      "author"
    ]

    setMap(index).then( () => {

      getCurrentAuthProfile().then(profileData => {
        setEnableGhost(isGhostEnabled);
        setSpectateMode(false)

        startGame();
        for(const ghostNameIndex in ghostNames){
          nameGhost(ghostNames[ghostNameIndex],ghostNameIndex)
        }

        for(const ghostColorIndex in ghostColors){
          colorGhostCar(ghostColors[ghostColorIndex],ghostColorIndex)
        }
        drawPlayerVehicle(profileData.vehicleID);
        for(let i = 0; i < 5; i++){
          if(difficultyList[i]){
            drawGhostVehicle("campaign", i)
            updateGhostCarEnabledList(i, true) //this needs to be done when buttons are toggled. //done?
          }
        }
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

export default RaceAllLocalButton;