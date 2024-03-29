//component that shows user status if they are logged in

import React, {useState, useEffect} from "react";
import { getCurrentAuthProfile, getProfileUID } from "../helpers/databaseFacade";

import { useAuthState } from 'react-firebase-hooks/auth';

import IconButton from "./icon-button";

import { auth } from "../helpers/firebase";
import { avatarGraphicURLs, vehicleMidGraphicURLs } from '../helpers/profileGraphicUrls.js';


import detailsIconUrl from "../../assets/icons/details.png"
import { useNavigate } from "react-router-dom";

const AuthStatus = ({isGuestSession, isShown, user, loading, error}) => {
  const [nameText, setNameText] = useState("Logged Out.");
  const [profileImageUrl, setProfileImageUrl] = useState(avatarGraphicURLs[0]);
  const [vehicleImageUrl, setVehicleImageUrl] = useState(vehicleMidGraphicURLs[0]);
  const navigate = useNavigate();
  let profileLoaded = false;
  let textElement;

  useEffect(() => {
    if(loading){
      window.setAsyncLoader(true)
    }
    else if(error){
  
      setNameText("error...")
      window.setAsyncLoader(false)

    }
    else if(user){
      
      getProfileUID(user.uid).then(profile => {
      if(profile){
        setNameText(profile.displayName)
        setProfileImageUrl(avatarGraphicURLs[profile.avatarId])
        setVehicleImageUrl(vehicleMidGraphicURLs[profile.vehicleID])
        window.setAsyncLoader(false)
        Window.setProfileLoaded()
        profileLoaded = true;
      }
      else{

      }
      })
    }
    else{
      window.setAsyncLoader(false)
    }
    window.refreshDocumentTree();
    console.log("Status of Auth status", loading, error, user)
  }, [loading, error, user]) 

  setTimeout(() => {
    if(user && !profileLoaded){
      
      getProfileUID(user.uid).then(profile => {
      if(profile){
        setNameText(profile.displayName)
        setProfileImageUrl(avatarGraphicURLs[profile.avatarId])
        setVehicleImageUrl(vehicleMidGraphicURLs[profile.vehicleID])
        window.setAsyncLoader(false)
        Window.setProfileLoaded()
        profileLoaded = true;
      }
      else{
        console.log("NO Profile found yet.")
      }
      })
    }
  }, 1000)


  if(isShown){
    return (
      <div className=" vertical-navigation-menu auth-status">
        <img className="auth-status__image-car"
        src={vehicleImageUrl}/>
        <img className="auth-status__image"
        src={profileImageUrl}/>
        <p className="auth-status__name f-p3">{nameText}</p>
        <IconButton
        clickHandler={(() => navigate(isGuestSession ? "/profile/guest" : "/profile" ))}
        iconUrl = {detailsIconUrl}/>
      </div>
    )
  }
  else{
    return;
  }

}

export default AuthStatus;