import React, {useEffect, useState} from 'react'

import asyncLoaderGifURL from "../../assets/async-loader.gif"

const AsyncLoader = () => {
  const [loading,setLoading] = useState(false);

  window.setAsyncLoader = (value) => {
    setLoading(value)
  }

  return(
    <div className={`async-loader__wrapper ${loading ? "async-loader__wrapper--visible" : "" }`}>
      <img src={asyncLoaderGifURL} className="async-loader__image "/>
      <p className="async-loader__text ">loading...</p>
    </div>
  )
}

export default AsyncLoader;