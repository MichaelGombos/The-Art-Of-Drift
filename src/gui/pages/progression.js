import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from "../components/button.js"
import TextInput from '../components/input-text.js';

import Chart from 'chart.js/auto';
import { getMapHistory } from '../helpers/databaseFacade.js';


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
        let data
        console.log("hist again,", history)
        if(history !== undefined){
          setChartStatus("")
          data = history.runsSubObject
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