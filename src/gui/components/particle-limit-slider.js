import React from "react"

const ParticleLimitSlider = ({newParticleLimit,setNewParticleLimit}) => {
  return (
    <div className='particle-limit'>
    <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
    <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
  </div>
  )
}

export default ParticleLimitSlider;