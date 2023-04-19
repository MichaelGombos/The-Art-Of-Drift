import React from "react"
import Button from "./button.js";
           
const ResetSettingsButton = ({
  setNewEnableGhost,
  setNewParticleLimit,
  setGameDataSafeteyNet,
  setNewDirectionalCamera,
  setShowFPS,
  setShowExtraStats,
  setShowDashboard,
  particleLimitSlider 
}) => {

  return (
    <Button style="danger" clickHandler={( () => {
      setNewEnableGhost(false)
      setNewParticleLimit(1000) //TODO, fix issue where slider doesn't visually update. 
      setGameDataSafeteyNet(10) 
      setNewDirectionalCamera(false)
      setShowFPS(true)
      setShowExtraStats(true)
      setShowDashboard(true)
    })}>reset to default</Button>
  )
}

export default ResetSettingsButton;