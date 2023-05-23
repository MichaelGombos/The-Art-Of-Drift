import React, { useState, useEffect, useRef } from 'react';
import {motion, useUnmountEffect} from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../gui/components/button.js';
import TextInput from '../gui/components/input-text.js';
import IconButton from '../gui/components/icon-button.js';
import ProfileSelect from '../gui/components/profile-select.js';

import { 
  //test
  printUserProfile,
  //auth
  emailSignUp,
  emailSignIn,
  guestSignIn,
  logOut,
  deleteAccount,
  deleteAccountUID,
  //db-users
  updateProfile,
  getCurrentAuthProfile,
  deleteProfile,
  deleteProfileUID,
  guestUpgrade,
  getMap,
  updateMap,
 } from '../gui/helpers/databaseFacade.js';
import InputToggle from '../gui/components/input-toggle.js';
import InputSlider from '../gui/components/input-slider.js';

import brush1URL from "../assets/brush-sizes/size_1.png";
import brush2URL from "../assets/brush-sizes/size_2.png";
import brush3URL from "../assets/brush-sizes/size_3.png";
import brush5URL from "../assets/brush-sizes/size_4.png";
import brush11URL from "../assets/brush-sizes/size_5.png";
import brushFillURL from "../assets/brush-sizes/fill.png";
import logSizeInBytes from './size-in-bytes.js';
import { compressMapData, decompressMapData } from '../game/map-compression.js';
import arrowURL from '../assets/map-maker/arrow.svg'
//variables

const brushSizes = //each brush size is an array of coord objects
{
  finish: [
    {r:0, c:-5}, {r:0, c:-4}, {r:0, c:-3}, {r:0, c:-2}, { r:0, c:-1 },{ r:0,  c:0 }, { r:0 , c:1} , {r:0, c:2}, {r:0, c:3}, {r:0, c:4}, {r:0, c:5}
  ],
  checkPoint: [
    {r:-5, c:0}, {r:-4, c:0}, {r:-3, c:0}, {r:-2, c:0}, { r:-1, c:0 },{ r:0,  c:0 }, { r:1 , c:0} , {r:2, c:0}, {r:3, c:0}, {r:4, c:0}, {r:5, c:0}
  ],
  brush1: [
    {r:0,c:0}
  ],
  brush2: [
    {r:0,c:0},{r:0,c:1},{r:1,c:0},{r:1,c:1}
  ],
  brush3: [
    {r:-1,c:0},{r:0,c:-1},{r:0,c:0},{r:1,c:0},{r:0,c:1}
  ],
  brush5: [
    {r:-2,c:-1},{r:-2,c:0},{r:-2,c:1},

    {r:-1,c:-2},{r:-1,c:-1},{r:-1,c:0},{r:-1,c:1},{r:-1,c:2},
    {r:0,c:-2},{r:0,c:-1},{r:0,c:0},{r:0,c:1},{r:0,c:2},
    {r:1,c:-2},{r:1,c:-1},{r:1,c:0},{r:1,c:1},{r:1,c:2},

    {r:2,c:-1},{r:2,c:0},{r:2,c:1}
  ],
  brush11: [ //lol
    {r:-5,c:-1},{r:-5,c:0},{r:-5,c:1},
    {r:-4,c:-3},{r:-4,c:-2},{r:-4,c:-1},{r:-4,c:0},{r:-4,c:1},{r:-4,c:2},{r:-4,c:3},
    {r:-3,c:-4},{r:-3,c:-3},{r:-3,c:-2},{r:-3,c:-1},{r:-3,c:0},{r:-3,c:1},{r:-3,c:2},{r:-3,c:3},{r:-3,c:4},
    {r:-2,c:-4},{r:-2,c:-3},{r:-2,c:-2},{r:-2,c:-1},{r:-2,c:0},{r:-2,c:1},{r:-2,c:2},{r:-2,c:3},{r:-2,c:4},
    {r:-1,c:-5},{r:-1,c:-4},{r:-1,c:-3},{r:-1,c:-2},{r:-1,c:-1},{r:-1,c:0},{r:-1,c:1},{r:-1,c:2},{r:-1,c:3},{r:-1,c:4},{r:-1,c:5},
    {r:0,c:-5},{r:0,c:-4},{r:0,c:-3},{r:0,c:-2},{r:0,c:-1},{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},
    {r:1,c:-5},{r:1,c:-4},{r:1,c:-3},{r:1,c:-2},{r:1,c:-1},{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},
    {r:2,c:-4},{r:2,c:-3},{r:2,c:-2},{r:2,c:-1},{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},
    {r:3,c:-4},{r:3,c:-3},{r:3,c:-2},{r:3,c:-1},{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},
    {r:4,c:-3},{r:4,c:-2},{r:4,c:-1},{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},
    {r:5,c:-1},{r:5,c:0},{r:5,c:1}
  ]
}
const tileTypes = [
  {  tileName:"road",   value:0 , color: "#FFA500"},
  {  tileName:"wall", value:1, color: "#FF0000"},
  {  tileName:"dirt",  value:2, color : "#964B00"},  
  {  tileName:"spawn", value:3, color: "#71c9ff"},
  { tileName:"finish-up", value:4, color: "#73ff71"},
  { tileName:"finish-down", value:5, color: "#ff29e2"},
  { tileName:"bumper",  value:6, color:  "#0027d2"},
  { tileName:"check-point-l-road",  value:7, color: "rgb(78, 135, 162)"},
  { tileName:"check-point-r-road",  value:8, color: "rgb(187, 187, 187)"},
  { tileName:"check-point-l-dirt", value:9, color: "rgb(72, 183, 216)"},
  { tileName:"check-point-r-dirt", value:10 ,color: "rgb(216, 216, 216)"},

  { tileName:"tutorial-trigger-0", value:11, color: "#47694d"},
  { tileName:"tutorial-trigger-1",  value:12, color:  "#4f7555"},
  { tileName:"tutorial-trigger-2",  value:13, color: "#598561"},
  { tileName:"tutorial-trigger-3",  value:14, color: "#65966e"},
  { tileName:"tutorial-trigger-4", value:15, color: "#77b582"},
  { tileName:"tutorial-trigger-5", value:16 ,color: "#87cc93"},
]

