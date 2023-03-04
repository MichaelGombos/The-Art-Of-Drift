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

let freeplay = mapfreeplay;

let test = maptest;

let maps = [map1,map2,map3,map4,map5,map6,map7,map8,map9,map10,map11,map12,map13]

/*

Map references

1 https://en.wikipedia.org/wiki/Suzuka_International_Racing_Course
2 https://en.wikipedia.org/wiki/Circuito_do_Estoril
3 https://en.wikipedia.org/wiki/Riverside_International_Raceway
4 https://en.wikipedia.org/wiki/Monza_Circuit
5 https://en.wikipedia.org/wiki/Hungaroring 
6 https://en.wikipedia.org/wiki/Brands_Hatch
7 https://en.wikipedia.org/wiki/Circuit_de_Spa-Francorchamps 
8 is custom.
9 https://en.wikipedia.org/wiki/Circuito_de_Jerez
10 https://en.wikipedia.org/wiki/Red_Bull_Ring
11 https://en.wikipedia.org/wiki/Zeltweg_Air_Base
12 https://en.wikipedia.org/wiki/Watkins_Glen_International
13 https://en.wikipedia.org/wiki/Sepang_International_Circuit
*/


const mapNames = [
  "Driving Plans",
  "staging CARS",
  "ADRIFT by strategem",
  "Tactical DRIFT positions",
  "HORSEpower",
  "Slipline & SPEED",
  "Manouvering",
  "v8 nation TACTICS",
  "The RALLEY in march",
  "Hydroplane",
  "the nicely tuned engine",
  "ATTACK by tire",
  "Use of speed"
]

const HTMLMapNames = [
  "Driving <span class='text-secondary-500'> Plans</span>",
  "Stagin <span class='text-secondary-500'>Cars</span>",
  "<span class='text-secondary-500'>Adrift</span> by strategem",
  "Tactical <span class='text-secondary-500'>Drift</span> positions",
  "<span class='text-secondary-500'>Horse</span>power",
  "Slipline & <span class='text-secondary-500'>Speed</span>",
  "Manouvering",
  "v8 nation <span class='text-secondary-500'>Tactics</span>",
  "The <span class='text-secondary-500'>rally</span> in march",
  "Hydroplane",
  "the nicely tuned <span class='text-secondary-500'>engine</span>",
  "Attack by <span class='text-secondary-500'>tire</span>",
  "Use of <span class='text-secondary-500'>speed</span>"
]

const mapDescriptions = [
  "The Suzuka International Racing Course[7] (鈴鹿国際レーシングコース, Suzuka Kokusai Rēsingu Kōsu), more famously known as the Suzuka Circuit (鈴鹿サーキット, Suzuka Sākitto), is a 5.807 km (3.608 mi) long motorsport race track located in Ino, Suzuka City, Mie Prefecture, Japan and operated by Honda Mobilityland, a subsidiary of Honda Motor Co, Ltd. It has a capacity of 155,000.",
  "this is the 2nd one.",
  "this should be the third one.."
]

export {freeplay,test,maps, mapNames,mapDescriptions, HTMLMapNames};