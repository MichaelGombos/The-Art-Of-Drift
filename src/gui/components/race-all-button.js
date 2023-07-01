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
    const pbReplayData = replayObject ? replayObject.replay : 
    replays[index]["author"]["replay"] //filler, could put empty objec
    setMapData(maps[index],[
      pbReplayData , 
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
        console.log("This is right before ghost naming loop")
        for(const ghostNameIndex in ghostNames){

          console.log("Inside the ghost naming loop", ghostNames, ghostNameIndex, ghostNames[ghostNameIndex])
          nameGhost(ghostNames[ghostNameIndex],ghostNameIndex)
        }

        for(const ghostColorIndex in ghostColors){
          colorGhostCar(ghostColors[ghostColorIndex],ghostColorIndex)
        }
        drawPlayerVehicle(profileData.vehicleID);
        for(let i = 0; i < 5; i++){
          if(difficultyList[i]){
            if(difficultyList[i] ==true){
              if(i == 0){
                drawGhostVehicle(profileData.vehicleID, i)
              }
              else{
                drawGhostVehicle("campaign", i)
              }
              updateGhostCarEnabledList(i, true) //this needs to be done when buttons are toggled. //done?
            }
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