let painting = false;
let context;
let mapData = [];
let spawnTile =    
{
  type:tileTypes[3], 
  row:6,
  column:8,
  element : null
}

let rows = 1000;
let columns = 1000;

//functions

const generateCanvasMapColor = (canvas,data) => {
  mapData = data;
  console.log(mapData,data)
  rows = (mapData.length);
  columns = (mapData[0].length);
  
  canvas.width = mapData[0].length;
  canvas.height = mapData.length;

  context.globalCompositeOperation='destination-over';
  for(let rowIndex in mapData){
    for(let cellIndex in mapData[rowIndex]){
      context.fillStyle =tileTypes[mapData[rowIndex][cellIndex]].color;
      context.fillRect(cellIndex,rowIndex,1,1);
    }
  }
  context.globalCompositeOperation='source-over';
}

const generateDefaultMapData = (rows,columns) => {
  let primativeMapData = [];

  for(let r = 0; r < rows; r++ ){
    let mapRow = new Array();
    for(let c = 0; c < columns; c++){
      if(r == spawnTile.row && c == spawnTile.column){
        mapRow.push(3); //spawn 
      }
      else{
        // mapRow.push(0); // road
        mapRow.push(2); //dirt
      }
    }
    primativeMapData.push(mapRow);
  }
  return primativeMapData;
}

const setTile = (coords, type, modifier = 1) => {
  //updates mapData, and draws tile on canvas.
  mapData[coords.r][coords.c] = type.value;

  context.fillStyle = type.color;
  context.fillRect(coords.c,coords.r,modifier,modifier);
}

const verticalFill = (r,c, type, current) => {
  //If row is less than 0
    if(r < 0){
        return;
    }
    //If row is greater than map length
    if(r > mapData.length - 1){
        return;
    }
    //If column is greater than map length
    if(c > mapData[r].length - 1){
        return;
    }
    //If the current tile is not the type we need to swap
    if(mapData[r][c] !== current){
        return;
    }
     //Update the new tpe
     setTile({r:r,c:c},type)
     //Fill in ROW directions
     verticalFill(r-1,c, type, current);
     verticalFill(r+1,c, type, current);
}

const horizontalFill = (r,c, type, current) => {
  //If row is less than 0
    if(r < 0){
        return;
    }

    //If row is greater than map length
    if(r > mapData.length - 1){
        return;
    }

    //If column is greater than map length
    if(c > mapData[r].length - 1){
        return;
    }

    //If the current tile is not the type we need to swap
    if(mapData[r][c] !== current){
        return;
    }
    
     //Update the new tpe
     setTile({r:r,c:c},type)
     //Fill in ROW directions
     horizontalFill(r,c-1, type, current);
     horizontalFill(r,c+1, type, current);
}


