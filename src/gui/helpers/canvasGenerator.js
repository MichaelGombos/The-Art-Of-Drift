


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
let mapData = [[0]];

const generateCanvasMapColor = (canvas,data) => {
  mapData = data;
  // rows = (mapData.length);
  // columns = (mapData[0].length);
  
  canvas.width = mapData[0].length;
  canvas.height = mapData.length;
  let context = canvas.getContext("2d")
  context.globalCompositeOperation='destination-over';
  for(let rowIndex in mapData){
    for(let cellIndex in mapData[rowIndex]){
      context.fillStyle =tileTypes[mapData[rowIndex][cellIndex]].color;
      context.fillRect(cellIndex,rowIndex,1,1);
    }
  }
  context.globalCompositeOperation='source-over';
}

export default generateCanvasMapColor;