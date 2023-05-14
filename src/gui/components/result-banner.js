
import React, {Component, useEffect, useState} from 'react';

let resultList = []
const ResultBanner = () => {
  let [statefulResultList,setStatefulResultList] = useState([])

  const addToResultList = (isError,message) => {
    resultList.push({isError,message})
    setStatefulResultList([...resultList]);

    setInterval(() => {
      resultList.shift();
      setStatefulResultList([...resultList]);
    }, 10000)
  }

  useEffect(()=> {
  },[resultList])



  window.addResultMessage = addToResultList;
  //need to have a timer to naturally remove errors from the list slowly.
  return ""
  return (
    <div className="result-banner__container">
      {statefulResultList.map((result,index) => {
        return(
          <div className="result-banner"  key={index}>
            <p>{result.isError ? 
            <span className='text-danger-500'>error</span> : 
            <span className='text-success-500'>success</span> }</p>
            <p>Result : {result.message}</p>
          </div>
        )
      }

      )}
    </div>
  )
}

export default ResultBanner;