import {mapCanvas,playerCanvas} from "./elements.js"
import {getMapData,getTilePixelCount} from "./game.js"
//just for now
const mapCtx = mapCanvas.getContext("2d");
const playerCtx = playerCanvas.getContext("2d");

const generateMiniMap = (mapData) => { 
  mapCanvas.width = mapData.length;
  mapCanvas.height = mapData[0].length;
  mapCtx.globalCompositeOperation='destination-over';

  for(let rowIndex in mapData){
    for(let cellIndex in mapData[rowIndex]){
      if(mapData[rowIndex][cellIndex] == 0){
        mapCtx.fillStyle = "white"
        mapCtx.fillRect(cellIndex,rowIndex,1,1);
      }
      else if(mapData[rowIndex][cellIndex] == 4 ||
        mapData[rowIndex][cellIndex] == 5 ){
        mapCtx.fillStyle = "grey"
        mapCtx.fillRect(cellIndex,rowIndex,3,3);
      }
    }
  }
  mapCtx.globalCompositeOperation='source-over';

}


const updateMiniMapPlayers = (player,ghost) => {
  playerCanvas.width = mapCanvas.width;
  playerCanvas.height = mapCanvas.width;

  playerCtx.clearRect(0,0,playerCanvas.width,playerCanvas.height);

  playerCtx.fillStyle = "red"
  playerCtx.fillRect(player.getX()/getTilePixelCount(),player.getY()/getTilePixelCount(),5,5);

  playerCtx.fillStyle = "blue"
  playerCtx.fillRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),5,5);
}


export {generateMiniMap,updateMiniMapPlayers};