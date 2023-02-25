import React from "react";

const ToggleDirectionalCameraButton = ({setDirectionalCamera,directionalCamera}) => {
  return (
    <button className={directionalCamera ? "set" : ""} onClick={() =>setDirectionalCamera(!directionalCamera)}>{directionalCamera ? "Disable direction based camera" : "Enable direction based camera"}</button>
  )
}

export default ToggleDirectionalCameraButton;