const bucketFill = (r,c, type, current) => {
  //If row is less than 0
    if(r < 0){
        return;
    }

    //If column is less than 0
    if(c < 0){
        return;
    }

    //If row is greater than map length
    if(r > mapData.length - 1){
        return;
    }

    //If column is greater than map length
    if(c > mapData[r].length - 1){
        return;
    }

    //If the current tile is not the type we need to swap
    if(mapData[r][c] !== current){
        return;
    }
    
     //Update the new tpe
     setTile({r:r,c:c},type)
     //Fill in all four directions
     bucketFill(r-1,c, type, current);
     bucketFill(r+1,c, type, current);
     bucketFill(r,c-1, type, current);
     bucketFill(r,c+1, type, current);
}

const fillTiles = (c,r,currentFill) => {
  const leftBound = 0; 
  const rightBound = mapData[0].length-1;
  const topBound = 0;
  const bottomBound = mapData.length-1;


  switch(true) {
    case (currentFill.type.tileName == "spawn"):
      //if spawn tile is already set,  and change the dom map tile class to road
      setTile({r:spawnTile.row,c:spawnTile.column}, tileTypes[0])
      // spawnTile.element.classList.remove("spawn");
      // spawnTile.element.classList.add("road");

      spawnTile.row = r;
      spawnTile.column = c;
      break;
    case (currentFill.size == "fill"):
      bucketFill(r,c,currentFill.type,mapData[r][c]);
      break;
    case (currentFill.type.tileName == "check-point-l-road" ||
    currentFill.type.tileName == "check-point-r-road" ||
    currentFill.type.tileName == "check-point-l-dirt" ||
    currentFill.type.tileName == "check-point-r-dirt" ):
      verticalFill(r,c,currentFill.type,mapData[r][c]);
      break;
    case (currentFill.type.tileName == "finish-up" || currentFill.type.tileName == "finish-down"):
      horizontalFill(r,c,currentFill.type,mapData[r][c]);
      break;
    case (currentFill.size == 2):
      if(c + 1 <= rightBound && r + 1 <= bottomBound){
        for(let coord of brushSizes.brush2){      
         setTile({r:r+coord.r,c:c+coord.c},currentFill.type);
       }
      }
      break;
    case (currentFill.size == 3):
      if(c - 1 >= leftBound && c + 1 <= rightBound && r - 1 > topBound && r + 1 < bottomBound) {
        for(let coord of brushSizes.brush3){      
          setTile({r:r+coord.r,c:c+coord.c},currentFill.type);
        }
     }
    break;
    case (currentFill.size == 5):
      if(c - 2 >= leftBound && c + 2 <= rightBound && r - 2 > topBound && r + 2 < bottomBound) {
        for(let coord of brushSizes.brush5){      
          setTile({r:r+coord.r,c:c+coord.c},currentFill.type);
        }
     }
    break;
    case (currentFill.size == 11):
      if(c - 5 >= leftBound && c + 5 <= rightBound && r - 5 > topBound && r + 5 < bottomBound) {
        for(let coord of brushSizes.brush11){      
          setTile({r:r+coord.r,c:c+coord.c},currentFill.type);
        }
     }
    break;

  }
      //set center tile
      setTile({r:r,c:c},currentFill.type);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}
const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

// components

const MapMakerHeading = ({lapCount, spawnAngle,setPreviewMap, mode}) => {
  const {mapID} = useParams();
  const navigate = useNavigate();
  const handleCopyCompressed = (e) => {
    console.log("hello?")
    let arrayString = `{ "spawnAngle" : ${spawnAngle} , "lapCount" : ${lapCount} , "data" : [${ compressMapData(mapData).map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `;
    logSizeInBytes("COMPRESSED", arrayString); //TODO show in alert banner instead
    copyToClipboard(arrayString);
  }
  const handleSaveAs = () => {
    navigate("/community-maps/upload")   
    let arrayString = `{ "spawnAngle" : ${spawnAngle} , "lapCount" : ${lapCount} , "data" : [${ compressMapData(mapData).map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `;
    setPreviewMap(arrayString)
  }

  const handleSave = () => {
    //update current map (in db) with this juicy map data, then navigate user to the view screen for it.
    let arrayString = `{ "spawnAngle" : ${spawnAngle} , "lapCount" : ${lapCount} , "data" : [${ compressMapData(mapData).map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `;
    updateMap(mapID,arrayString).then(() => {
      navigate(`/community-maps/${mapID}`)
    })
  }

  return (
    <>

        <h1 className="f-h1">Map<span className="text-secondary-500"> Maker</span> :)</h1>
        
        <div className="col-6 gap-md">
          {mode == "edit" ? 
          <Button 
          style="primary"
          clickHandler={handleSave}
          >save</Button>
          : ""}
           
          <Button style={ mode == "edit" ? "light" : "primary"}clickHandler={handleSaveAs}>save as</Button>
          <Button clickHandler={handleCopyCompressed}>copy data to clipboard</Button>
          <Button clickHandler={(() => {navigate("/community-maps")})}>Exit</Button>
        </div>
    </>
  )
}

