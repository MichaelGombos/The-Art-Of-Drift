import {mapCanvas,playerCanvas} from "./elements.js"
import {getMapData,getTilePixelCount} from "./game.js"
import {drawCanvasMap} from "./graphics.js"
//just for now
const mapCtx = mapCanvas.getContext("2d");
const playerCtx = playerCanvas.getContext("2d");


const generateMiniMap = (mapData) => { 
  mapCanvas.width = mapData[0].length;
  mapCanvas.height = mapData.length;

  drawCanvasMap(mapCtx,mapData)
}


const updateMiniMapPlayers = (player,ghost) => {
  playerCanvas.width = mapCanvas.width;
  playerCanvas.height = mapCanvas.height;

  playerCtx.clearRect(0,0,playerCanvas.width,playerCanvas.height);

  playerCtx.fillStyle = "red"
  playerCtx.fillRect(player.getX()/getTilePixelCount(),player.getY()/getTilePixelCount(),5,5);

  playerCtx.fillStyle = "blue"
  playerCtx.fillRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),5,5);
}


export {generateMiniMap,updateMiniMapPlayers};