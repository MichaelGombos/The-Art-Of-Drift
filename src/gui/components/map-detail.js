
import React, { useState , useEffect } from 'react';

import {getEnableGhost} from "../../game/game.js"
import { maps, mapNames} from  "../../game/map-data.js"
import { drawCanvasMap } from '../../game/graphics.js';

import ToggleGhostButton from './toggle-ghost-button.js';
import BackToListButton from './back-to-list-button.js';
import RaceLocalButton from './race-local-button.js';
import LocalMedalsList from './local-medals-list.js';
import { decompressMapData } from '../../game/map-compression.js';

const MapDetail = ({screenSetter, mapIndex}) => {

  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [difficulty, setDifficulty] = useState("easy");
  const pb = localStorage.getItem(`pb${mapIndex}`);


  useEffect(() => {
    const decompressedMap = decompressMapData(maps[mapIndex].data)
    const mapPreviewCanvas = document.getElementById("map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = decompressedMap[0].length;
    mapPreviewCanvas.height = decompressedMap.length;
    drawCanvasMap(mapPreviewContext, decompressedMap)
    
  })



  return(
    <div className="menu map-select">
      <h1 className="f-h3">{mapNames[mapIndex]}</h1>
      <h4>Personal Best: <span className="text-color-secondary-500">{pb || "UNSET"}</span></h4>
      <div className="map-info-wrapper">
      <div className="map-info">
        <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
        </div>
        <LocalMedalsList pb={pb} difficulty={difficulty} setDifficulty={setDifficulty} newEnableGhost={newEnableGhost} setNewEnableGhost={setNewEnableGhost} mapIndex={mapIndex}/>
      </div>
      <div className="map-info-menu">
        <ToggleGhostButton setter={setNewEnableGhost} currentGhostSetting={newEnableGhost}/>
        <BackToListButton setter={screenSetter}/>
        <RaceLocalButton mapIndex={mapIndex} difficulty={difficulty} isGhostEnabled={newEnableGhost}/>

      </div>
      </div>
    </div>
  )
}

export default MapDetail;