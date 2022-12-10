var character = document.querySelector(".character");
var characterSprite = document.querySelector(".character_spritesheet")
var map = document.querySelector(".map");

//start in the middle of the map
let x = 90;
let y = 34;
let speed = 0; //How fast the character moves in pixels per frame
let angle = 90;

const acceleration = .05;
const friction = .3;
const held_directions = []; //State of which arrow keys we are holding down

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   // check if a direction is being held
   if (held_directions.length > 0) {
      //increase velocity and/or change direction 
      if (held_directions.includes(directions.right)) {angle += 3;}
      if (held_directions.includes(directions.left)) {angle -= 3;}
      if (held_directions.includes(directions.down)) {speed -= acceleration;}
      if (held_directions.includes(directions.up)) {speed += acceleration;}

      //rotate  
      characterSprite.style.transform = `rotate(${angle}deg)`;

      console.log("speed",speed,"acceleration",acceleration, "angle",angle, "speed",speed)
   }
   
   if(speed != 0){
      //make sure we are actually moving.

      x = x + (speed * Math.cos(angle * Math.PI/180));
      y = y + (speed * Math.sin(angle * Math.PI/180));
      // console.log("newX",x,"newY",y);
   }

   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -8 + 32;
   var bottomLimit = (16 * 7);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
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
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
   console.log(held_directions);
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
   console.log(held_directions);
});