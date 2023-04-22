import React, {useState,useEffect} from 'react';

import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { getAllMaps, getCurrentAuthMaps, logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';
import RaceCommunityMapButton from '../components/race-community-map-button.js';
import { make2DArray } from '../helpers/util.js';


const CommunityMapsLeaderboards = () => {
  const [TwoDimensionalMapList, set2DMapList] = useState([[]])//not perfect because 2 layers of nesting breaks 2d navigation system atm.
useEffect(() => {
  getAllMaps().then(result => {

    const filteredResult = (result.filter(cMap => {
      return cMap.isDraft == false;
    })
    )
    set2DMapList(make2DArray(filteredResult.reverse(),3))
  })



},[])

  //need to programmatically split the array received from the database into a list of seperate arrays that have a length with a max of 3.

  //this will allow me to visually create a list of rows, with 3 columns that each hold a community map.

  //I will need this same logic on community maps-all, and 
  const navigate = useNavigate();
  return (
    <div className="vertical-navigation-menu dark-background">
      <div className="vertical-navigation-menu menu-container">
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center">
          <h1 className="f-h1">Community Maps Leaderboards</h1>
          <div className="vertical-navigation-menu settings-wrapper col-6 align-center gap-md">
            <Button clickHandler={( () => navigate("/community-maps"))}>Back</Button>

            <div className={`vertical-navigation-menu scroll-container col-6 align-center gap-md `}>
              {TwoDimensionalMapList ? TwoDimensionalMapList.map(mapRow => {
                return(
                  <div className="horizantal-navigation-menu row">
                  {mapRow.map(mapInformation => {
                      return(
                        <div key={mapInformation.mapID} className='vertical-navigation-menu community-map-all__item'>
                          <div className="map-item__header">
                            <h2 className="f-p2"><span className="text-secondary-500">Author:</span> {mapInformation.authorProfileObject.displayName}</h2> 
                            <p><span className="text-secondary-500">Name:</span> {mapInformation.mapName}</p>
                            <h2 className="f-p2"><span className="text-secondary-500">Visibility:</span> {mapInformation.isDraft ? "Draft" : "Public"}</h2> 
                            <p className='text-grey-100'>{mapInformation.createdAt.toDate().toString()}</p>
                          </div>
                          <Button clickHandler={(() => navigate(`/community-maps/leaderboard/${mapInformation.mapID}/`))}>leaderboard</Button>
                        </div>
                      )
                  })}
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