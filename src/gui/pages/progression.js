import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from "../components/button.js"
import TextInput from '../components/input-text.js';

import Chart from 'chart.js/auto';
import { getMapHistory } from '../helpers/databaseFacade.js';
import { HTMLMapNames, mapNames } from '../../game/map-data.js';
import {  msToTime, trendDown } from '../helpers/util.js';

//this is for the trailer.
const generateFakeRunHistory = (start,end,count ) => {
  let runList = trendDown(start,end,count);
  return generateFakeRunHistoryFromArray(runList)
}

const generateFakeRunHistoryFromArray = (hisotryRay) => {
  let fakeDate = new Date(); // current date
  let dateOffset = 0;
  let fakeHistory = []
  for(let fakeRunSeconds of hisotryRay){
    fakeDate.setDate(fakeDate.getDate() + dateOffset++); // add a day  
    fakeHistory.push({
      time:msToTime(fakeRunSeconds), 
      timeSeconds: fakeRunSeconds,
      date: `${fakeDate.getMonth()}/${fakeDate.getDay()}/${fakeDate.getFullYear()}-${fakeDate.getHours()}:${fakeDate.getMinutes()}`
    })
  }
  return fakeHistory;
} 

const Progression = () => {
  const navigate = useNavigate()
  const params = useParams()
  const canvasRef = useRef(null)
  const [chartStatus,setChartStatus] = useState("loading...")

  console.log(params.id)

  useEffect( 
    () =>
    {
      Chart.defaults.font.size = 16;
      Chart.defaults.color = "white";
      Chart.defaults.backgroundColor = "orange";
      Chart.defaults.font.family = "NESCyrillic";

      console.log("hist again,")
      getMapHistory(params.id).then(history => {
        
        // let data = history.runsSubObject //from database
        // let data = generateFakeRunHistory(43444, 21322, 100) fake data for track 1
        // let data = generateFakeRunHistory(90421, 52461, 100) fake data for track 2
        // let data = generateFakeRunHistory(47221, 25832, 76) fake data for track 3
        // let data = generateFakeRunHistory(62133, 40297, 130) fake data for track 4
        console.log("hist again,", history)
        if(history !== undefined){
          setChartStatus("")
        }else{
          setChartStatus("no data")
        }
        new Chart(
          canvasRef.current,
          {
            type: 'bar',
            data: {
              labels: data.map(row => row.date),
              datasets: [
                {
                  label: 'Runs in miliseconds',
                  data: data.map(row => row.timeSeconds),
                  backgroundColor: "orange",
                }
              ]
            }
          }
        );
      
    }
    )
    }

    
    , []
)
  return (
    <div className='horizantal-navigation-menu menu-container col-6'> 
       <h1 className="f-p1 gap-md row">Map #{Number(params.id)+1}  <span className="f-h2" dangerouslySetInnerHTML={{__html: HTMLMapNames[params.id]}}></span>
   Run History</h1>
        <Button clickHandler={() => navigate(-1)}>
          Back
        </Button>
        <p>{chartStatus}</p>
        <canvas ref={canvasRef} id="acquisitions" className='vertical-navigation-menu col-3 gap-xl'>

        </canvas>
    </div>
  )
}

export default Progression;