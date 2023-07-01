import {mapCanvas,playerCanvas} from "./elements.js"
import {getTilePixelCount} from "./game.js"
import {drawCanvasMap} from "./graphics.js"
//just for now


const generateMiniMap = (mapData) => { 
    let shouldShow = localStorage.getItem("showMiniMap") && JSON.parse(localStorage.getItem("showMiniMap"))
    if(!shouldShow){
        mapCanvas.classList.add("hidden")
        return;
    }
    mapCanvas.classList.remove("hidden")

    const mapCtx = mapCanvas.getContext("2d");

    mapCanvas.width = mapData[0].length;
    mapCanvas.height = mapData.length;
  
    drawCanvasMap(mapCtx,mapData)
}
//push mini map to its own component, and create a window.generateMiniMap(mapCanvasRef) function that uses the canvas in the component instead of the one from elements.js. This should be easy...

const updateMiniMapPlayers = (player,ghosts) => {
    let shouldShow = localStorage.getItem("showMiniMap") && JSON.parse(localStorage.getItem("showMiniMap"))
    if(!shouldShow){
        playerCanvas.classList.add("hidden")
        return;
    }
    playerCanvas.classList.remove("hidden")

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

    for(const ghost of ghosts){
        playerCtx.fillRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),80,80);
        playerCtx.strokeRect(ghost.getX()/getTilePixelCount(),ghost.getY()/getTilePixelCount(),80,80);
    }

}

const updateMapVisibility = (isShown) => {
    if(!isShown){
        playerCanvas.classList.add("hidden")
        mapCanvas.classList.add("hidden")
        return;
    }
    else{
        playerCanvas.classList.remove("hidden")
        mapCanvas.classList.remove("hidden")
    }
}


export {generateMiniMap,updateMiniMapPlayers,updateMapVisibility};
