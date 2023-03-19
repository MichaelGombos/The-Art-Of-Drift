import {compressMapData,decompressMapData} from "./map-compression.js"
import logSizeInBytes from "./size-in-bytes.js";

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
]
const mapCol = document.querySelector("#cols");
const mapRow = document.querySelector("#rows");
const mapSizeSubmit = document.querySelector("#map-size-submit");

const map = document.querySelector("#map");
const paints = document.querySelector("#paints");

const uploadButton = document.querySelector("#upload");
const uploadCompressedButton = document.querySelector("#upload-compressed");
const mapInput = document.querySelector("#map-input")
const brushSizeSelect = document.querySelector("#brush-size-select")
const copyToClipboardButton = document.querySelector("#copy-to-clipboard");
const copyCompressedToClipboardButton = document.querySelector("#copy-compressed-to-clipboard");

const imageOverlay = document.querySelector("#overlay");
const imageOverlayUrlInput = document.querySelector("#overlay-url");
const imageOverlayFileInput = document.querySelector("#overlay-local-file");
const imageOverlaySubmit = document.querySelector("#overlay-submit");
const imageOverlayClear = document.querySelector("#overlay-clear");

const lapCount = document.querySelector("#lap-count");
const spawnAngle = document.querySelector("#spawn-angle");
const spawnAngleGraphic = document.querySelector("#angle-graphic");

const canvasMap = document.querySelector("canvas");


const context = canvasMap.getContext("2d");


let mapData = [];
let flatMapData = [];
let length_of_row = 0;

let rows = 150;
let columns = 150;
let currentFill = {
  type : tileTypes.find(t => t.tileName == "wall"),
  size : 1
}
let painting = false;
let spawnTile =    
{
  type:tileTypes[3], 
  row:6,
  column:8,
  element : null
}

let spawnElement;
let newRow;
let newColumn;

let brushSizes = //each brush size is an array of coord objects
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

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

const generateCanvasMapColor = (canvas,data) => {
  mapData = data;
  rows = mapData.length;
  columns = mapData[0].length;
  length_of_row = data[0].length;
  
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

const handleTileFill = (method) => (e) => {
  if(method == "point"){
    fillTiles(e,currentFill);
  }
  else if(method == "drag"){
    //check if mouse is held down
    if(painting){
      fillTiles(e,currentFill);
    }
  }
}

const handleTypeChange = (type) => (e) => {
  currentFill.type = type;
}

const handleBrushSizeChange = (e) => {
  currentFill.size =  e.target.value;
}


const handleCopy = (e) => {
  let arrayString = `{ "spawnAngle" : ${spawnAngle.value} , "lapCount" : ${lapCount.value} , "data" : [${mapData.map(mapRow => "\n[" + mapRow.map(cell => cell ) + "]")}\n] } `;
  logSizeInBytes("NON COMPRESSED", arrayString);
  copyToClipboard(arrayString);
}
const handleCopyCompressed = (e) => {
  let arrayString = `{ "spawnAngle" : ${spawnAngle.value} , "lapCount" : ${lapCount.value} , "data" : [${ compressMapData(mapData).map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `;
  logSizeInBytes("COMPRESSED", arrayString);
  copyToClipboard(arrayString);
}

const handleUpload = (e) => {
  let map = JSON.parse(mapInput.value);
  spawnAngle.value = map.spawnAngle;
  lapCount.value = map.lapCount;
  generateCanvasMapColor(canvasMap, map.data)
}

const handleUploadCompressed = (e) => {
  let map = JSON.parse(mapInput.value);
  spawnAngle.value = map.spawnAngle;
  lapCount.value = map.lapCount;
  console.log(decompressMapData(map.data))
  generateCanvasMapColor(canvasMap, decompressMapData(map.data))
}

const handleMapSizeChange = (e) => {
  e.preventDefault();

  rows = mapRow.value;
  columns = mapCol.value;

  generateCanvasMapColor(canvasMap, generateDefaultMapData(rows,columns))
}

const handleCanvasMouseMovement = (e) => {
  if(painting){
    const pos = getMousePos(canvasMap,e)
    const posx = Math.floor(pos.x);
    const posy = Math.floor(pos.y);
    fillTiles(posx,posy,currentFill)
  }
}

const handleCanvasMouseClick = (e) => {
  const pos = getMousePos(canvasMap,e)
  const posx = Math.floor(pos.x);
  const posy = Math.floor(pos.y);
  fillTiles(posx,posy,currentFill)
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

const handleUploadImageOverlay = e => {
  e.preventDefault();
  // var preview = document.querySelector('img');
  const file    = imageOverlayFileInput.files[0];
  const url = imageOverlayUrlInput.value;
  const reader  = new FileReader();

  reader.onloadend = function () {
    imageOverlay.src = reader.result;
  }

  if (file) {
    imageOverlay.classList.remove("hidden");
    reader.readAsDataURL(file);
  } else {
    imageOverlay.classList.add("hidden");
    imageOverlay.src = "";
    if(url){
      imageOverlay.classList.remove("hidden");
      imageOverlay.src = url;
    }
  }
}

const handleClearImageOverlay = e => {

  e.preventDefault();
  imageOverlay.classList.add("hidden");
  imageOverlay.src = "";
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

const handleSpawnAngleChange = e => {
  console.log(e.target.value)
  spawnAngleGraphic.style.transform = `rotate(${e.target.value}deg)`;
}

generateCanvasMapColor(canvasMap, generateDefaultMapData(rows,columns))

//display tiles 
for(let type of tileTypes){
  let paint = document.createElement("div")

  let paintHeader = document.createElement("p");
  let paintTile = document.createElement("div");

  paintHeader.innerText = type.tileName;
  paintHeader.classList.add("paint-header")

  paintTile.classList.add("paint-tile")
  paintTile.classList.add(type.tileName)
  paintTile.dataset.name = type.tileName;
  paintTile.addEventListener("click",handleTypeChange(type));
  
  paint.appendChild(paintTile);
  paint.appendChild(paintHeader);


  paints.appendChild(paint);
}


uploadButton.addEventListener("click",handleUpload);
uploadCompressedButton.addEventListener("click",handleUploadCompressed);
copyToClipboardButton.addEventListener("click", handleCopy)
copyCompressedToClipboardButton.addEventListener("click", handleCopyCompressed)

document.addEventListener("mousedown", () => painting = true)
document.addEventListener("mouseup", () => painting = false);

mapSizeSubmit.addEventListener("click",handleMapSizeChange);
brushSizeSelect.addEventListener("change", handleBrushSizeChange);

canvasMap.addEventListener("mousemove", handleCanvasMouseMovement)
canvasMap.addEventListener("click", handleCanvasMouseClick)

imageOverlaySubmit.addEventListener("click", handleUploadImageOverlay)
imageOverlayClear.addEventListener("click", handleClearImageOverlay)

spawnAngle.addEventListener("change",handleSpawnAngleChange)