const ImageOverlayMenu = ({setShowOverlay,mapMakerCanvasOverlayRef}) => {

  // const [localFileMode,setLocalFileMode] = useState(false);
  const [overlayURLText, setOverlayURLText ] = useState();

  const handleOverlayUrlUpdate = (e) => {
    setOverlayURLText(e)
  }

  const handleLoadImage = () => {
    mapMakerCanvasOverlayRef.current.src = overlayURLText;
    setShowOverlay(true)
  }

  const handleClearImage = () => {
    setShowOverlay(false)
  }

  return(
    <div className="col-6 gap-md">
      <h2 className="f-h2">Image Overlay</h2>
      {/* <InputToggle newValue={localFileMode} setter={setLocalFileMode}>Local File Mode</InputToggle> */}
      <TextInput id="image-overlay-url" 
      labelText="Enter url"
      placeholderText="Paste url here"
      changeHandler={handleOverlayUrlUpdate}
      min={0}
      />
      <Button clickHandler={handleLoadImage}>load image</Button>
      <Button clickHandler={handleClearImage}>clear image</Button>
    </div> 
  )
}

const MapSizeMenu = ({newMapRows,setNewMapRows,newMapColumns,setNewMapColumns,mapMakerCanvasRef }) => {
  return(
    <div className="col-6 gap-md">
    <h2 className="f-h2">Map Size</h2>
    <Button style="danger" clickHandler={(
      ()=> {
        generateCanvasMapColor(mapMakerCanvasRef.current, generateDefaultMapData(newMapRows,newMapColumns))
      }
    )} >Change size (clears map)</Button>
    <InputSlider minimum={10} maximum={3000} newValue={newMapRows} setter={setNewMapRows}>Rows</InputSlider>
    <InputSlider minimum={10} maximum={3000} newValue={newMapColumns} setter={setNewMapColumns}>Columns</InputSlider>
  </div>  

  )
}

const ResetmapButton = ({mapMakerCanvasRef}) => {
  return (

    <Button style="danger" clickHandler={(
      ()=> {
        generateCanvasMapColor(mapMakerCanvasRef.current, generateDefaultMapData(rows,columns))
      }
    )} >Clear map</Button>
  )
}

const MapInfoMenu = ({lapCount,setLapCount,spawnAngle , setSpawnAngle}) => {
  const spawnAngleGraphic = useRef('null')
  const handleSpawnAngleChange = () => {
    spawnAngleGraphic.current.style.transform = `rotate(${spawnAngle}deg)`;
  }

  useEffect(() => {
    handleSpawnAngleChange()
  },[])

  return(
    <div className="col-6 gap-md">
      <h2 className="f-h2">Map Info</h2>
      <div className='spawn-angle__wrapper'>
        <InputSlider minimum={0} maximum={360} newValue={spawnAngle} setter={setSpawnAngle} sideEffect={handleSpawnAngleChange}>Spawn Angle
        
        <img ref={spawnAngleGraphic} className='spawn-angle__arrow' src={arrowURL}/></InputSlider>
      </div>
      <InputSlider    minimum={1} maximum={10} newValue={lapCount} setter={setLapCount}>Lap Count</InputSlider>

    </div>  
  )
} 


const BrushColorMenu = ({brushType,setBrushType}) => {



  const handleTileClick = (newType) => {
    setBrushType(newType);
    console.log("chungus")
  }

  return (
    <>
      <p className="f-p2">Brush color</p>
      <div className="paints">
        {tileTypes.map(type => {
          return(
            <div 
            key={type.tileName} 
            className="paint">
              <p className='paint-header'>{type.tileName}</p>  
              <div 
              onClick={(() => handleTileClick(type))}
              style={{backgroundColor:type.color}}
              className={`paint-tile ${type.tileName} ${brushType == type ? "paint-tile--selected" : ""}`}></div>
            </div>
          )

        })}
      </div>
    </>
  )
}

