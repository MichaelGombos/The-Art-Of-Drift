import {map} from "./elements.js"

let particles = [];
let particleLimit = 10;
//graphics 
const createDriftParticle = (x, y, driftForce, angle) => {
  let particle = {
      x: x,
      y: y,
      size: driftForce * 10,
      element: document.createElement("div"),
      angle: null
  }

  // skidMark vs cloud
  if (driftForce < 2) {
      particle.angle = angle.facing;
      particle.element.classList.add("skid-mark");
  } else if (driftForce >= 2) {
      particle.x = x + Math.floor(Math.random() * 10) - 5;
      particle.y = y + Math.floor(Math.random() * 10) - 5;
      particle.size = driftForce * 15;
      particle.angle = angle.moving + Math.floor(Math.random() * 50) - 25;
      particle.element.classList.add("cloud");
  }

  particle.element.classList.add("particle");
  particle.element.style.width = particle.size;
  particle.element.style.height = particle.size;

  particles.push(particle);

  let index = particles.length - 1;
  map.appendChild(particle.element)


}

const createDirtParticle = (x, y) => {
  let particle = {
      x: x + Math.floor(Math.random() * 20) - 10,
      y: y + Math.floor(Math.random() * 20) - 10,
      size: 40,
      element: document.createElement("div"),
      angle: Math.floor(Math.random() * 359)
  }
  particle.element.classList.add("particle");
  particle.element.style.width = particle.size;
  particle.element.style.height = particle.size;

  particle.element.classList.add("dirt");

  particles.push(particle);
  map.appendChild(particle.element)
}
const displayDriftParticles = (x,y ,driftForce, onDirt,angle) => {
  if (driftForce > 1.5 && !onDirt) {
      const particleX = x - ((10) * Math.cos(angle.moving * Math.PI / 180));
      const particleY = y - ((10) * Math.sin(angle.moving * Math.PI / 180));
      createDriftParticle(particleX, particleY, driftForce, angle);
  }

  //delete drift particle if more than 100

      if (particles.length > particleLimit) {
          if (particles[particleLimit] && particles[particleLimit-1]) {
              particles[0].element.remove();
              particles[0].element.remove();
              particles.shift();
              particles.shift();
          }
      }
  

}

const setParticleLimit = (limit) => {
    particleLimit = limit;
}
const getParticleLimit = () => {
    return particleLimit;
}

export {createDirtParticle, createDriftParticle,displayDriftParticles,setParticleLimit,getParticleLimit, particles}