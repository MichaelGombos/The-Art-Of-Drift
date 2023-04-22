import React, {useState, useRef, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { decompressMapData } from "../../game/map-compression";
import Button from "../components/button";
import TextInput from "../components/input-text";
import { addMap, deleteMap, getDatabaseTime, getMap } from "../helpers/databaseFacade";
import { auth } from "../helpers/firebase";

import { avatarGraphicURLs } from "../helpers/profileGraphicUrls";
import generateCanvasMapColor from "../helpers/canvasGenerator";
import { setEnableGhost, setGameMapIndex, setMapData, setSpectateMode } from "../../game/game";
import { startGame } from "../../game/main";
import { nameGhost } from "../../game/graphics";

const toHHMMSS = (number) => {
  var sec_num = parseInt(number, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

const MapInfoNode = ({label,text,subText,imageSource}) => {
  return(
    <div className="map-info-node">
      <p className="map-info-node__label f-p2">{label}</p>
      {imageSource ? <img className="map-info-node__image" src={imageSource}/> : ""}
      <div className="map-info-node__footer">
        <p className="map-info-node__text f-p3">{text}<br/>
          <span className="map-info-node__subtext f-p3">{subText}</span>
        </p>
      </div>
    </div>
  )
}

const CommunityMapsPreview = () => {
  const navigate = useNavigate();
  const {mapId} = useParams()
  console.log(mapId)
  const mapMakerPreviewRef = useRef('null')
  const [mapInformation,setMapInformation] = useState({
    mapName:"loading...",
    mapDescription:"loading...",
    mapCreatedTime:"loading...",
    isDraft:"loading...",
    totalPlays: "loading...",
    mapObject:"loading uwu..."
  })
  const [authorInformation,setAuthorInformation] = useState({
    authorName:"loading...",
    authorID:"loading...",
    authorAvatarID:0
  })


    //then navigate to view the map you just uploaded
  
  const handlePlayCommunityMap = () => {
    setEnableGhost(false);
    setGameMapIndex(mapId);
    setMapData(JSON.parse(mapInformation.mapObject),[[]])
    setSpectateMode(false);
    startGame()
    nameGhost("chungus");
    navigate("/countdown");
  }

  const handleDeleteMap = () => {
    deleteMap(mapId).then(()=> {
      navigate("/community-maps/")
    })
  }

  useEffect(() => {

    // generateCanvasMapColor(mapMakerPreviewRef.current,decompressMapData(JSON.parse(previewMap).data))

    getMap(mapId).then(dataBaseMap => {
      console.log("data attempt",mapId, dataBaseMap)
      generateCanvasMapColor(mapMakerPreviewRef.current,decompressMapData(JSON.parse(dataBaseMap.mapObject).data))
      setMapInformation({
        mapName:dataBaseMap.mapName,
        mapID : mapId,
        mapDescription: dataBaseMap.mapDescription,
        mapCreatedTime: dataBaseMap.createdAt.toDate().toString(),
        isDraft: dataBaseMap.isDraft,
        totalPlays: dataBaseMap.plays,
        mapObject: dataBaseMap.mapObject
      })

      setAuthorInformation({
        authorName: dataBaseMap.authorProfileObject.displayName,
        authorID: dataBaseMap.creatorUID,
        authorAvatarID: dataBaseMap.authorProfileObject.avatarId
      })
    })
  },[])
  


  return (

    <div className={`vertical-navigation-menu dark-background  ${mapInformation.isDraft ? "dark-background--saturated" : "" }`}>
      <div className='vertical-navigation-menu menu-container col-6 gap-lg'>

          <h1 className="f-h2"><span className="text-secondary-500">{mapInformation.isDraft ? "Draft" : "Public "} </span> Community Map</h1>
          <p className="f-p2">" {mapInformation.mapName} "</p>
          <div className="horizantal-navigation-menu row w-100 gap-md upload-map__menu">
          <div className='vertical-navigation-menu col-3 gap-xl align-center'>
            <div className="vertical-navigation-menu signup-footer col-6 gap-md">
                <div className="map-info-nodes">
                  <MapInfoNode
                  imageSource={avatarGraphicURLs[authorInformation.authorAvatarID]}
                  label={"creator"}
                  text={authorInformation.authorName}
                  subText={authorInformation.authorID}
                  />
                  <MapInfoNode
                  label={"map name"}
                  text={mapInformation.mapName}
                  subText={mapInformation.mapID}
                  />
                  <MapInfoNode
                  label={"Description"}
                  text={mapInformation.mapDescription}
                  />
                  <MapInfoNode
                  label={"Created date"}
                  text={mapInformation.mapCreatedTime}
                  />
                  <MapInfoNode
                  label={"plays"}
                  text={mapInformation.totalPlays}
                  />
                </div>
                <Button style={"primary"} clickHandler={handlePlayCommunityMap}>Play</Button>
                <Button  clickHandler={() => navigate(`/community-maps/leaderboard/${mapId}`)}>view leaderboard</Button>
                <Button  clickHandler={() => navigate(`/community-maps/clone/${mapId}`)}>Clone map</Button>
                <Button  clickHandler={() => navigate(`/community-maps/edit/${mapId}`)}>Edit map</Button>
                <Button style="danger" clickHandler={handleDeleteMap}>Delete map</Button>
                <Button clickHandler={(() => {navigate("/community-maps")})}>Exit</Button>
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

export default CommunityMapsPreview;