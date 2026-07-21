// 자동 생성 파일 — tools/gen-data.mjs 가 extract/ 데이터에서 생성. 직접 수정 금지.
import type { UnitData } from '../types';

export const UNIT_DATA: UnitData = {
 "vehicles": {
  "defender": {
   "id": "defender",
   "name": "Defender",
   "kind": "robot",
   "speed": 2,
   "energy": {
    "move": 1
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "blue": 40,
    "yellow": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.05,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     150,
     250
    ],
    "hitsPerMinute": 25,
    "chance": 75,
    "searchRange": 2
   },
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "treebot": {
   "id": "treebot",
   "name": "Treebot",
   "kind": "robot",
   "speed": 2.3,
   "energy": {
    "move": 2,
    "uproot": 1,
    "plant": 1
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "green": 20,
    "blue": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": true,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "repairbot": {
   "id": "repairbot",
   "name": "Repairbot",
   "kind": "robot",
   "speed": 3,
   "energy": {
    "move": 0.7
   },
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "blue": 20,
    "green": 10,
    "yellow": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [
    "treebot",
    "defender",
    "defender2",
    "repairbot",
    "freezebot"
   ],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "buggy": {
   "id": "buggy",
   "name": "Buggy",
   "kind": "vehicle",
   "speed": 3,
   "energy": {
    "move": 0.7
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "red": 10,
    "wheel": 4,
    "energy": 1
   },
   "carries": 3,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "dirtbuggy": {
   "id": "dirtbuggy",
   "name": "Dirtbuggy",
   "kind": "vehicle",
   "speed": 3,
   "energy": {
    "move": 0.7
   },
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "yellow": 10,
    "wheel": 4,
    "energy": 1
   },
   "carries": 3,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "steamshovel": {
   "id": "steamshovel",
   "name": "Steamshovel",
   "kind": "vehicle",
   "speed": 2,
   "energy": {
    "move": 1.2,
    "dig": 1.2,
    "fill": 1.2
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "yellow": 25,
    "wheel": 4,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": true,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "dumptruck": {
   "id": "dumptruck",
   "name": "Dumptruck",
   "kind": "vehicle",
   "speed": 1,
   "energy": {
    "move": 1.2
   },
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "yellow": 20,
    "wheel": 6,
    "energy": 1
   },
   "carries": 25,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "forklift": {
   "id": "forklift",
   "name": "Forklift",
   "kind": "vehicle",
   "speed": 2,
   "energy": {
    "move": 1
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "red": 15,
    "wheel": 4,
    "energy": 1
   },
   "carries": 10,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "dozer": {
   "id": "dozer",
   "name": "Bulldozer",
   "kind": "vehicle",
   "speed": 2,
   "energy": {
    "move": 1,
    "push": 1
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "yellow": 15,
    "wheel": 6,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": true,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "tugboat": {
   "id": "tugboat",
   "name": "Tugboat",
   "kind": "vehicle",
   "speed": 3,
   "energy": {
    "move": 1.2
   },
   "terrain": [
    "water",
    "deep",
    "whirl"
   ],
   "recipe": {
    "blue": 15,
    "energy": 1
   },
   "carries": 5,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "freighter": {
   "id": "freighter",
   "name": "Freighter",
   "kind": "vehicle",
   "speed": 2,
   "energy": {
    "move": 1.2
   },
   "terrain": [
    "water",
    "deep",
    "whirl"
   ],
   "recipe": {
    "blue": 25,
    "energy": 1
   },
   "carries": 25,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "speedboat": {
   "id": "speedboat",
   "name": "Speedboat",
   "kind": "vehicle",
   "speed": 3,
   "energy": {
    "move": 1
   },
   "terrain": [
    "water",
    "deep",
    "whirl"
   ],
   "recipe": {
    "red": 10,
    "yellow": 40,
    "blue": 10,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.05,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     150,
     250
    ],
    "hitsPerMinute": 25,
    "chance": 75,
    "searchRange": 2
   },
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "duck": {
   "id": "duck",
   "name": "Duck",
   "kind": "animal",
   "speed": 2,
   "energy": {
    "move": 0.4
   },
   "terrain": [
    "normal",
    "street",
    "water",
    "whirl",
    "swamp"
   ],
   "recipe": {
    "yellow": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": true,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "bluebird": {
   "id": "bluebird",
   "name": "Bluebird",
   "kind": "animal",
   "speed": 2,
   "energy": {
    "move": 0.4
   },
   "terrain": [
    "normal",
    "street",
    "rocky",
    "water",
    "deep",
    "reef"
   ],
   "recipe": {
    "blue": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "snail": {
   "id": "snail",
   "name": "Snail",
   "kind": "animal",
   "speed": 0.5,
   "energy": {
    "move": 0.4
   },
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "frog": {
   "id": "frog",
   "name": "Frog",
   "kind": "animal",
   "speed": 2,
   "energy": {
    "move": 0.4
   },
   "terrain": [
    "normal",
    "street",
    "water",
    "whirl",
    "swamp"
   ],
   "recipe": {
    "green": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": true,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "fish": {
   "id": "fish",
   "name": "Fish",
   "kind": "animal",
   "speed": 2,
   "energy": {
    "move": 0.4
   },
   "terrain": [
    "water",
    "deep",
    "whirl"
   ],
   "recipe": {
    "blue": 5,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": true,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "freezebot": {
   "id": "freezebot",
   "name": "Freezebot",
   "kind": "robot",
   "speed": 2.5,
   "energy": {
    "move": 1.2,
    "freeze": 2
   },
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "blue": 5,
    "red": 5,
    "white": 10,
    "yellow": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.5,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": {
    "duration": 25,
    "recharge": 3,
    "range": 2
   },
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  }
 },
 "buildings": {
  "gas_station": {
   "id": "gas_station",
   "name": "Gas Station",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 40,
    "green": 5
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [
    "buggy",
    "dirtbuggy",
    "steamshovel",
    "dumptruck",
    "forklift",
    "dozer"
   ],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "marina": {
   "id": "marina",
   "name": "Marina",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "water"
   ],
   "recipe": {
    "blue": 40,
    "green": 5
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [
    "tugboat",
    "freighter",
    "speedboat"
   ],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "robot_lab": {
   "id": "robot_lab",
   "name": "Robot Lab",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "yellow": 25,
    "blue": 25,
    "green": 10
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [
    "treebot",
    "defender",
    "defender2",
    "freezebot"
   ],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "guard_tower": {
   "id": "guard_tower",
   "name": "Guard Tower",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 25,
    "yellow": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.02,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     200,
     300
    ],
    "hitsPerMinute": 25,
    "chance": 75,
    "searchRange": 2
   },
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "house": {
   "id": "house",
   "name": "House",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "blue": 20,
    "green": 20,
    "yellow": 20,
    "white": 25
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "factory": {
   "id": "factory",
   "name": "Factory",
   "kind": "vehicle",
   "speed": 1,
   "energy": {
    "make": 7.5
   },
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 15,
    "blue": 10,
    "white": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": 25,
   "howLongDoesItTake": 2
  },
  "windmill": {
   "id": "windmill",
   "name": "Windmill",
   "kind": "vehicle",
   "speed": 1,
   "energy": {
    "make": 7.5
   },
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 15,
    "wheel": 5,
    "white": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": 1,
   "howLongDoesItTake": 2
  },
  "garage": {
   "id": "garage",
   "name": "Garage",
   "kind": "vehicle",
   "speed": 1,
   "energy": {
    "make": 7.5
   },
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 15,
    "yellow": 10,
    "white": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": 4,
   "howLongDoesItTake": 2
  },
  "nursery": {
   "id": "nursery",
   "name": "Nursery",
   "kind": "vehicle",
   "speed": 1,
   "energy": {
    "make": 7.5
   },
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "red": 15,
    "green": 10,
    "white": 25,
    "energy": 1
   },
   "carries": 0,
   "shield": 1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": null,
   "restFor": null,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": 2
  }
 },
 "monsters": {
  "crab": {
   "id": "crab",
   "name": "Crab",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street",
    "swamp"
   ],
   "recipe": {
    "red": 20,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     100,
     200
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 6,
   "restFor": 2,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "gator": {
   "id": "gator",
   "name": "Alligator",
   "kind": "vehicle",
   "speed": 0.5,
   "energy": {},
   "terrain": [
    "normal",
    "street",
    "water",
    "deep",
    "swamp"
   ],
   "recipe": {
    "green": 40,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": true,
   "attack": {
    "damage": [
     100,
     200
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 3,
   "restFor": 1,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "boulder": {
   "id": "boulder",
   "name": "Boulder",
   "kind": "vehicle",
   "speed": 0,
   "energy": {},
   "terrain": [
    "normal",
    "street"
   ],
   "recipe": {
    "energy": 0
   },
   "carries": 0,
   "shield": 1e-8,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": null,
   "recharges": [],
   "restEvery": 1,
   "restFor": 10000000,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "scorpion": {
   "id": "scorpion",
   "name": "Scorpion",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "red": 40,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.045,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     200,
     400
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 6,
   "restFor": 2,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "water_crab": {
   "id": "water_crab",
   "name": "Water Crab",
   "kind": "vehicle",
   "speed": 0.5,
   "energy": {},
   "terrain": [
    "water",
    "deep",
    "swamp"
   ],
   "recipe": {
    "blue": 40,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.1,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     100,
     200
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 3,
   "restFor": 1,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "shark": {
   "id": "shark",
   "name": "Shark",
   "kind": "vehicle",
   "speed": 2,
   "energy": {},
   "terrain": [
    "water",
    "deep"
   ],
   "recipe": {
    "blue": 50,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.05,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     300,
     500
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 4,
   "restFor": 1,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "trex": {
   "id": "trex",
   "name": "T Rex",
   "kind": "vehicle",
   "speed": 0.5,
   "energy": {},
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "red": 60,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.02,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     400,
     600
    ],
    "hitsPerMinute": 25,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 12,
   "restFor": 2,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  },
  "lion": {
   "id": "lion",
   "name": "Lion",
   "kind": "vehicle",
   "speed": 4,
   "energy": {},
   "terrain": [
    "normal",
    "street",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "yellow": 40,
    "energy": 1
   },
   "carries": 0,
   "shield": 0.03,
   "dig": false,
   "push": false,
   "transplant": false,
   "waterversion": false,
   "attack": {
    "damage": [
     200,
     400
    ],
    "hitsPerMinute": 30,
    "chance": 100,
    "searchRange": 4
   },
   "recharges": [],
   "restEvery": 4,
   "restFor": 1,
   "freeze": null,
   "makeHowManyBricks": null,
   "howLongDoesItTake": null
  }
 }
};
