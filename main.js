const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")
const map = document.querySelector(".map");
const stats = {
   x : document.querySelector("#x"),
   y : document.querySelector("#y"),
   speed : document.querySelector("#speed"),
   angle : document.querySelector("#angle")
}
const rows = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--rows')
);
const columns = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--columns')
);

//start in the middle of the map
let x = 90;
let y = 34;
let speed = 0; //How fast the character moves in pixels per frame
let angle = 90;

const acceleration = .1;
const friction = .05;
let tireHandling = 5;
const held_directions = []; //State of which arrow keys we are holding down

const placeCharacter = () => {
   
   let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

   const gridCellSize = pixelSize * 16;
   const carSize = 32;
   // check if a direction is being held
   if (held_directions.length > 0) {
      //increase velocity and/or change direction 
      if (held_directions.includes(directions.right)) {angle += tireHandling;}
      if (held_directions.includes(directions.left)) {angle -= tireHandling;}
      if (held_directions.includes(directions.down)) {speed -= acceleration;}
      if (held_directions.includes(directions.up)) {speed += acceleration;}

      //rotate  
      characterSprite.style.transform = `rotate(${angle}deg)`;

      // console.log("speed",speed,"acceleration",acceleration, "angle",angle, "speed",speed)
   }
   
   if(speed != 0){
      //make sure we are actually moving.
      // console.log("X",x,"Y",y);
      x = x + (speed * Math.cos(angle * Math.PI/180));
      y = y + (speed * Math.sin(angle * Math.PI/180));
      
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

   switch(true) {
      case (Math.abs(speed) > 0 && Math.abs(speed)< 3):
         tireHandling = 4
         break;
      case (Math.abs(speed) > 3 && Math.abs(speed)< 5):
         tireHandling = 3
         break;
      case (Math.abs(speed) > 5 && Math.abs(speed)< 7):
         tireHandling = 2.5
         break;
      case (Math.abs(speed) > 7):
            tireHandling = 2
            break;
      default:
         break;   
   }

   //update stats
   stats.x.innerHTML = x.toFixed(2);
   stats.y.innerHTML = y.toFixed(2);
   stats.speed.innerHTML = speed.toFixed(2);
   stats.angle.innerHTML = angle.toFixed(2);

   //Limits (gives the illusion of walls)
   //set the right and bottom limit to the image size in the dom

   const leftLimit = 0;
   const rightLimit = (columns * 16) -carSize; 
   const topLimit = 0;
   const bottomLimit = (rows * 16) -carSize;
   // console.log(bottomLimit);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   const camera_left = pixelSize * 66;
   const camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



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
   console.log(held_directions);
})

document.addEventListener("keyup", (e) => {
   const dir = keys[e.which];
   const index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
   console.log(held_directions);
});