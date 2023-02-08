import mapfreeplay from "./maps/freeplay.js"
import maptest from "./maps/test.js"
import map1 from "./maps/map1.js"
import map2 from "./maps/map2.js"
import map3 from "./maps/map3.js"
import map4 from "./maps/map4.js"
import map5 from "./maps/map5.js"
import map6 from "./maps/map6.js"
import map7 from "./maps/map7.js"
import map8 from "./maps/map8.js"
import map9 from "./maps/map9.js"
import map10 from "./maps/map10.js"
import map11 from "./maps/map11.js"
import map12 from "./maps/map12.js"
import map13 from "./maps/map13.js"

let freeplay =
  {
    data: mapfreeplay,
    spawnAngle : 0,
    lapCount:4,
  }

let test =
  {
    data: maptest,
    spawnAngle : 90,
    lapCount:4,
  }

let maps = [
  {
    data: map1,
    spawnAngle : 335,
    lapCount:4,
  },
  {
    data:map2,
    spawnAngle : 295,
    lapCount:3
  }
  ,
  {
    data:map3,
    spawnAngle : 305,
    lapCount:2
  },
  {
    data:map4,
    spawnAngle : 290,
    lapCount:3
  },
  {
    data:map5,
    spawnAngle : 330,
    lapCount:3
  },
  {
    data:map6,
    spawnAngle : 270,
    lapCount:5
  },
  {
    data:map7,
    spawnAngle : 22,
    lapCount:5
  },
  {
    data:map8,
    spawnAngle : 270,
    lapCount:5
  },
  {
    data:map9,
    spawnAngle : 270,
    lapCount:5
  },
  {
    data:map10,
    spawnAngle : 315,
    lapCount:5
  },
  {
    data:map11,
    spawnAngle : 138,
    lapCount:5
  },
  {
    data:map12,
    spawnAngle : 270,
    lapCount:5
  },
  {
    data:map13,
    spawnAngle : 0,
    lapCount:4
  }
]

const mapNames = [
  "laying TRACKS",
  "staging CARS",
  "ADRIFT by strategem",
  "Tactical DRIFT positions",
  "HORSEpower",
  "Slipline & SPEED",
  "Manouvering",
  "v-eight nation TACTICS",
  "The RALLEY in march",
  "Hydroplane",
  "the nine NON-FIRST places",
  "The ATTACK by tire",
  "The speeds of HIGH"
]

export {freeplay,test,maps, mapNames};