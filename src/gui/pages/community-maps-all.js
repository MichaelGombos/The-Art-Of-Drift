import React, {useState,useEffect} from 'react';

import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { getAllMaps, getCurrentAuthMaps, logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';
import RaceCommunityMapButton from '../components/race-community-map-button.js';
import { make2DArray } from '../helpers/util.js';


const CommunityMapsAll = ({showAll}) => {
  const [TwoDimensionalMapList, set2DMapList] = useState([[]]) //not perfect because 2 layers of nesting breaks 2d navigation system atm. 

useEffect(() => {
  if(showAll){
    getAllMaps().then(result => {

      const filteredResult = (result.filter(cMap => {

        return cMap.isDraft == false;
      })
      )
      
      set2DMapList(make2DArray(filteredResult.reverse(),3))

    })
  }
  else{
    getCurrentAuthMaps().then(result => {
      
    set2DMapList(make2DArray(result.reverse(),3))
    })
  }

},[])

// return(
//   <div key={mapInformation.mapID} className='community-map-all__item'>
//     <div className="map-item__header">
//       {showAll ? <h2 className="f-p2"><span className="text-secondary-500">Author:</span> {mapInformation.authorProfileObject.displayName}</h2> : "" }
//       <p><span className="text-secondary-500">Name:</span> {mapInformation.mapName}</p>
//       {!showAll ? <h2 className="f-p2"><span className="text-secondary-500">Visibility:</span> {mapInformation.isDraft ? "Draft" : "Public"}</h2> : "" }
//       <p className='text-grey-100'>{mapInformation.createdAt.toDate().toString()}</p>
//     </div>
//     <div className="map-item__navigation">
//     <RaceCommunityMapButton mapInfo = {mapInformation}/>
//     <Button clickHandler={(() => navigate(`/community-maps/${mapInformation.mapID}/`))}>view</Button>
//     </div>
//   </div>
// )
  const navigate = useNavigate();
  return (
    <div className="vertical-navigation-menu dark-background">
      <div className="vertical-navigation-menu menu-container">
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center">
          <h1 className="f-h1">{showAll ? "Community Maps List" : "Your Community Maps" }</h1>
          <div className="vertical-navigation-menu settings-wrapper col-6 align-center gap-md">
            <Button clickHandler={( () => navigate("/community-maps"))}>Back</Button>

            <div className={`vertical-navigation-menu ${!showAll ? "community-map-grid--2" : ""} scroll-container col-6 align-center gap-md `}>
            {TwoDimensionalMapList ? TwoDimensionalMapList.map(mapRow => {
                return(
                  <div className="horizantal-navigation-menu row">
                  {mapRow.map(mapInformation => {
                      return(
                      <div key={mapInformation.mapID} className='vertical-navigation-menu community-map-all__item'>
                        <div className="map-item__header">
                          {showAll ? <h2 className="f-p2"><span className="text-secondary-500">Author:</span> {mapInformation.authorProfileObject.displayName}</h2> : "" }
                          <p><span className="text-secondary-500">Name:</span> {mapInformation.mapName}</p>
                          {!showAll ? <h2 className="f-p2"><span className="text-secondary-500">Visibility:</span> {mapInformation.isDraft ? "Draft" : "Public"}</h2> : "" }
                          <p className='text-grey-100'>{mapInformation.createdAt.toDate().toString()}</p>
                        </div>
                        <div className="vertical-navigation-menu map-item__navigation">
                        <RaceCommunityMapButton mapInfo = {mapInformation}/>
                        <Button clickHandler={(() => navigate(`/community-maps/${mapInformation.mapID}/`))}>view</Button>
                        </div>
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

export default CommunityMapsAll;