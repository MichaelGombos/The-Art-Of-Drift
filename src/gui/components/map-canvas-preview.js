import React, {useEffect} from "react"
import { maps} from  "../../game/map-data.js"
import { drawCanvasMap } from '../../game/graphics.js';

import { decompressMapData } from '../../game/map-compression.js';


const MapCanvasPreview = ({width, mapIndex , isTiny = false, communityMapData}) => {
  useEffect(() => {
    let decompressedMap;
    if(communityMapData){
      decompressedMap = decompressMapData(communityMapData)
    }
    else{
      decompressedMap = decompressMapData(maps[mapIndex].data)
    }
    const mapPreviewCanvas = document.querySelector(".map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = decompressedMap[0].length;
    mapPreviewCanvas.height = decompressedMap.length;
    drawCanvasMap(mapPreviewContext, decompressedMap)
    
  })

  return(
    <div className={`map-preview-container ${width} `}>
      <canvas className={`map-preview ${isTiny ? "map-preview--sm" : ""}`}></canvas>
    </div>
  )
}

export default MapCanvasPreview;