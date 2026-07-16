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
   "restFor": null
  },
  "defender2": {
   "id": "defender2",
   "name": "Defender",
   "kind": "robot",
   "speed": 2,
   "energy": {
    "move": 1
   },
   "terrain": [
    "normal",
    "rocky",
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
   "restFor": null
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
   "restFor": null
  },
  "defender3": {
   "id": "defender3",
   "name": "Defender Mach 2",
   "kind": "robot",
   "speed": 2,
   "energy": {
    "move": 1
   },
   "terrain": [
    "normal",
    "rocky",
    "swamp"
   ],
   "recipe": {
    "blue": 40,
    "yellow": 25,
    "red": 25,
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
     200,
     300
    ],
    "hitsPerMinute": 25,
    "chance": 75,
    "searchRange": 2
   },
   "recharges": [],
   "restEvery": null,
   "restFor": null
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
    "repairbot"
   ],
   "restEvery": null,
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
    "normal"
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
   "restFor": null
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
   "restFor": null
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
   "restFor": null
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
    "normal"
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
   "restFor": null
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
   "restFor": null
  },
  "robot_lab": {
   "id": "robot_lab",
   "name": "Robot Lab",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal"
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
    "defender2"
   ],
   "restEvery": null,
   "restFor": null
  },
  "guard_tower": {
   "id": "guard_tower",
   "name": "Guard Tower",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal"
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
   "restFor": null
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
   "restFor": 2
  },
  "gator": {
   "id": "gator",
   "name": "Alligator",
   "kind": "vehicle",
   "speed": 0.5,
   "energy": {},
   "terrain": [
    "normal",
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
   "restFor": 1
  },
  "boulder": {
   "id": "boulder",
   "name": "Boulder",
   "kind": "vehicle",
   "speed": 0,
   "energy": {},
   "terrain": [
    "normal"
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
   "restFor": 10000000
  },
  "scorpion": {
   "id": "scorpion",
   "name": "Scorpion",
   "kind": "vehicle",
   "speed": 1,
   "energy": {},
   "terrain": [
    "normal",
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
   "restFor": 2
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
   "restFor": 1
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
   "restFor": 1
  },
  "trex": {
   "id": "trex",
   "name": "T Rex",
   "kind": "vehicle",
   "speed": 0.5,
   "energy": {},
   "terrain": [
    "normal",
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
   "restFor": 2
  }
 }
};
