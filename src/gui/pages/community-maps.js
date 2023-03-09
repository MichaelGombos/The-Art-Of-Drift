import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
console.log("anything?")

const CommunityMaps = () => {
  const navigate = useNavigate();
  console.log("fuck you.")
  return (
    <div className='menu-container'>
        <div className='col-2 gap-xl align-center'>
          <h1 className="f-h2">Community <span className="text-secondary-500">Maps</span></h1>
          <div className="signup-footer col-6 gap-md">
            <Button style="primary" clickHandler={() => navigate("/community-maps/list")}>Community Map list</Button>
            <Button  clickHandler={() => navigate("/community-maps/create")}>create map</Button>
            <Button  clickHandler={() => navigate("/community-maps/view")}>view your maps</Button>
            <Button  clickHandler={() => navigate("/community-maps/upload")}>upload map</Button>
            <Button  clickHandler={() => navigate("/main")}>back</Button>
          </div>
        </div>
    </div>
  )
}

export default CommunityMaps;