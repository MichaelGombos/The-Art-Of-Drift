import React, {useState,useEffect} from 'react';

import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { getAllMaps, getCurrentAuthMaps, logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';
import RaceCommunityMapButton from '../components/race-community-map-button.js';


const CommunityMapsLeaderboards = () => {
  const [mapList, setMapList] = useState([])
useEffect(() => {
  getAllMaps().then(result => {

    const filteredResult = (result.filter(cMap => {

      return cMap.isDraft == false;
    })
    )
    setMapList(filteredResult)

  })

},[])

  
  const navigate = useNavigate();
  return (
    <div className="dark-background">
      <div className="menu-container">
        <div className="options-menu col-6 gap-lg align-center">
          <h1 className="f-h1">Community Maps Leaderboards</h1>
          <div className="settings-wrapper col-6 align-center gap-md">
            <Button clickHandler={( () => navigate("/community-maps"))}>Back</Button>

            <div className={`community-map-grid scroll-container col-6 align-center gap-md `}>
              {mapList ? mapList.map(mapInformation => {
                return(
                  <div key={mapInformation.mapID} className='community-map-all__item'>
                    <div className="map-item__header">
                      <h2 className="f-p2"><span className="text-secondary-500">Author:</span> {mapInformation.authorProfileObject.displayName}</h2> 
                      <p><span className="text-secondary-500">Name:</span> {mapInformation.mapName}</p>
                      <h2 className="f-p2"><span className="text-secondary-500">Visibility:</span> {mapInformation.isDraft ? "Draft" : "Public"}</h2> 
                      <p className='text-grey-100'>{mapInformation.createdAt.toDate().toString()}</p>
                    </div>
                    <div className="map-item__navigation">
                    <Button clickHandler={(() => navigate(`/community-maps/leaderboard/${mapInformation.mapID}/`))}>leaderboard</Button>
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

export default CommunityMapsLeaderboards;