const BrushSizeMenu = ({brushSize, setBrushSize}) => {


  let brushSizeIconMaps = {
    brush1 : brush1URL,
    brush2 : brush2URL,
    brush3 : brush3URL,
    brush5 : brush5URL,
    brush11 : brush11URL,
    fill : brushFillURL
  }

  let indexToLegacySizeMap = {
    brush1 : 1,
    brush2 : 2,
    brush3 : 3,
    brush5 : 5,
    brush11 : 11,
    fill : "fill"
  }

  const changeBrushSizeHandler = (size) => {
    setBrushSize(indexToLegacySizeMap[size])
  }

  return (
    <>
      <p className="f-p2">Brush Size</p>
      <div className="brush-sizes">
        {Object.keys(brushSizeIconMaps).map(iconURLIndex => {
          return(
            <div key={iconURLIndex} className={`brush-size ${brushSize == indexToLegacySizeMap[iconURLIndex] ? "brush-size--selected" : ""}`} 
            onClick={(() => changeBrushSizeHandler(iconURLIndex))}
            >
              <img className="brush-size__image" src={brushSizeIconMaps[iconURLIndex]}/>
            </div>
          )
        })}
      </div>
    </>
  )

}
const BrushStyleMenu = ({brushSize, setBrushSize, brushType,setBrushType}) => {



  return(
    <div className="col-6 gap-md">
      <h2 className="f-h2">Brush Style</h2>
      <BrushColorMenu 
      brushType={brushType}
      setBrushType={setBrushType}
      />
      <BrushSizeMenu
      brushSize={brushSize}
      setBrushSize={setBrushSize}
      />
    </div>  
  )
}



const LoadExistingMapMenu = ({setExistingMapData,existingMapData,setSpawnAngle,setLapCount,mapMakerCanvasRef}) => {
  const handleMapDataInputChange = (value) => {
    setExistingMapData(value)
  }

  const handleMapDataUpload = () => {
    let map = JSON.parse(existingMapData);
    console.log( JSON.parse(existingMapData))
    setSpawnAngle(map.spawnAngle);
    setLapCount(map.lapCount);
    console.log(decompressMapData(map.data))
    generateCanvasMapColor(mapMakerCanvasRef.current, decompressMapData(map.data))
  }
  return(
    <div className="col-6 gap-md">
      <h2 className="f-h2">Load Existing Map</h2>
      <TextInput id="load-map-data" 
      labelText="Enter map data"
      placeholderText="paste map data here"
      changeHandler={handleMapDataInputChange}
      min={0}
      />
      <Button clickHandler={handleMapDataUpload}>load map</Button>
      
    </div>  
  )
}



const MapMakerMenu = ({ 
  brushType ,
  setBrushType ,
  brushSize,
  setBrushSize ,
  newMapRows ,
  setNewMapRows ,
  newMapColumns ,
  setNewMapColumns,
  mapMakerCanvasOverlayRef,
  mapMakerCanvasRef,
  setShowOverlay,
  setPreviewMap,
  mode
}) => {



  const [copiedToClipboard,setCopiedToClipboard] = useState();
  const [imageUrl,setImageUrl] = useState();
  const [lapCount, setLapCount] = useState(3);
  const [spawnAngle,setSpawnAngle] = useState(270);
  const [existingMapData,setExistingMapData] = useState();

  const navigate = useNavigate();

  return (
    <div className='scroll-container scroll-container--tall map-maker__menu col-6 row gap-xxl'>

        <MapMakerHeading 
        mode = {mode}
        lapCount={lapCount} 
        spawnAngle={spawnAngle}
        setPreviewMap = {setPreviewMap}
        />
        <ImageOverlayMenu 
        setShowOverlay={setShowOverlay}
        mapMakerCanvasOverlayRef={mapMakerCanvasOverlayRef}/>
        {/* <MapSizeMenu 
          newMapRows = {newMapRows}
          setNewMapRows = {setNewMapRows}
          newMapColumns = {newMapColumns}
          setNewMapColumns = {setNewMapColumns}
          mapMakerCanvasRef = {mapMakerCanvasRef}
        /> */}
        <ResetmapButton mapMakerCanvasRef={mapMakerCanvasRef}/>
        <MapInfoMenu
          lapCount = {lapCount}
          setLapCount = {setLapCount}
          spawnAngle = {spawnAngle}
          setSpawnAngle = {setSpawnAngle}
        />
        <BrushStyleMenu
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          brushType={brushType}
          setBrushType={setBrushType}
        />
        <LoadExistingMapMenu
        setExistingMapData = {setExistingMapData}
        existingMapData = {existingMapData}
        setLapCount = {setLapCount}
        setSpawnAngle = {setSpawnAngle}
        mapMakerCanvasRef={mapMakerCanvasRef}
        />

  </div>

    
  )
}

