import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';

import asyncLoaderGifURL from "../../assets/async-loader.gif"

const AsyncLoader = () => {
  const [loading,setLoading] = useState(false);
  const [fullOverlay, setFullOverlay] = useState(false); //might need to change...
  let guiLocation = useLocation();
  let loadCount = 0

  window.setAsyncLoader = (value) => {
    if(fullOverlay && value == false){ 
      setTimeout(() => {
        window.refreshDocumentTree()
        setLoading(value)
      },  500) //extra time for actions to mount to the dom.

      //TODO, function to remap the navigation controls after the actions mount to the dom.
      
    }
    else{
      setLoading(value)
    }
  }
  const loaderPageList = [

     "campaign/",
     "leaderboards/campaign/",
     "leaderboards/community",
     "leaderboards/community/",
     "community-maps/all",
     "community-maps/my-maps"
  ]

  useEffect(() => {
    const newFullOverlay = (() => {
      for(let pageURL of loaderPageList){
        if(guiLocation.pathname.includes(pageURL)){
          console.log("full overlay fr" , guiLocation.pathname, pageURL)
          return true;
        }
      }
      
      console.log("not full overlay" , guiLocation.pathname)
      return false;
    })();
    setFullOverlay(newFullOverlay)

  }, [guiLocation])

  //depending on the page. I will want to have a full overlay of the load status, and I will want to refresh the navigation tree once it is done. This may heavily impact preformance as I'm noticing that the i turn loading to true Once when I fetch, then false multiple times on every successfully completed request.

  //So I will only want to run the refreshDom function ONCE only if im going from true to false.

  return(
    <div className={`${fullOverlay ? "async-loader-cover_wrapper" : "async-loader__wrapper"} ${loading ? "async-loader__wrapper--visible" : "" }`}>
      <img src={asyncLoaderGifURL} className="async-loader__image "/>
      <p className="async-loader__text ">loading...</p>
    </div>
  )
}

export default AsyncLoader;