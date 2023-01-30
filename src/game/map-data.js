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

let allMaps = [
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
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map8,
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map9,
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map10,
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map11,
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map12,
    spawnAngle : 90,
    lapCount:5
  },
  {
    data:map13,
    spawnAngle : 90,
    lapCount:5
  }
]

let maps = allMaps.slice(0,6)

export {freeplay,test,maps};