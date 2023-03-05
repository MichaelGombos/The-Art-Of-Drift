import {mapCanvas,playerCanvas} from "./elements.js"
import {getTilePixelCount} from "./game.js"
import {drawCanvasMap} from "./graphics.js"
//just for now


const generateMiniMap = (mapData) => { 

    const mapCtx = mapCanvas.getContext("2d");

    mapCanvas.width = mapData[0].length;
    mapCanvas.height = mapData.length;
  
    drawCanvasMap(mapCtx,mapData)
}


const updateMiniMapPlayers = (player,ghost) => {
    const playerCtx = playerCanvas.getContext("2d");
    playerCanvas.width = mapCanvas.width;
    playerCanvas.height = mapCanvas.height;
  
    playerCtx.clearRect(0,0,playerCanvas.width,playerCanvas.height);
    playerCtx.strokeStyle = "white";
    playerCtx.lineWidth = 15;
    playerCtx.fillStyle = "red"
  
    playerCtx.fillRect(player.getX()/getTilePixelCount(),player.getY()/getTilePixelCount(),80,80);
    playerCtx.strokeRect(player.getX()/getTilePixelCount(),player.getY()/getTilePixelCount(),80,80);
  
    playerCtx.fillStyle = "blue"
    playerCtx.fillRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),80,80);
    playerCtx.strokeRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),80,80);
  

}


export {generateMiniMap,updateMiniMapPlayers};