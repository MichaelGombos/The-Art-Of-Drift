import React, { useState  } from 'react';

import MapList from '../components/map-list.js';
import Leaderboard from '../components/leaderboard.js';



const Leaderboards = () => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  if(mapSelectScreen == "list"){
    return (
      <MapList screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <Leaderboard screenSetter={setMapSelectScreen} mapIndex={index}></Leaderboard>
    )
  }

}



export default Leaderboards;