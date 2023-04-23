import React from 'react';

import Button from "../components/button.js"
import TextInput from './input-text.js';
import IconButton from '../components/icon-button.js';

import previousIconUrl from "../../assets/icons/previous.png"
import nextIconUrl from "../../assets/icons/next.png"

import { avatarGraphicURLs, vehicleGraphicURLs } from '../helpers/profileGraphicUrls.js';

const ProfileSelect = ({viewOnly, profileAvatarId, setProfileAvatarId,profileVehicleId, setProfileVehicleId}) => {


  const updateID = (setter, currentIndex, direction, source ) => {
    const max = source.length-1;
    let newIndex = currentIndex + direction;

    if(newIndex > max){
      setter(0);
    }
    else if(newIndex < 0){
      setter(max);
    }
    else{
      setter(newIndex);
    }
  }

  return (
    <div className='vertical-navigation-menu profile-select col-6 gap-xl'>
        <div className="vertical-navigation-menu col-6 align-center gap-md">
          <p className="f-p3">{!viewOnly ? <span className="text-secondary-500">Select an</span> : "your"} avatar</p>
          <div className={`horizantal-navigation-menu profile-scroller row align-center ${viewOnly ? "profile-scroller--view-only" : ""}`}>
              <IconButton clickHandler = {() => (updateID(
                setProfileAvatarId,
                profileAvatarId,
                -1,
                avatarGraphicURLs
              ))} iconUrl = {previousIconUrl}/>
              <img class="profile-scroller__image profile-scroller__image--avatar" src={avatarGraphicURLs[profileAvatarId]}></img>
              <IconButton clickHandler = {() => (updateID(
                setProfileAvatarId,
                profileAvatarId,
                1,
                avatarGraphicURLs
              ))} iconUrl = {nextIconUrl}/>
            </div>
          </div>


        <div className="vertical-navigation-menu col-6 align-center gap-md">
          <p className="f-p3">{!viewOnly ? <span className="text-secondary-500">choose </span> : ""}your vehicle</p>
          <div className={`horizantal-navigation-menu profile-scroller row align-center ${viewOnly ? "profile-scroller--view-only" : ""}`}>
          <IconButton clickHandler = {() => (updateID(
                setProfileVehicleId,
                profileVehicleId,
                -1,
                vehicleGraphicURLs
              ))} iconUrl = {previousIconUrl}/>
              <img class="profile-scroller__image" src={vehicleGraphicURLs[profileVehicleId]}></img>
              <IconButton clickHandler = {() => (updateID(
                setProfileVehicleId,
                profileVehicleId,
                1,
                vehicleGraphicURLs
              ))} iconUrl = {nextIconUrl}/>
          </div>
        </div>
    </div>
  )
}

export default ProfileSelect;