const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")
const map = document.querySelector(".map");
const stats = {
   x : document.querySelector("#x"),
   y : document.querySelector("#y"),
   speed : document.querySelector("#speed"),
   angle : {
      moving:document.querySelector("#moving"),
      facing:document.querySelector("#facing")
   },
   driftForce : document.querySelector("#drift-force"),
   particleCount : document.querySelector("#particle-count")
}
const rows = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--rows')
);
const columns = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--columns')
);
const cellMultiplier = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--cell-muliplier')
);

const carSize = 32;
const acceleration = .1;
const friction = .05;

//start in the middle of the map
let x = ((columns * cellMultiplier) - carSize)/2;
let y = ((rows * cellMultiplier) - carSize)/2;;
let speed = 0; 
let angle = {
   moving: 90,
   facing: 90,
}

let tireGrip = 3;
let turningSpeed = 5;
let driftForce = 0;
let particles = [];
const held_directions = []; //State of which arrow keys we are holding down

const createDriftParticle = (x,y,driftForce) => {
      let particle = {
         x : x,
         y : y,
         size : driftForce*20,
         element : document.createElement("div"),
      }
      particle.element.classList.add("particle");
      particle.element.style.width = particle.size;
      particle.element.style.height = particle.size;

      // skidMark vs cloud
      if(driftForce > -2.5 && driftForce < 2.5){
         particle.element.classList.add("skid-mark");
      }
      else if(driftForce <= -2.5 || driftForce >= 2.5){
         particle.element.classList.add("cloud");
      }
      particles.push(particle);
      map.appendChild(particle.element)
}

const placeParticles = (particles) => {

}
const placeCharacter = () => {
   
   //update stats
   stats.x.innerHTML = x.toFixed(2);
   stats.y.innerHTML = y.toFixed(2);
   stats.speed.innerHTML = speed.toFixed(2);
   stats.angle.facing.innerHTML = angle.facing.toFixed(2);
   stats.angle.moving.innerHTML = angle.moving.toFixed(2);
   stats.driftForce.innerHTML = driftForce.toFixed(2);
   stats.particleCount.innerHTML = particles.length;

   let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

   const gridCellSize = pixelSize * cellMultiplier;

   // check if a direction is being held
   if (held_directions.length > 0) {
      //turn
      if(speed != 0){
         if (held_directions.includes(directions.right)) {
            if(driftForce < 6){
               driftForce += .1;
            }
            
            angle.facing += turningSpeed;
            angle.moving += turningSpeed - driftForce;
            if(angle.facing > 360){
               angle.facing = angle.facing - 360;
            }
            if(angle.moving > 360){
               angle.moving = angle.moving - 360;
            }
         }
         else if (held_directions.includes(directions.left)) {
            if(driftForce > -6){
               driftForce -= .1;
            }
            angle.facing -= turningSpeed;
            angle.moving -= turningSpeed + driftForce;
            if(angle.facing < 0){
               angle.facing = angle.facing + 360;
            }
            if(angle.moving < 0){
               angle.moving = angle.moving + 360;
            }
         }
         characterSprite.style.transform = `rotate(${angle.facing}deg)`;
      }

      if (held_directions.includes(directions.down)) {speed -= acceleration*1.2;}
      if (held_directions.includes(directions.up)) {speed += acceleration;}

      // console.log("speed",speed,"acceleration",acceleration, "angle",angle, "speed",speed)
   }
   if(driftForce <= .05 && driftForce >= -.05){
      driftForce = 0;
   }
   else if(driftForce > .05){

      driftForce -= .05;
   }
   else if(driftForce < -.05){
      driftForce += .05;
   }
   if(driftForce > 1.5 || driftForce < -1.5){


      const particleX = x - ((2*speed) * Math.cos(angle.moving * Math.PI/180));
      const particleY = y - ((2*speed) * Math.sin(angle.moving * Math.PI/180));
      createDriftParticle(particleX,particleY,driftForce);
   }
   // if(angle.facing - angle.moving <= tireGrip){
   //    angle.facing = angle.moving;
   // }
   if(Math.abs(angle.moving - angle.facing) < tireGrip ){
      angle.moving = angle.facing;
   }
   if(angle.moving > angle.facing){
      angle.moving -= tireGrip;
   }
   if(angle.moving < angle.facing){
      angle.moving += tireGrip;
   }
   
   if(speed != 0){
      //make sure we are actually moving.
      // console.log("X",x,"Y",y);
      x = x + (speed * Math.cos(angle.moving * Math.PI/180));
      y = y + (speed * Math.sin(angle.moving * Math.PI/180));
      
      if(Math.abs(speed) < 0.05){
         speed = 0;
      }
      else if(speed > 0){
         speed = speed - friction;
      }
      else if(speed < 0){
         speed = speed + friction;
      }

   }

   // switch(true) { TODO drift rate.
   //    case (Math.abs(speed) > 0 && Math.abs(speed)< .5):
   //       turningSpeed = 5
   //       break;
   //    case (Math.abs(speed) > .5 && Math.abs(speed)< 1):
   //       turningSpeed = 4.5
   //       break;
   //    case (Math.abs(speed) > 1 && Math.abs(speed)< 4):
   //       turningSpeed = 4
   //       break;
   //    case (Math.abs(speed) > 4 && Math.abs(speed)< 5):
   //       turningSpeed = 3.5
   //       break;
   //    case (Math.abs(speed) > 5 && Math.abs(speed)< 7):
   //       turningSpeed = 3
   //       break;
   //    case (Math.abs(speed) > 7):
   //       turningSpeed = 2.5
   //       break;
   //    default:
   //       break;   
   // }



   //Limits (gives the illusion of walls)
   //set the right and bottom limit to the image size in the dom

   const leftLimit = 0;
   const rightLimit = (columns * cellMultiplier) -carSize; 
   const topLimit = 0;
   const bottomLimit = (rows * cellMultiplier) -carSize;
   // console.log(bottomLimit);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   const camera_left = pixelSize * 66;
   const camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;

   //place particles
   for(particle of particles){
      particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px, 0 `; 
   }

   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`; 
   

}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step();



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   const dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   const dir = keys[e.which];
   const index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});