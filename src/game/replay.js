import map1Easy from "./replays/map1/bronze/replay.js"
import map1Normal from "./replays/map1/silver/replay.js"
import map1Hard from "./replays/map1/gold/replay.js"
import map1Author from "./replays/map1/author/replay.js"

import map2Easy from "./replays/map2/bronze/replay.js"
import map2Normal from "./replays/map2/silver/replay.js"
import map2Hard from "./replays/map2/gold/replay.js"
import map2Author from "./replays/map2/author/replay.js"

import map3Easy from "./replays/map3/bronze/replay.js"
import map3Normal from "./replays/map3/silver/replay.js"
import map3Hard from "./replays/map3/gold/replay.js"
import map3Author from "./replays/map3/author/replay.js"

import map4Easy from "./replays/map4/bronze/replay.js"
import map4Normal from "./replays/map4/silver/replay.js"
import map4Hard from "./replays/map4/gold/replay.js"
import map4Author from "./replays/map4/author/replay.js"

import map5Easy from "./replays/map5/bronze/replay.js"
import map5Normal from "./replays/map5/silver/replay.js"
import map5Hard from "./replays/map5/gold/replay.js"
import map5Author from "./replays/map5/author/replay.js"

const freeplay = [[]]

const replays = [ 
{
  easy: {
    replay: map1Easy,
    time: "00:00:28"
  },
  normal: {
    replay: map1Normal,
    time: "00:00:25"
  }
  ,
  hard: {
    replay: map1Hard,
    time: "00:00:18"
  },
  author: { //TODO author replay
    replay: map1Author,
    time: "00:00:10"
  }
},
 {
  easy: {
    replay: map2Easy,
    time: "00:00:19"
  },
  normal: {
    replay: map2Normal,
    time: "00:00:16"
  },
  hard: {
    replay: map2Hard,
    time: "00:00:14"
  },
  author: {
    replay: map2Author,
    time: "00:00:10"
  }
},
{
  easy: {
    replay: map3Easy,
    time: "00:00:22"
  },
  normal: {
    replay: map3Normal,
    time: "00:00:14"
  },
  hard: {
    replay: map3Hard,
    time: "00:00:13"
  },
  author: {
    replay: map3Author,
    time: "00:00:10"
  }
},
{
  easy: {
    replay: map4Easy,
    time: "00:00:37"
  },
  normal: {
    replay: map4Normal,
    time: "00:00:25"
  },
  hard: {
    replay: map4Hard,
    time: "00:00:24"
  },
  author: {
    replay: map4Author,
    time: "00:00:10"
  }
},
 {
  easy: {
    replay: map5Easy,
    time: "00:00:34"
  },
  normal: {
    replay: map5Normal,
    time: "00:00:30"
  },
  hard: {
    replay: map5Hard,
    time: "00:00:27"
  },
  author: {
    replay: map5Author,
    time: "00:00:10"
  }
}
]

export {replays};