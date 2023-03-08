import React from 'react';

import Button from "../components/button.js"
import TextInput from '../components/text-input.js';
import IconButton from '../components/icon-button.js';

import previousIconUrl from "../../assets/icons/previous.png"
import nextIconUrl from "../../assets/icons/next.png"

import avatarUrl1 from "../../assets/profile-avatars/portrait-no-border1.png";
import avatarUrl2 from "../../assets/profile-avatars/portrait-no-border2.png";
import avatarUrl3 from "../../assets/profile-avatars/portrait-no-border3.png";
import avatarUrl4 from "../../assets/profile-avatars/portrait-no-border4.png";
import avatarUrl5 from "../../assets/profile-avatars/portrait-no-border5.png";

import vehicleUrl1 from "../../assets/profile-vehicles/hatchback-1.png"
import vehicleUrl2 from "../../assets/profile-vehicles/jeep-1.png"
import vehicleUrl3 from "../../assets/profile-vehicles/sedan-1-1.png"
import vehicleUrl4 from "../../assets/profile-vehicles/taxi-1-1.png"
import vehicleUrl5 from "../../assets/profile-vehicles/van-1-1.png"

const ProfileSelect = ({profileAvatarId, setProfileAvatarId,profileVehicleId, setProfileVehicleId}) => {

  return (
    <div className='profile-select col-6 gap-xl'>
        <div className="col-6 align-center gap-md">
          <p className="f-p3">choose your avatar</p>
          <div className='profile-scroller row align-center'>
              <IconButton clickHandler = {1} iconUrl = {previousIconUrl}/>
              <img class="profile-scroller__image profile-scroller__image--avatar" src={avatarUrl1}></img>
              <IconButton clickHandler = {1} iconUrl = {nextIconUrl}/>
            </div>
          </div>


        <div className="col-6 align-center gap-md">
          <p className="f-p3">select a vehicle</p>
          <div className='profile-scroller row align-center'>
            <IconButton clickHandler = {1} iconUrl = {previousIconUrl}/>
            <img class="profile-scroller__image" src={vehicleUrl1}></img>
            <IconButton clickHandler = {1} iconUrl = {nextIconUrl}/>
          </div>
        </div>
    </div>
  )
}

export default ProfileSelect;