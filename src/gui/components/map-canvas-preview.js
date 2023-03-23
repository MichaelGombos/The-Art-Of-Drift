import React, {useEffect, useRef} from "react"
import { maps} from  "../../game/map-data.js"
import { drawCanvasMap } from '../../game/graphics.js';

import { decompressMapData } from '../../game/map-compression.js';


const MapCanvasPreview = ({width, mapIndex , isTiny = false, communityMapData}) => {
  const mapPreviewRef = useRef('null')
  
  useEffect(() => {
    console.log("DATA",communityMapData)
    let decompressedMap;
    if(communityMapData){
      decompressedMap = decompressMapData(communityMapData)
    }
    else{
      decompressedMap = decompressMapData(maps[mapIndex].data)
    }


    const mapPreviewCanvas = mapPreviewRef.current;
    
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = decompressedMap[0].length;
    mapPreviewCanvas.height = decompressedMap.length;
    drawCanvasMap(mapPreviewContext, decompressedMap)
    console.log("but do I finish drawing???",decompressedMap)
    
  })

  return(
    <div className={`map-preview-container ${width} `}>
      <canvas ref={mapPreviewRef} className={`map-preview ${isTiny ? "map-preview--sm" : ""}`}></canvas>
    </div>
  )
}

export default MapCanvasPreview;