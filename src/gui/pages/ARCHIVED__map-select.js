import React, { useState , useEffect } from 'react';

import MapList from '../components/map-list.js';
import MapDetail from '../components/map-detail.js';

const MapSelect = () => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  if(mapSelectScreen == "list"){
    return (
      <MapList  screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <MapDetail screenSetter={setMapSelectScreen} mapIndex={index}></MapDetail>
    )
  }

}



export default MapSelect;