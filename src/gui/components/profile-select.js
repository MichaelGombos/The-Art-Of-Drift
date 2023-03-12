import React from 'react';

import Button from "../components/button.js"
import TextInput from './input-text.js';
import IconButton from '../components/icon-button.js';

import previousIconUrl from "../../assets/icons/previous.png"
import nextIconUrl from "../../assets/icons/next.png"

import avatarUrl1 from "../../assets/profile-avatars/portrait-no-border1.png";
import avatarUrl2 from "../../assets/profile-avatars/portrait-no-border2.png";
import avatarUrl3 from "../../assets/profile-avatars/portrait-no-border3.png";
import avatarUrl4 from "../../assets/profile-avatars/portrait-no-border4.png";
import avatarUrl5 from "../../assets/profile-avatars/portrait-no-border5.png";


import vehicleUrl1 from "../../assets/profile-vehicles/jeep-1.png"
import vehicleUrl2 from "../../assets/profile-vehicles/hatchback-1.png"
import vehicleUrl3 from "../../assets/profile-vehicles/sedan-1-1.png"
import vehicleUrl4 from "../../assets/profile-vehicles/taxi-1-1.png"
import vehicleUrl5 from "../../assets/profile-vehicles/van-1-1.png"

const avatarGraphicURLs =[
  avatarUrl1,
  avatarUrl2,
  avatarUrl3,
  avatarUrl4,
  avatarUrl5
]

const vehicleGraphicURLs = [
  vehicleUrl1,
  vehicleUrl2,
  vehicleUrl3,
  vehicleUrl4,
  vehicleUrl5
]

const ProfileSelect = ({profileAvatarId, setProfileAvatarId,profileVehicleId, setProfileVehicleId}) => {


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
    <div className='profile-select col-6 gap-xl'>
        <div className="col-6 align-center gap-md">
          <p className="f-p3">choose your avatar</p>
          <div className='profile-scroller row align-center'>
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


        <div className="col-6 align-center gap-md">
          <p className="f-p3">select a vehicle</p>
          <div className='profile-scroller row align-center'>
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