const MapMakerCanvas = (props) => {
  const {
  mapRows,
  mapColumns,
  currentFill,
  mapMakerCanvasRef,
  mapMakerCanvasOverlayRef,
  showOverlay,
  mode
} = props;

const {mapID} = useParams();
  

  const handleCanvasMouseMovement = (e) => {
    if(painting){
      const pos = getMousePos(mapMakerCanvasRef.current,e)
      const posx = Math.floor(pos.x);
      const posy = Math.floor(pos.y);
      fillTiles(posx,posy,currentFill)
    }
  }

  const handleCanvasMouseClick = (e) => {
    const pos = getMousePos(mapMakerCanvasRef.current,e)
    const posx = Math.floor(pos.x);
    const posy = Math.floor(pos.y);
    fillTiles(posx,posy,currentFill)
  }
  useEffect(() => {


    if(mapMakerCanvasRef.current != null){
      context = mapMakerCanvasRef.current.getContext("2d")
      switch(mode){
        case("create"):
          console.log("create");
            generateCanvasMapColor(mapMakerCanvasRef.current, generateDefaultMapData(mapRows,mapColumns))
          break;
        case("edit"):
          console.log("edit", mapID);
          getMap(mapID).then(information => {
            generateCanvasMapColor(mapMakerCanvasRef.current, decompressMapData(JSON.parse(information.mapObject).data))
          })
          break;
        case("clone"):
          console.log("clone", mapID);
          getMap(mapID).then(information => {
            generateCanvasMapColor(mapMakerCanvasRef.current, decompressMapData(JSON.parse(information.mapObject).data))
          })
          break;
      }
    }

  },[mapMakerCanvasRef])
  

  return(
    <div className='map-maker-canvas__wrapper gap-md scroll-container scroll-container--tall'>
      <p className="map-maker-canvas__text">map : loading...</p>
      <img
            className={`canvas-overlay__image ${showOverlay ? "" : "canvas-overlay__image--hidden"}`}
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3jJYs7ebxFT8bboef4nbUjmkm1eZAXQj8rbTvbnh&s"}
            ref={mapMakerCanvasOverlayRef}
      />
      <canvas 
      ref={mapMakerCanvasRef}
      onMouseDown = {() => (painting = true)}
      onMouseUp = {() =>  (painting = false)}
      onMouseMove = {handleCanvasMouseMovement}
      onClick = {handleCanvasMouseClick}
      
      className="map-maker-canvas"></canvas>
    </div>
  )
}


const MapMaker = ({setPreviewMap,mode}) => {
  const mapMakerCanvasOverlayRef = useRef(null);
  const mapMakerCanvasRef = useRef(null);
  const [brushType,setBrushType] = useState(tileTypes[0]);
  const [brushSize,setBrushSize] = useState(11);
  const [newMapRows,setNewMapRows] = useState(rows);
  const [newMapColumns,setNewMapColumns] = useState(columns);
  const [showOverlay,setShowOverlay] = useState(false);

  return (
    <div className="dark-background ">
      <div className='map-maker__container'>

          <MapMakerMenu
          brushType = {brushType}
          setBrushType = {setBrushType}
          brushSize = {brushSize}
          setBrushSize = {setBrushSize}
          newMapRows = {newMapRows}
          setNewMapRows = {setNewMapRows}
          newMapColumns = {newMapColumns}
          setNewMapColumns = {setNewMapColumns}
          mapMakerCanvasOverlayRef = {mapMakerCanvasOverlayRef}
          mapMakerCanvasRef = {mapMakerCanvasRef}
          setShowOverlay = {setShowOverlay}
          setPreviewMap={setPreviewMap}
          mode = {mode}
          />

            <MapMakerCanvas
          mode = {mode}
          mapMakerCanvasRef = {mapMakerCanvasRef}
          showOverlay = {showOverlay}
          mapMakerCanvasOverlayRef = {mapMakerCanvasOverlayRef}
          currentFill = {{
            type : brushType,
            size : brushSize
          }}
          mapRows = {newMapRows}
          mapColumns = {newMapColumns}
            />

      </div>
    </div>

  )
}



export default MapMaker;