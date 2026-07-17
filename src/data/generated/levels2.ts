// 자동 생성 파일 — tools/gen-data.mjs 가 extract/ 데이터에서 생성. 직접 수정 금지.
import type { LevelDef } from '../types';

export const LEVELS2: LevelDef[] = [
 {
  "world": 1,
  "mission": 1,
  "name": "Into the Jungle",
  "devName": "TAKE APART THE DUCK",
  "width": 23,
  "height": 9,
  "grid": [
   "@@h@@@@@np@@@@@@*.*...@",
   "@'.'@@@.f.m'@@@@._..*.@",
   "!..!.@....!!@@@@*_wfw.@",
   ".....@l.....@@@@._www.@",
   ".a.u.!g1.s.i..k..*wew.b",
   "..!..@......i@@@._w2w.@",
   ".'...@f..'!.d@@@*_wjw.@",
   "@'.'@@@d.!.c@@@@._..*.@",
   "@@o@@@@@m..@@@@@*.*...@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "snail"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "duck"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 5
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "yellow": 10,
     "energy": 1
    }
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   },
   "e": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 6,
     "energy": 1
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 5
   },
   "i": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 5
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 5
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "n": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "o": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1,
     "yellow": 25,
     "blue": 40
    }
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 1
   },
   "s": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 25,
     "energy": 1
    }
   },
   "u": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   }
  },
  "inventory": {},
  "center": [
   10,
   5
  ],
  "unlocks": [
   2,
   3
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 2,
  "name": "Out of Gas",
  "devName": "THE LONG ROAD",
  "width": 17,
  "height": 20,
  "grid": [
   ".!...!.....w...j2",
   "!!'!i..!.1.!.!.!'",
   "wwwwwwrwrwrwrwrww",
   "...%.w...w.......",
   ".!.*...%...%@@@@.",
   ".*.%.@@w%w%w.....",
   ".!.%.@@......%rrr",
   ".%.&%*%.%%%!*'...",
   ".!.%....@....%.@.",
   ".%.%.%%@@@*%.'.@.",
   ".!.&.........&.@.",
   ".%.%wwwfwwwww%.@.",
   "e!.......!.....@d",
   "'!!%*'%!.'.!%&@@@",
   ".........!.......",
   ".!%&%!!%*'%!%&%!.",
   ".!.........!...!.",
   ".!.@@@.@@@.!.%.!.",
   "...@..a..@...%...",
   "@@.@ahhha@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "guard_tower"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "dumptruck"
   },
   "b": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 12
    }
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "guard_tower",
    "uses": 5
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 5
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "g": {
    "kind": "unit",
    "water": false,
    "type": "steamshovel"
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 20,
     "energy": 5
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 5
   },
   "j": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   }
  },
  "inventory": {},
  "center": [
   5,
   16
  ],
  "unlocks": [],
  "game": 2
 },
 {
  "world": 1,
  "mission": 3,
  "name": "I Need a Hero",
  "devName": "BUGGY RIDE",
  "width": 13,
  "height": 11,
  "grid": [
   ".............",
   "f._________.f",
   "!'!e..j..e!'!",
   "__..c...c..__",
   "'..!!!*!!!..'",
   "'d'.*.!2*.'d'",
   ".....___.....",
   ".....g.......",
   "www.*...*.www",
   "wwaw..1..waww",
   "wwwww.i.wwwwb"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "defender"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25
    }
   },
   "e": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 5
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "i": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "k": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   }
  },
  "inventory": {
   "buggy": 5
  },
  "center": null,
  "unlocks": [
   4
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 4,
  "name": "The Escort",
  "devName": "TESTING NEW ELEMENTS",
  "width": 13,
  "height": 9,
  "grid": [
   "1k...wwwiwwww",
   "a...wewwwwwew",
   ".wwbwwww..www",
   "wwwwwwwwh.www",
   "wwwwwwd...wew",
   "wwwwwww.!.www",
   "wwwwhg.2..cww",
   "wiww'.f..wwew",
   "wwh.b.&!..wwj"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "defender"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "snail"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25,
     "energy": 1
    }
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "freezebot"
   },
   "e": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "freighter",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "j": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 10
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 5
   }
  },
  "inventory": {
   "freezebot": 10
  },
  "center": null,
  "unlocks": [
   5
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 5,
  "name": "The Lion Sleeps Tonight",
  "devName": "TESTING NEW ELEMENTS",
  "width": 17,
  "height": 11,
  "grid": [
   "@@@@@@@@@@@@@2l%@",
   ".f@@@@@@@@@@.*..@",
   "d.b....b.......1.",
   ".bb.c...b@@@@...%",
   "b........b..@@@@@",
   ".b.m.b%b%mww*%i@@",
   "..@@@@.j.wweh*.@@",
   "...g.@...%www%.@@",
   ".....@.%.k.%*.a@@",
   "@....@@@@@@@@@@@@",
   "@.n.@@@@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "lion"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15,
     "wheel": 6,
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 10,
     "yellow": 25,
     "red": 5,
     "blue": 5,
     "energy": 1
    }
   },
   "h": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 10
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 5
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "n": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {},
  "center": [
   15,
   0
  ],
  "unlocks": [
   6,
   7
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 6,
  "name": "Watering Hole",
  "devName": "TESTING NEW ELEMENTS",
  "width": 26,
  "height": 12,
  "grid": [
   "j...................@@@@@@",
   "..wwwwwww.i.wwwwwwk.@@@@@@",
   ".wwww..wwwwwwb..www.......",
   ".www.cww..e..ww.dww.wwww..",
   "..ww.wwww.w.wwww.ww..wwww.",
   "..wwwww2wwwwwwbwwww..ww1w.",
   "..ww..wwww.wwww..ww..waww.",
   ".www...ww.f.ww...ww..wwww.",
   ".www.h.b.....wg..ww.wwww..",
   ".wwwwwwwwwwwwwwwwww.......",
   ".lwwwwwww...wwwwww..@@@@@@",
   "...................j@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "buggy"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "shark"
   },
   "a": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "b": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5,
     "red": 5
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "energy": 1
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "wheel": 4,
     "energy": 1
    }
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 10
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 20,
     "wheel": 6,
     "energy": 1
    }
   },
   "j": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 5
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "energy": 1,
     "wheel": 4
    }
   }
  },
  "inventory": {
   "steamshovel": 10
  },
  "center": [
   20,
   5
  ],
  "unlocks": [
   8
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 7,
  "name": "Slow Going",
  "devName": "TESTING NEW ELEMENTS",
  "width": 13,
  "height": 9,
  "grid": [
   ".i!l!:::!k!.h",
   "...'?::2?'.g.",
   ".b!..?!?..!.b",
   "!.!?.....?!.!",
   ".T...___...T.",
   "aja.._d_..a.a",
   ":::T.....T...",
   ":1::a...a.e..",
   ":::a..c..a.jf"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "collect 1 crab",
    "collect": {
     "count": 1,
     "type": "crab"
    }
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "collect 1 lion",
    "collect": {
     "count": 1,
     "type": "lion"
    }
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "c": {
    "kind": "unit",
    "water": false,
    "type": "freezebot"
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15,
     "wheel": 6,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25,
     "green": 20,
     "energy": 1
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 10
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "white": 10,
     "blue": 5,
     "red": 5,
     "energy": 1
    }
   },
   "j": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "k": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "l": {
    "kind": "building",
    "water": false,
    "type": "robot_lab"
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [
   9
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 8,
  "name": "Big Game Hunter",
  "devName": "TESTING NEW ELEMENTS",
  "width": 23,
  "height": 11,
  "grid": [
   "..wwwwwwwwwxxmwxxwwwwww",
   "a..i..e..ewwxxxxw.www.w",
   "..wwwrw...wbwwww......w",
   "wrrrrhww...e...w..www.w",
   "wwwwrrwwbwwww....wwww.w",
   "wwwcwrwwwwwdwwwwwww2gjl",
   "wwwwrrwwbwwww..f.wwww.w",
   "wrrrrhww...e...w..www.w",
   "..wwwww...wwbwww......w",
   "1..e..e..ewwxxxxw.www.w",
   "..wwwwwwwwwxxwkxxwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "snail"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "frog"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   },
   "b": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "freezebot",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 10
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 10,
     "red": 5,
     "energy": 1
    }
   },
   "g": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 5
   },
   "k": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "l": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "m": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 10
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [],
  "game": 2
 },
 {
  "world": 1,
  "mission": 9,
  "name": "Wildlife Preserve",
  "devName": "TESTING NEW ELEMENTS",
  "width": 14,
  "height": 15,
  "grid": [
   "@@$.@@wg@@.$@@",
   "@@.c@@xx@@c.@@",
   "$..wwwwwwww..$",
   ".ewwwwwwwwwwe.",
   "@@w________w@@",
   "@@__d!!!!h__@@",
   "::.!'.al.'!.::",
   "1:.!ka3w.j!.:2",
   "::.!'!ww!'!.::",
   "@@...!.i!...@@",
   "@@w..!!!!..w@@",
   "$.wwwwwwwwwwh$",
   ".m.wwwwwwwwe..",
   "@@.c@@xx@@c.@@",
   "@@.$@@bw@@$f@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "collect 1 lion",
    "collect": {
     "count": 1,
     "type": "lion"
    }
   },
   "2": {
    "kind": "goal",
    "water": false,
    "target": "collect 1 lion",
    "collect": {
     "count": 1,
     "type": "lion"
    }
   },
   "3": {
    "kind": "bonusgoal",
    "water": true,
    "target": "marina"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 5
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "dumptruck"
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 5
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 5
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5,
     "red": 5,
     "white": 10,
     "yellow": 25,
     "energy": 1
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "marina",
    "uses": 5
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 10
    }
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 5
   }
  },
  "inventory": {
   "tugboat": 5
  },
  "center": null,
  "unlocks": [
   10
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 10,
  "name": "River Crossing",
  "devName": "THE LONG ROAD",
  "width": 21,
  "height": 12,
  "grid": [
   "@.2!?_...wwwnw_es__.!",
   "@?'.._...wwtww____..!",
   "@?.m_f..dwnww_.....'.",
   "@..._...wnww_h..?...!",
   "@b.._..wwww___.....!j",
   "@.?._..www..ww__.j!jo",
   "@...k_.www..1zw._..!j",
   "@mw@@_.wnw______....'",
   "@@w@@@tww...h......!.",
   ".?.y@@wc.s..wwww..s.!",
   "...wv@@ww..wwpwrw?..!",
   "@q..wu@@@@@@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "forklift"
   },
   "a": {
    "kind": "plan",
    "water": true,
    "unit": "house",
    "uses": 1
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 5
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 5
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10,
     "energy": 1,
     "wheel": 4
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "l": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "m": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   },
   "n": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5
    }
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 5
   },
   "p": {
    "kind": "plan",
    "water": true,
    "unit": "house",
    "uses": 1
   },
   "r": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 10,
     "energy": 1
    }
   },
   "s": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 5
    }
   },
   "t": {
    "kind": "pile",
    "water": true,
    "contents": {
     "white": 5
    }
   },
   "u": {
    "kind": "plan",
    "water": true,
    "unit": "forklift",
    "uses": 5
   },
   "v": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "y": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "z": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 5
   },
   "q": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "snail": 5
  },
  "center": [
   10,
   5
  ],
  "unlocks": [
   11,
   12
  ],
  "game": 2
 },
 {
  "world": 1,
  "mission": 11,
  "name": "Jungle Survival",
  "devName": "TESTING NEW ELEMENTS",
  "width": 21,
  "height": 22,
  "grid": [
   "###d.d%......%.d.d...",
   "..##d....ddd.......m.",
   "c...##ddd.2.ddd......",
   ".j##..%.ddddd.%.*.k..",
   ".#####d...a...d......",
   ".#...dd.%%*%%.dd*....",
   "ddd.d...........d%d%%",
   "....d..ddd.ddd..d..__",
   "%#%....%.....%....%#_",
   "*#%%%&%&.%%%.&%&%%%#.",
   "%#%.###%.$b$.%###.%#_",
   "%....%.%.%c%.%.%..%%_",
   "*%*#*%.%.%.%.%.%*#%*_",
   "...###.$.....$.###.%.",
   "%%%%*%#%%%*%%%#%*%%%_",
   ".wf%.*##%e%e%##*.%_h.",
   "%ww$.%%g%#%#%i%%.$__%",
   "%ww%..%.%#%#%.%..%__%",
   "..%$%.*#&#&#&#*.%$%.#",
   ".......##.1.##...##.#",
   "@@@@@@@..###..@@@@@@@",
   "@@@@@@@@.....@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "freezebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "dozer"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "white": 10,
     "blue": 5,
     "red": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 10
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "d": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20,
     "green": 10,
     "yellow": 5,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 5
   },
   "g": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 5
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "wheel": 4,
     "energy": 1
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 5
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 15,
     "wheel": 4,
     "energy": 1
    }
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 5
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [],
  "game": 2
 },
 {
  "world": 1,
  "mission": 12,
  "name": "The Outpost",
  "devName": "TESTING NEW ELEMENTS",
  "width": 15,
  "height": 18,
  "grid": [
   "@@@!*':::'%!@@@",
   "@@!':::1:::'!@@",
   "@g'?:::::::?%?@",
   "@??!!..d..!'!c@",
   "@@@e._!!!wwj@@@",
   "@@@___...%ww@@@",
   "@%.!!.....!!ww@",
   ".*.a.!.i.!a..n.",
   "%.3...!'!.s2.wm",
   "@...t!.!k!..ow@",
   "@@@!!..!..!!@@@",
   "@@@.f.!b!.f.@@@",
   "@wrrrrp.brrrrw@",
   "@rwwwwwhwwwwwr@",
   "rqwxwxwwwxwxqwr",
   "@rxxxxxuxxxxxr@",
   "@@wzwwr@rwwyw@@",
   "@@@ww@@@@@ww@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "collect 1 lion",
    "collect": {
     "count": 1,
     "type": "lion"
    }
   },
   "2": {
    "kind": "goal",
    "water": false,
    "target": "gas_station"
   },
   "3": {
    "kind": "bonusgoal",
    "water": false,
    "target": "house"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "wheel": 4
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "f": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 25,
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20,
     "green": 10,
     "yellow": 5,
     "energy": 1
    }
   },
   "i": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "j": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 5
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 5
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 5
   },
   "m": {
    "kind": "unit",
    "water": false,
    "type": "frog"
   },
   "n": {
    "kind": "plan",
    "water": true,
    "unit": "dumptruck",
    "uses": 10
   },
   "o": {
    "kind": "pile",
    "water": true,
    "contents": {
     "wheel": 2
    }
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 5
   },
   "q": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "s": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 10
   },
   "t": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5,
     "red": 5,
     "white": 10,
     "yellow": 25,
     "energy": 1
    }
   },
   "u": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 5
   },
   "y": {
    "kind": "plan",
    "water": true,
    "unit": "house",
    "uses": 5
   },
   "z": {
    "kind": "pile",
    "water": true,
    "contents": {
     "white": 15
    }
   }
  },
  "inventory": {
   "duck": 5
  },
  "center": null,
  "unlocks": [
   13
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 1,
  "name": "Turning Trees into Bricks",
  "devName": "BUGGY RIDE",
  "width": 13,
  "height": 12,
  "grid": [
   "!!!.....wwwiw",
   "!!?.....www1b",
   "2?!c....wwwww",
   "!!?>\\\\\\\\]wwaw",
   "g!'...../wwww",
   "!!!?...e{\\\\].",
   "..?....h..f/'",
   ".%!%%*%...[}.",
   "!*!'!%*%.>}.'",
   ".!!d'''''''*%",
   ".!'!!!*!!'!!!",
   "%&%%...%%&%!!"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "buggy"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "fish"
   },
   "a": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 5
   },
   "c": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25,
     "green": 20,
     "energy": 1
    }
   },
   "e": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 5
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {
   "buggy": 5
  },
  "center": null,
  "unlocks": [
   2,
   3
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 2,
  "name": "Deforestation",
  "devName": "TESTING NEW ELEMENTS",
  "width": 23,
  "height": 7,
  "grid": [
   "@%.....`/.>@@@@@@@@@@@@",
   "!%.!.!.`/b>/@@@@@@@@@@@",
   "!'%e!.``{\\\\}@@-/-@@@@@@",
   "!!.!d!`1....a\\\\=\\\\\\..2.",
   "!'%f!.``[\\\\]@@-/-@@@@@@",
   "!%.!.!.`/c>/@@@@@@@@@@@",
   "@%.....`/.>@@@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "gas_station"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "forklift"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 25,
     "energy": 1
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 10,
     "red": 15,
     "energy": 1
    }
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 5
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 1
   }
  },
  "inventory": {
   "factory": 5,
   "house": 1
  },
  "center": null,
  "unlocks": [],
  "game": 2
 },
 {
  "world": 2,
  "mission": 3,
  "name": "The Distraction",
  "devName": "TESTING NEW ELEMENTS",
  "width": 15,
  "height": 11,
  "grid": [
   "a!#!##!??mw2w.%",
   ".c.!##f.*?wwwrl",
   "!..*!##'.%?wrww",
   "!..'.#&...!!!!j",
   "...'##'...?!e!!",
   ".!#!#k...1!!!!!",
   ".!!###....%!&!!",
   ".##.'....?!>!..",
   "..#!....?g!{\\\\]",
   "!..d...?'!'.b./",
   "!.....?'.h.i.>}"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "fish"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "b": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 25,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 5
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10,
     "blue": 20,
     "yellow": 5,
     "energy": 1
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 10
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 6,
     "energy": 1
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 5
   },
   "k": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "m": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   }
  },
  "inventory": {
   "defender": 5,
   "duck": 5
  },
  "center": [
   6,
   4
  ],
  "unlocks": [
   4,
   5
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 4,
  "name": "Cooperation",
  "devName": "TESTING NEW ELEMENTS",
  "width": 20,
  "height": 11,
  "grid": [
   "__.....wwwwww..[>__.",
   "n_....wwww.wwwo/_..p",
   ".__e.ew3..c..\\\\+\\\\\\\\",
   "n_....wwwwwwww_-b___",
   "?__...e....::w[}_d.?",
   "n_.....e...:1w=\\\\\\\\\\",
   "?__2...egewwwy/....?",
   "n_...heie..f.\\).____",
   "?__....e.ewwww{>-m__",
   "n_j...e...e.wwwl{\\\\\\",
   ".__.a..e.e.twkww...q"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "collect 1 lion",
    "collect": {
     "count": 1,
     "type": "lion"
    }
   },
   "2": {
    "kind": "goal",
    "water": false,
    "target": "factory"
   },
   "3": {
    "kind": "bonusgoal",
    "water": false,
    "target": "house"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 5
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 5,
     "energy": 1,
     "wheel": 4
    }
   },
   "e": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 5
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "freezebot",
    "uses": 5
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5,
     "red": 5,
     "white": 10,
     "yellow": 25,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15,
     "energy": 1,
     "wheel": 6
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 5
   },
   "k": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "l": {
    "kind": "plan",
    "water": true,
    "unit": "dumptruck",
    "uses": 5
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 20,
     "wheel": 6,
     "energy": 1
    }
   },
   "n": {
    "kind": "pile",
    "water": false,
    "contents": {
     "white": 5
    }
   },
   "o": {
    "kind": "plan",
    "water": true,
    "unit": "factory",
    "uses": 5
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 5
    }
   },
   "q": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5
    }
   },
   "t": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 5
   },
   "y": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   }
  },
  "inventory": {
   "snail": 5
  },
  "center": [
   13,
   3
  ],
  "unlocks": [],
  "game": 2
 },
 {
  "world": 2,
  "mission": 5,
  "name": "We Need More Energy",
  "devName": "TESTING NEW ELEMENTS",
  "width": 13,
  "height": 19,
  "grid": [
   "`.l._!.!_.n.`",
   "`i..a!!!...j`",
   "````_!!!_````",
   "a`a`_!m!_`a`a",
   "_a_a_!!!_a_a_",
   "./..?www?[\\\\\\",
   "!/.dwweww/.c!",
   "[}..!!!!./.``",
   "/!.!?.k?!/.!.",
   "/..?..1.?/.``",
   "/!.!?..?!/.!.",
   "{]..!!!!./.``",
   "./.dwwfww/.b!",
   "!/..?wsw?{\\\\\\",
   "_a___!!!___a_",
   "``..__2__..``",
   "``.o_!!!_..``",
   ".h``.___.``g.",
   "..``_!.!_``.."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "buggy"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "house"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 5
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 5
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "freezebot",
    "uses": 10
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "wheel": 2
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 25
    }
   },
   "k": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "l": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "n": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 1
   },
   "s": {
    "kind": "pile",
    "water": true,
    "contents": {
     "white": 25
    }
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   6
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 6,
  "name": "Building the Neighborhood",
  "devName": "TESTING NEW ELEMENTS",
  "width": 13,
  "height": 17,
  "grid": [
   "@/i\\i\\i\\i/@@@",
   "@/.d...m./@@@",
   "@/wwl/www/@@@",
   "@-kww-wjw-@@@",
   "@/_b_._?_/@@@",
   "@/...a\\+\\}-@@",
   "@{]Tn.c/.T>@.",
   "@./..../?e/@2",
   "@f{]o.[}.f/@.",
   "@ff-=\\}*ff%@p",
   "@..fffff...f.",
   "g..T?!?Tf.f?!",
   ".fw!.1.!.f.{@",
   "@fwwT!T.'f@@@",
   "@rwwwwwwwr@@@",
   "@rwwwhwwwr@@@",
   "@wwrrwrrww@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "gas_station"
   },
   "a": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "b": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "c": {
    "kind": "unit",
    "water": false,
    "type": "treebot"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10,
     "energy": 1,
     "wheel": 4
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 5
   },
   "f": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 5
   },
   "h": {
    "kind": "plan",
    "water": true,
    "unit": "gas_station",
    "uses": 5
   },
   "i": {
    "kind": "building",
    "water": false,
    "type": "house"
   },
   "j": {
    "kind": "plan",
    "water": true,
    "unit": "garage",
    "uses": 1
   },
   "k": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "l": {
    "kind": "plan",
    "water": true,
    "unit": "dirtbuggy",
    "uses": 5
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 1
   },
   "n": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 5
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 1
   }
  },
  "inventory": {
   "treebot": 10
  },
  "center": null,
  "unlocks": [
   7,
   8
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 7,
  "name": "Urban Jungle",
  "devName": "QUEST",
  "width": 22,
  "height": 7,
  "grid": [
   "..[\\]2[\\\\\\\\bpo!!...b..",
   "._/_{=}.d.e_..!m!.bn.q",
   "__/_______b___!'!!'bb.",
   ".c/..bg.......!!k!.j.b",
   "wwww._....d.d.'w'!..j.",
   "wafw._.i...d..!w!'!..s",
   "hwwwwwwwwwwwwwwwwlrrw1"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "duck"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "house"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25
    }
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "d": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 15
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 10
    }
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 25
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "j": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 15
    }
   },
   "l": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 10
   },
   "m": {
    "kind": "building",
    "water": false,
    "type": "garage"
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 10
   },
   "q": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "s": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 5
   }
  },
  "inventory": {
   "defender": 1,
   "buggy": 10,
   "dirtbuggy": 10
  },
  "center": [
   4,
   3
  ],
  "unlocks": [
   9,
   10
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 8,
  "name": "Coastal Property",
  "devName": "TESTING NEW ELEMENTS",
  "width": 14,
  "height": 15,
  "grid": [
   "wlwwwwwrwnwwww",
   "awgwwwwrwwhwbw",
   "ww.eww'?dw..ww",
   ".____......k.?",
   "?.j.....i____.",
   "ww..wv??dw.fww",
   "wwwwwwrwwwwwww",
   "whwzwwrwwwwwmw",
   "bw..cw!!ww..wa",
   "?.s...!?.'.t.!",
   "!...?.?!.....?",
   "ww..wp!!cw..qu",
   "wrrrwwwwwwrrrv",
   "rywrrrrrrrrwwr",
   "qwowpw12wwwwwy"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "b": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   },
   "c": {
    "kind": "whirlpool",
    "water": true,
    "channel": 3
   },
   "d": {
    "kind": "whirlpool",
    "water": true,
    "channel": 4
   },
   "e": {
    "kind": "building",
    "water": false,
    "type": "garage"
   },
   "f": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "g": {
    "kind": "unit",
    "water": true,
    "type": "tugboat"
   },
   "h": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 20
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 25
    }
   },
   "l": {
    "kind": "plan",
    "water": true,
    "unit": "dumptruck",
    "uses": 10
   },
   "m": {
    "kind": "plan",
    "water": true,
    "unit": "guard_tower",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 5
   },
   "o": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "p": {
    "kind": "whirlpool",
    "water": true,
    "channel": 5
   },
   "q": {
    "kind": "whirlpool",
    "water": true,
    "channel": 6
   },
   "s": {
    "kind": "plan",
    "water": false,
    "unit": "speedboat",
    "uses": 5
   },
   "t": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 1
   },
   "u": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 10
    }
   },
   "v": {
    "kind": "whirlpool",
    "water": true,
    "channel": 7
   },
   "y": {
    "kind": "whirlpool",
    "water": true,
    "channel": 8
   },
   "z": {
    "kind": "plan",
    "water": true,
    "unit": "buggy",
    "uses": 5
   }
  },
  "inventory": {
   "tugboat": 5
  },
  "center": [
   0,
   0
  ],
  "unlocks": [
   9
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 9,
  "name": "Greening the Barrens",
  "devName": "DANGER RIVER",
  "width": 19,
  "height": 10,
  "grid": [
   ".bwwl._n.._._.#####",
   ".b2bw.____b...##.db",
   "_.b._......._._#_#_",
   ".._..._.jbj.....##h",
   ".b.._...bab..._..#b",
   "jwjw_._.jbj.._..._k",
   "...j..........._._b",
   ".b.w___b_wrrrrww.__",
   "bibj...._jbm1__j._.",
   ".b.r.g.._wb..__w..c"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "treebot"
   },
   "a": {
    "kind": "building",
    "water": false,
    "type": "nursery"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "d": {
    "kind": "building",
    "water": false,
    "type": "garage"
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "g": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "i": {
    "kind": "unit",
    "water": false,
    "type": "treebot"
   },
   "j": {
    "kind": "unit",
    "water": true,
    "type": "duck"
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "l": {
    "kind": "plan",
    "water": true,
    "unit": "steamshovel",
    "uses": 10
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 5
   }
  },
  "inventory": {
   "house": 5
  },
  "center": null,
  "unlocks": [
   10,
   11
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 10,
  "name": "Sacrifices",
  "devName": "THE SACRIFICE",
  "width": 13,
  "height": 19,
  "grid": [
   "......2......",
   ".k.xxxxxxx.k.",
   "m..m.....m..m",
   "!e!!'!.!'!!'!",
   "?f!'!...''!!?",
   "!.!!..h..!!?!",
   "......!..!..e",
   ".!!?.!1??*.?'",
   ".??!.?j%!%.%%",
   "..g..*w%%%.?%",
   ".$!%%!w'$!.*?",
   ".!%$$%w$!$.%%",
   ".l.f.bwe...%*",
   ".!!!.ww!%!e'?",
   ".!'!.ww&!&g!!",
   ".e...rw!'!.'?",
   ".!!?.ww*?&f.!",
   ".e...wr!!!.a'",
   "i!!'.cwwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "frog"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "defender"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5
    }
   },
   "b": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "c": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5
    }
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   },
   "e": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 1
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 25,
     "green": 5
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "j": {
    "kind": "plan",
    "water": true,
    "unit": "robot_lab",
    "uses": 10
   },
   "k": {
    "kind": "monster",
    "water": false,
    "type": "lion"
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 1
   },
   "m": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "duck": 1
  },
  "center": [
   7,
   15
  ],
  "unlocks": [],
  "game": 2
 },
 {
  "world": 2,
  "mission": 11,
  "name": "Shipping Lanes",
  "devName": "TESTING NEW ELEMENTS",
  "width": 15,
  "height": 11,
  "grid": [
   "%*%wwwwww'.w[\\]",
   "$.p_*www_?.>}1/",
   "%m__...www__.n/",
   "wwl..2%.gwww_[}",
   "Twww...%.Towww_",
   "wa.ww...e...jww",
   "%wwwwww.e.e.dww",
   "'%ww?w?e?..kjww",
   "t*.wwwi.wwwwwww",
   "w%%.fwwww?3wwwc",
   "wqr%.wwwwwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "house"
   },
   "2": {
    "kind": "goal",
    "water": false,
    "target": "nursery"
   },
   "3": {
    "kind": "bonusgoal",
    "water": false,
    "target": "garage"
   },
   "a": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "c": {
    "kind": "unit",
    "water": true,
    "type": "freighter"
   },
   "d": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "e": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "marina",
    "uses": 1
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "house",
    "uses": 1
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 6
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25,
     "green": 20,
     "energy": 1
    }
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 5
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "nursery",
    "uses": 1
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 1
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 5
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 15
    }
   },
   "q": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "t": {
    "kind": "plan",
    "water": true,
    "unit": "garage",
    "uses": 1
   }
  },
  "inventory": {},
  "center": [
   10,
   6
  ],
  "unlocks": [
   12
  ],
  "game": 2
 },
 {
  "world": 2,
  "mission": 12,
  "name": "The Last Frontier",
  "devName": "QUEST",
  "width": 14,
  "height": 11,
  "grid": [
   "!g#e#.##.!!'!n",
   "!!#...k..''!!f",
   "l!####ww..!w?!",
   "www#j#ww..?ww?",
   "wpwwawww...www",
   "wwwwww...d.wwi",
   ".r.r.r1o....cr",
   "wwwwwwwwwwrrww",
   "wrhwwwrwwwwrww",
   "wwwrwhwwwwhwww",
   "2wwwwwwrwwwwwr"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "guard_tower"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "fish"
   },
   "a": {
    "kind": "building",
    "water": false,
    "type": "factory"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25
    }
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "dumptruck"
   },
   "e": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "f": {
    "kind": "building",
    "water": false,
    "type": "robot_lab"
   },
   "g": {
    "kind": "building",
    "water": false,
    "type": "windmill"
   },
   "h": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "i": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 5
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20
    }
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "guard_tower",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "o": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "p": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   }
  },
  "inventory": {
   "dumptruck": 10
  },
  "center": [
   10,
   7
  ],
  "unlocks": [
   13
  ],
  "game": 2
 }
];
