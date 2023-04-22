import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/button';






const Leaderboards = () => { 
  const navigate = useNavigate();
  return(
    <div className='vertical-navigation-menu menu-container'>
      <div className='vertical-navigation-menu campaign-menu col-6 gap-md'>
        <div className='campaign-menu__header col-6 align-center gap-md'>
          <h1 className='f-h1'>Leaderboards</h1>
        </div>
        <Button style="light" clickHandler={() => navigate(`/leaderboards/campaign`)}>campaign leaderboards
        </Button>
        <Button style="light" clickHandler={() => navigate(`/leaderboards/community`)}>community leaderboards
        </Button>
        <Button style="light" clickHandler={() => navigate(`/main`)}>back
        </Button>
      </div>
    </div>
  )

}



export default Leaderboards;