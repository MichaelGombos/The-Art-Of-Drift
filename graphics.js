import {map} from "./main.js"

let particles = [];

//graphics 
const createDriftParticle = (x, y, driftForce, angle) => {
  let particle = {
      x: x,
      y: y,
      size: driftForce * 10,
      element: document.createElement("div"),
      angle: null
  }
  particle.element.classList.add("particle");
  particle.element.style.width = particle.size;
  particle.element.style.height = particle.size;

  // skidMark vs cloud
  if (driftForce < 2) {
      particle.angle = angle.facing;
      particle.element.classList.add("skid-mark");
  } else if (driftForce >= 2) {
      particle.angle = angle.moving + Math.floor(Math.random() * 50) - 25;
      particle.element.classList.add("cloud");
  }
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

  // skidMark vs cloud
  particle.element.classList.add("dirt");

  particles.push(particle);
  map.appendChild(particle.element)
}
const displayDriftParticles = (driftForce, onDirt,angle) => {
  if (driftForce > 1.5 && !onDirt) {
      const particleX = x - ((10) * Math.cos(angle.moving * Math.PI / 180));
      const particleY = y - ((10) * Math.sin(angle.moving * Math.PI / 180));
      createDriftParticle(particleX, particleY, driftForce, angle);
  }

  //delete drift particle if more than 100

  setTimeout(() => {
      if (particles.length > 500) {
          if (particles[500]) {
              particles[0].element.remove();
              particles.shift();
          }
      }
  }, 1000)

}


export {createDirtParticle, createDriftParticle,displayDriftParticles,particles}