import React, {useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { decompressMapData } from "../../game/map-compression";
import Button from "../components/button";
import TextInput from "../components/input-text";
import { addMap, getDatabaseTime } from "../helpers/databaseFacade";
import { auth } from "../helpers/firebase";

import generateCanvasMapColor from "../helpers/canvasGenerator";

const CommunityMapsUpload = ({previewMap, setPreviewMap}) => {
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
    addMap({
      creatorUID: auth.currentUser.uid,
      mapName : newMapName,
      mapDescription: newMapDescription,
      mapObject: previewMap,
      authorProfileObject: {
  
        testProperty: "test"
      },
      plays:0,
      isDraft: isDraft,
      createdAt: getDatabaseTime()
    },true)

    //then navigate to view the map you just uploaded
  } 

  useEffect(() => {

    generateCanvasMapColor(mapMakerPreviewRef.current,decompressMapData(JSON.parse(previewMap).data))
  },[])
  
  return (

    <div className="vertical-navigation-menu dark-background ">
      <div className='vertical-navigation-menu menu-container col-6 gap-lg'>

          <h1 className="f-h2">Upload <span className="text-secondary-500">Map</span></h1>
          <div className="horizantal-navigation-menu row w-100 gap-md upload-map__menu">
          <div className='vertical-navigation-menu col-3 gap-xl align-center'>
            <div className="vertical-navigation-menu signup-footer col-6 gap-md">
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
                min={3}
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

          <div className=' col-3 gap-xl align-center'>
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

export default CommunityMapsUpload;