import React, {useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { decompressMapData } from "../../game/map-compression";
import { maps } from "../../game/map-data";
import Button from "../components/button";
import TextInput from "../components/input-text";

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
  console.log(mapData,data)
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

const CommunityUpload = ({previewMap, setPreviewMap}) => {
  const [newPreviewInput,setNewPreviewInput] = useState(previewMap);

  const mapMakerPreviewRef = useRef(null)
  const [newMapName,setNewMapName] = useState("")
  const [newMapDescription,setNewMapDescription] = useState("")
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    const parsedData = JSON.parse(newPreviewInput)["data"]
    generateCanvasMapColor(mapMakerPreviewRef.current,decompressMapData(parsedData))

    setPreviewMap(newPreviewInput)
  }

  const handlePublish = (isDraft) => (e) => {
    console.log("publish",isDraft,newMapName,newMapDescription,previewMap) //TODO database function
  } 

  useEffect(() => {

    generateCanvasMapColor(mapMakerPreviewRef.current,decompressMapData(JSON.parse(previewMap).data))
  },[])
  
  return (

    <div className="dark-background ">
      <div className='menu-container col-6 gap-lg'>

          <h1 className="f-h2">Upload <span className="text-secondary-500">Map</span></h1>
          <div className="row w-100 gap-md upload-map__menu">
          <div className='col-3 gap-xl align-center'>
            <div className="signup-footer col-6 gap-md">
            <TextInput id="upload-preview-data" 
            labelText="Map Data"
            placeholderText="Paste map data here"
            changeHandler={((e) => setNewPreviewInput(e))}
            min={0}
            />
              <Button clickHandler={handlePreviewClick}>Preview Map</Button>
              <TextInput id="upload-preview-data" 
                labelText="Map Name"
                placeholderText="enter name for map"
                changeHandler={((e) => setNewMapName(e))}
                min={0}
                />
                <TextInput id="upload-preview-data" 
                labelText="Map description"
                placeholderText="enter description for map"
                changeHandler={((e) => setNewMapDescription(e))}
                min={0}
                />
                <Button style={"primary"} clickHandler={handlePublish(false)}>Publish</Button>
                <Button  clickHandler={handlePublish(true)}>Save as draft</Button>
                <Button  clickHandler={() => navigate("/community-maps/")}>Exit</Button>

                <p>Dont have any map data? <Link className="link-secondary-500" to="/community-maps/map-maker">Create a map here.</Link></p>
            </div>
          </div>

          <div className='col-3 gap-xl align-center'>
            <div className="signup-footer col-6 gap-md">
            <div className='map-upload-canvas__wrapper gap-md scroll-container scroll-container--tall'>
              <canvas 
              ref={mapMakerPreviewRef}            
              className="map-upload-canvas"></canvas>
            </div>
            </div>
          </div>
          </div>

      </div>
    </div>
  )
}

export default CommunityUpload;