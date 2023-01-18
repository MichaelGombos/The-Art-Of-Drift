import React from 'react';

import {resetGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import { maps} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"

const {useState} = React

const MapSelect = ({setter}) => { 
  let [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="menu map-select">
      GL ,':') HF
      <label htmlFor="difficulty">Difficulty</label>
      <div name="difficulty" id="difficulty">
        <button value="easy" className={difficulty == "easy" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>silver</button>
        <button value="normal" className={difficulty == "normal" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)} >gold</button>
        <button value="hard" className={difficulty == "hard" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>author</button>
      </div>
      <div className="map-options">
        <h2>Maps</h2>
        <div className="map-option">
          <h3>Taste of texas</h3>
          <button onClick = {()=> {
          setMapData(maps[0],replays[0][difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>


        <div className="map-option">
          <h3>Smile :D</h3>
          <button onClick = {()=> {
          setMapData(maps[1],replays[1][difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Eye of the drift holder</h3>
          <button onClick = {()=> {
          setMapData(maps[2],replays[2][difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Da lyne</h3>
          <button onClick = {()=> {
          setMapData(maps[3],replays[3][difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Hatchet Raceway</h3>
          <button onClick = {()=> {
          setMapData(maps[4],replays[4][difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>
      </div>

      

      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

export default MapSelect;