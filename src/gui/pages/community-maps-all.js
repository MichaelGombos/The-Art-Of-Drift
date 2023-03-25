import React, {useState,useEffect} from 'react';

import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { getAllMaps, getCurrentAuthMaps, logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';
import RaceCommunityMapButton from '../components/race-community-map-button.js';


const CommunityMapsAll = ({showAll}) => {
  const [mapList, setMapList] = useState([])
useEffect(() => {
  if(showAll){
    getAllMaps().then(result => {
      setMapList(result)
    })
  }
  else{
    getCurrentAuthMaps().then(result => {
      setMapList(result)
    })
  }

},[])

  
  const navigate = useNavigate();
  return (
    <div className="dark-background">
      <div className="menu-container">
        <div className="options-menu col-6 gap-lg align-center">
          <h1 className="f-h1">{showAll ? "Community Maps List" : "Your Community Maps" }</h1>
          <div className="settings-wrapper col-6 align-center gap-md">
            <Button clickHandler={( () => navigate("/community-maps"))}>Back</Button>

            <div className={`community-map-grid ${!showAll ? "community-map-grid--2" : ""} scroll-container col-6 align-center gap-md `}>
              {mapList ? mapList.map(mapInformation => {
                return(
                  <div key={mapInformation.mapID} className='community-map-all__item'>
                    <div className="map-item__header">
                      {showAll ? <h2 className="f-p2"><span className="text-secondary-500">Author:</span> {mapInformation.authorProfileObject.displayName}</h2> : "" }
                      <p><span className="text-secondary-500">Name:</span> {mapInformation.mapName}</p>
                      <p className='text-grey-100'>{mapInformation.createdAt.toDate().toString()}</p>
                    </div>
                    <div className="map-item__navigation">
                    <RaceCommunityMapButton mapInfo = {mapInformation}/>
                    <Button clickHandler={(() => navigate(`/community-maps/${mapInformation.mapID}/`))}>view</Button>
                    </div>
                  </div>
                )

              }) : <p>loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default CommunityMapsAll;