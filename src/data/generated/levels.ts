// 자동 생성 파일 — tools/gen-data.mjs 가 extract/ 데이터에서 생성. 직접 수정 금지.
import type { LevelDef } from '../types';

export const LEVELS: LevelDef[] = [
 {
  "world": 1,
  "mission": 1,
  "name": "TUTORIAL",
  "devName": "TUTORIAL",
  "width": 24,
  "height": 9,
  "grid": [
   "........................",
   ".T.....TT_......__..TT..",
   "...T.......i.T.......T..",
   ".TT........a...c.....T.2",
   "__..........q......T..TT",
   "......T.........._TT_.TT",
   "..TT............d1..TT..",
   "......TT.T_..TT.....T.T.",
   "..............TT....T..."
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
    "target": "buggy"
   },
   "3": {
    "kind": "bonusgoal",
    "water": false,
    "target": "anything"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 3
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 3
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "q": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [
   2,
   3
  ]
 },
 {
  "world": 1,
  "mission": 2,
  "name": "BUGGY RIDE",
  "devName": "BUGGY RIDE",
  "width": 8,
  "height": 6,
  "grid": [
   "..T.T...",
   "..T2..T.",
   ".b.TTTT.",
   ".T.TT...",
   "....T.1.",
   "..T....."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "k": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": []
 },
 {
  "world": 1,
  "mission": 3,
  "name": "BUILD A DIRTBUGGY",
  "devName": "BUILD A DIRTBUGGY",
  "width": 8,
  "height": 6,
  "grid": [
   "_T____.2",
   "__1__.h.",
   ".____...",
   ".b.._T..",
   ".....___",
   "......g."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
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
     "yellow": 9,
     "energy": 1,
     "wheel": 4
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
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
     "yellow": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
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
    "unit": "dirtbuggy",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10,
     "wheel": 4,
     "energy": 1
    }
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   4
  ]
 },
 {
  "world": 1,
  "mission": 4,
  "name": "PICK UP AND CARRY",
  "devName": "ASSEMBLE A DIRTBUGGY",
  "width": 8,
  "height": 6,
  "grid": [
   ".a......",
   "..d...b.",
   "........",
   "T__TT..c",
   "_T.__.TT",
   "f1__e.w2"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "duck"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   5
  ]
 },
 {
  "world": 1,
  "mission": 5,
  "name": "TAKE APART THE DUCK",
  "devName": "TAKE APART THE DUCK",
  "width": 8,
  "height": 6,
  "grid": [
   "_.....e.",
   "........",
   "..z..___",
   "...___..",
   "__..c_..",
   "_2_.__.1"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "duck"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "z": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "yellow": 5,
     "energy": 1
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   }
  },
  "inventory": {
   "duck": 10
  },
  "center": null,
  "unlocks": [
   6,
   7
  ]
 },
 {
  "world": 1,
  "mission": 6,
  "name": "ONE BRICK SHORT",
  "devName": "FETCH THAT BRICK",
  "width": 24,
  "height": 7,
  "grid": [
   ".j.......www.ww......TT.",
   "...._..T.wwwwww..._..T..",
   "..T...._.ww.wwzg..fT_...",
   "..__1_...wwwwww....d..2.",
   "..iT.._.awwwhww.._e.....",
   "..._.T...wwwwww...T..T..",
   ".........w.wwww........."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
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
     "yellow": 9,
     "energy": 1,
     "wheel": 4
    }
   },
   "z": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 5
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
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
    "unit": "tugboat",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   }
  },
  "inventory": {
   "dirtbuggy": 10
  },
  "center": [
   5,
   3
  ],
  "unlocks": [
   8,
   9
  ]
 },
 {
  "world": 1,
  "mission": 7,
  "name": "ANIMAL RECYCLING",
  "devName": "RECYCLE THE ANIMALS",
  "width": 19,
  "height": 6,
  "grid": [
   ".T.wwww....www.T..1",
   "...dwwkwj..www....@",
   ".ab.wwwzwwwkwwwe.T@",
   "..c.....wwwwwwwwww@",
   "TT...wwwjw....wwww@",
   "2.T.wwwwwwww...www@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 5,
     "energy": 1
    }
   },
   "z": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "k": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "j": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   }
  },
  "inventory": {
   "snail": 10
  },
  "center": [
   3,
   3
  ],
  "unlocks": [
   9,
   10
  ]
 },
 {
  "world": 1,
  "mission": 8,
  "name": "BRIDGE BUILDER",
  "devName": "LEARN TO DIG",
  "width": 16,
  "height": 8,
  "grid": [
   "wwww.T...a.@~...",
   "3wrww.T......2..",
   "wrwwwwwww...T...",
   "wwwwrwwwwwwww...",
   ".wwwwwwwwwwwwww.",
   "T..wwwwwwwwwwwww",
   "..T1.T...wwwwwww",
   ".TT....T...wwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "unit",
    "water": false,
    "type": "steamshovel"
   },
   "3": {
    "kind": "bonusgoal",
    "water": false,
    "target": "steamshovel"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1,
     "yellow": 25,
     "wheel": 6
    }
   }
  },
  "inventory": {
   "steamshovel": 10
  },
  "center": [
   15,
   2
  ],
  "unlocks": []
 },
 {
  "world": 1,
  "mission": 9,
  "name": "WHAT'S A TREEBOT?",
  "devName": "MOVE THE TREES",
  "width": 20,
  "height": 8,
  "grid": [
   "cd....__T..@@@@@@@@@",
   "e......TT.2@@@@@@@@@",
   ".TT.....TT.@@@@@@@@@",
   "TTTTT.a.wTT@@@@@@@@@",
   "T__TT.gwwwwwwwwwww.4",
   "___TTT.w3.w@@@@@@@@@",
   ".1__TT....w@@@@@@@@@",
   "f.._TTT..ww@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "unit",
    "water": false,
    "type": "dirtbuggy"
   },
   "3": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "4": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20
    }
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
    "unit": "tugboat",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": [
   5,
   5
  ],
  "unlocks": [
   10
  ]
 },
 {
  "world": 1,
  "mission": 10,
  "name": "SPIRAL JETTY",
  "devName": "SPIRAL JETTY",
  "width": 12,
  "height": 19,
  "grid": [
   "....jfeawwww",
   "d..T...jwwww",
   "ig.......www",
   "ww....2..www",
   "wwww.b..wwww",
   "wwwwwwwwwwww",
   "ww.cwwww...w",
   "w.d.wwww..T.",
   "wT.wwww.TT1T",
   "wwwww..TT.TT",
   "wwwwwwwwww.w",
   "w........w.w",
   "w.wwwwww.w.w",
   "w.w...kw.w.w",
   "w.w.3www.w.w",
   "w.w......w.w",
   "w.wwwwwwww.w",
   "w..........w",
   "wwwwwwwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "3": {
    "kind": "bonusgoal",
    "water": true,
    "target": "tugboat"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 10
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 50
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 50
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 50
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1,
     "wheel": 4
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 10
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": [
   7,
   5
  ],
  "unlocks": [
   11
  ]
 },
 {
  "world": 1,
  "mission": 11,
  "name": "BEWARE THE CRAB",
  "devName": "BEWARE THE CRAB",
  "width": 22,
  "height": 5,
  "grid": [
   "..a......d_df.__._.__@",
   "......@@...._dww_.._._",
   "2.a...@@..e.q.wwj.1.i.",
   "......@@.__c.dww_.__..",
   "..a......d....___..__@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "steamshovel"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 3
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "q": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   12
  ]
 },
 {
  "world": 1,
  "mission": 12,
  "name": "WHEN CRABS ATTACK",
  "devName": "EVEN MORE CRABS",
  "width": 14,
  "height": 15,
  "grid": [
   "T__.2..._j@@@@",
   "k._.q..__.@@@@",
   "g..____...@@@@",
   "@...T1_.___@@@",
   "@TTT__q....@@@",
   "@..T.......@@@",
   "@@T.T..q....@@",
   "@@..TTT...TT@@",
   "@@.T.TTTTTTe@@",
   "@@@eigg.de.g.@",
   "@@@wwwwwwwwww@",
   "@@@wwwwwwwwww@",
   "@@@@ef.gece..e",
   "@@@@ebae.g.ig.",
   "@@@@.hege..ege"
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
    "target": "dirtbuggy"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "forklift"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10
    }
   },
   "q": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "forklift": 10
  },
  "center": [
   6,
   4
  ],
  "unlocks": [
   13
  ]
 },
 {
  "world": 2,
  "mission": 1,
  "name": "DEFENDER SAVES THE DAY",
  "devName": "QUEST",
  "width": 32,
  "height": 6,
  "grid": [
   "@@@~T@@@wwwwwwwwww@@@@@@@...@@@@",
   "@.h..Twwwwwwww...wwwwwww.T..T@ww",
   "......w.c....w..dw....w.......ww",
   "aT...fw...z..w...w..z.w...1...w2",
   "@.....wwwwwwwwk..wwwwwww...Te@ww",
   "@@a..@@@wwwwwwwwww@@@@@@@...@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "defender"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "forklift"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 40,
     "energy": 1
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 5
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 10
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
    "unit": "buggy",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1,
     "wheel": 4,
     "yellow": 25
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 15,
     "wheel": 4,
     "energy": 1
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25
    }
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "q": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   }
  },
  "inventory": {
   "steamshovel": 10
  },
  "center": [
   26,
   3
  ],
  "unlocks": [
   2,
   3
  ]
 },
 {
  "world": 2,
  "mission": 2,
  "name": "DANGER RIVER",
  "devName": "DANGER RIVER",
  "width": 15,
  "height": 6,
  "grid": [
   ".a..c.___.w._.g",
   ".Ta.a._...w._..",
   ".e.b___.www._.2",
   ".f.__..qwc___..",
   "c.._..www._T...",
   "T.a_.ww..._...1"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "dirtbuggy"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "steamshovel"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "q": {
    "kind": "monster",
    "water": false,
    "type": "gator"
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": []
 },
 {
  "world": 2,
  "mission": 3,
  "name": "WHAT'S A DOZER?",
  "devName": "WHAT'S A DOZER?",
  "width": 12,
  "height": 9,
  "grid": [
   "g_..._f.TTTT",
   "__._..._Tp.n",
   "...__d_wb.2.",
   "._d___wwTo..",
   ".___....T.1m",
   "e.c____.TTTT",
   "bb...d___..h",
   "..bwwwwwwwww",
   "l.wwi..k..j."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "dozer"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
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
     "yellow": 3
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 2
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "n": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 15
    }
   },
   "o": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 10,
     "green": 10
    }
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   4
  ]
 },
 {
  "world": 2,
  "mission": 4,
  "name": "THE LONG ROAD",
  "devName": "THE LONG ROAD",
  "width": 22,
  "height": 13,
  "grid": [
   "@@@@@@@@@@@@@@@.......",
   "@@@@@@@@@@@@@@@.......",
   ".@..e...@TTT......1...",
   ".@.@@@@.@.iTTT.....i..",
   ".@....@i@...TTT.......",
   ".@@@@.@.@.ab.@@@@@@@@@",
   "......T...i........g..",
   ".@@@@.@@@@@@.@.@@@@@@.",
   ".@c...@......@.....h@.",
   ".@.@@@@.@@@@@@@@@.@.@.",
   ".@.@....@d........@...",
   ".@.@@@@@@.@@@@@@@@@@@.",
   "2@f.......@e.........."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "gas_station"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 55,
     "green": 5,
     "wheel": 4
    }
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 5
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10,
     "blue": 5
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10,
     "blue": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 10
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
     "blue": 10
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "j": {
    "kind": "unit",
    "water": false,
    "type": "treebot"
   }
  },
  "inventory": {
   "forklift": 10
  },
  "center": null,
  "unlocks": [
   5
  ]
 },
 {
  "world": 2,
  "mission": 5,
  "name": "CRAB FOREST",
  "devName": "CRAB FOREST",
  "width": 15,
  "height": 10,
  "grid": [
   ".c.a.ca.1.k._.2",
   "TTT......a.._a.",
   ".a.TT..TTT.T_ie",
   "....cTT..cTh__w",
   "TT..a..T....aT.",
   "h.TTTh..T.TTT.h",
   "....TTTT.T...c.",
   ".d........c...j",
   "_....h...c..b._",
   "__.g____....___"
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
    "target": "snail"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 1
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 5
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
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
     "blue": 25,
     "green": 20,
     "energy": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "energy": 5
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 20
   }
  },
  "inventory": {
   "duck": 5
  },
  "center": [
   9,
   1
  ],
  "unlocks": [
   6,
   7
  ]
 },
 {
  "world": 2,
  "mission": 6,
  "name": "FISH LAKE",
  "devName": "FISH LAKE",
  "width": 24,
  "height": 7,
  "grid": [
   "wwgwwwwewwwwawwwwwwwwwww",
   "awwww____wwwwwwwwwwwwwww",
   "ewwww.d._wwTTTTT__TTTTTw",
   "wwwww____ww..fTi_T_T__Te",
   "w..ewwwwaww.c.TbTi_T2_Tw",
   "w1.awwwewww...T_TTT_TTTw",
   "wwwwwwwwwhwwwwwawwwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "steamshovel"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "fish"
   },
   "a": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 1
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 15,
     "blue": 25,
     "energy": 1
    }
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 25
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
   "freighter": 10,
   "fish": 10
  },
  "center": [
   3,
   3
  ],
  "unlocks": [
   8,
   9
  ]
 },
 {
  "world": 2,
  "mission": 7,
  "name": "LEAP FROGS",
  "devName": "FROGGER",
  "width": 9,
  "height": 12,
  "grid": [
   "ww.ghwwww",
   "wwT1Twwww",
   "wwwd.bwww",
   "wwwwwfwww",
   "wbwwwww.b",
   ".e.wwwwwe",
   ".wwwbwwww",
   "www..ww..",
   "ww.ewwww.",
   "wwwwwwwww",
   "wwwe2awww",
   "wccccccww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "frog"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
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
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 3
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
     "yellow": 5
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 3
   }
  },
  "inventory": {},
  "center": [
   5,
   3
  ],
  "unlocks": [
   9,
   10
  ]
 },
 {
  "world": 2,
  "mission": 8,
  "name": "PUSH COMES TO SHOVE",
  "devName": "SOKOBAN",
  "width": 16,
  "height": 10,
  "grid": [
   "T.T.TTT.TT.b...T",
   "T...TT.TT...Tb.T",
   "..gTaTTTT.T..b..",
   "T.b.b.2.T.Tbb..T",
   "..T...T.T1T.TTTT",
   "..T..g..TTT...TT",
   "TgT..T..T@~TT.TT",
   "..T.Tg.....T..TT",
   "..g...T..b..bb.T",
   "TT...Tf.bdb.b..T"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "dozer"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "frog"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 10
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "dozer"
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 1
    }
   },
   "f": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 2,
     "energy": 1
    }
   }
  },
  "inventory": {},
  "center": [
   15,
   2
  ],
  "unlocks": []
 },
 {
  "world": 2,
  "mission": 9,
  "name": "CANALS",
  "devName": "WATERMAZE",
  "width": 18,
  "height": 14,
  "grid": [
   "...w.dw...w..w..ww",
   ".w.wwwww..a.www.wa",
   ".a.....ww...wew.b.",
   ".w.gww..a.w.www...",
   "bw..waw...w..w..ww",
   ".w....w.w1wwgwwaww",
   "...awww.www....w..",
   "wwww.w...w..wwawkw",
   "w.f..w...wc...wjim",
   "TTT_T____n___TTT_T",
   ".T.T.._.....__..T.",
   "_.._.h.l.h.l..._.T",
   "..T..._........T..",
   "....T...2..._....T"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "marina"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "fish"
   },
   "a": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "marina",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "g": {
    "kind": "unit",
    "water": false,
    "type": "steamshovel"
   },
   "h": {
    "kind": "monster",
    "water": false,
    "type": "crab"
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
    "unit": "fish",
    "uses": 10
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "l": {
    "kind": "monster",
    "water": false,
    "type": "gator"
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "n": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   }
  },
  "inventory": {
   "steamshovel": 10
  },
  "center": [
   5,
   5
  ],
  "unlocks": [
   10
  ]
 },
 {
  "world": 2,
  "mission": 10,
  "name": "CRAB ISLANDS",
  "devName": "CRAB ISLANDS",
  "width": 28,
  "height": 12,
  "grid": [
   "wwwwwww@@@@@@@@@@@@@@@@@@@@@",
   "wwh.wwwwwwwwwwwwwwwwwwwwwww@",
   "wwcf.@@@@@@@@@@@@@@@@@@@@@w@",
   "wwwd.www@@wwgww@@wwwic.ww@w@",
   "wwwwwwwbwwwwwwwwwwww.fwww@w@",
   "wewwwwwwwww..d.wwaww..dww@w@",
   "@@@@@@@ww...1..wwwwwwwwwj@w@",
   "@@www@@wwwwc..www@@@@@@@@@w@",
   "@@w@2@@wwwwwwwwew@@wwwww@@w@",
   "@@w@@@@@@@@@@@@@@@@w@@@w@@w@",
   "@@wwwwwwwwwwwwwwwwww@@@wwww@",
   "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
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
    "target": "marina"
   },
   "a": {
    "kind": "unit",
    "water": true,
    "type": "freighter"
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 10
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "energy": 1
    }
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 25
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "energy": 1
    }
   },
   "g": {
    "kind": "building",
    "water": true,
    "type": "marina"
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 10
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 10
   },
   "j": {
    "kind": "plan",
    "water": true,
    "unit": "marina",
    "uses": 10
   }
  },
  "inventory": {
   "freighter": 10
  },
  "center": [
   12,
   6
  ],
  "unlocks": [
   11
  ]
 },
 {
  "world": 2,
  "mission": 11,
  "name": "TWO AND A HALF",
  "devName": "TWO WORLDS",
  "width": 17,
  "height": 9,
  "grid": [
   "wbw_1@@.dg.g@@k@@",
   "w_w_w@@d..T.@@l2@",
   "wwcwww@@gTg.n@@T@",
   "@w_w_w@@j..T.@@i@",
   "@w_w_w@@T.Tg.@@.@",
   "@cwwwc@@g..iT@@p.",
   "@@w__ww@@.T..h@@.",
   "@@ww_wa@@...ww@@.",
   "@@fwwa_@@gTTwe@@."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "tugboat"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "a": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "buggy",
    "uses": 10
   },
   "c": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 10
   },
   "f": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "i": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "green": 30,
     "blue": 30,
     "energy": 1
    }
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 4,
     "wheel": 4,
     "energy": 1
    }
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 1
    }
   }
  },
  "inventory": {
   "frog": 10
  },
  "center": null,
  "unlocks": [
   12
  ]
 },
 {
  "world": 2,
  "mission": 12,
  "name": "ON THE RUN",
  "devName": "DOUBLE-RACE",
  "width": 28,
  "height": 11,
  "grid": [
   "@b.......c.......m...@....c.",
   "@....................@..i...",
   "@@@________________.c@......",
   "..._TTTT.TTT.TTTTT_..@@@@@@.",
   ".f._T.eT..gTeTe..._..___.j@.",
   "..._T.TTTT.TTTTTTT_.._a_h1@c",
   "@.._T.Te.T......eT_..___.l@.",
   "@.._T_TT_TT_TTTTTT_..@@@@@@.",
   "@..________________..@......",
   "@c...................@..2k..",
   "@......m......c......@.c...."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "frog"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "gas_station"
   },
   "a": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 10
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
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5
    }
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 1
   },
   // custom
   "m": {
        kind: "pile",
        water: false,
        contents: { energy: 1 }
    }
  },
  "inventory": {
   "buggy": 10
  },
  "center": [
   3,
   1
  ],
  "unlocks": [
   13
  ]
 },
 {
  "world": 3,
  "mission": 1,
  "name": "STONE WALL",
  "devName": "TEAM SOKOBAN (5)",
  "width": 18,
  "height": 8,
  "grid": [
   "TT.......T...fwwww",
   "..aaa..aa...wwwwww",
   ".a...aa..a....ww1w",
   "a2.c..T..a...zzwww",
   "a..c.....a....zwwg",
   "Ta...aa.ea....wwww",
   ".Taaa..aa..Twwwwww",
   "T.........TT..bwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "duck"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "frog"
   },
   "a": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "c": {
    "kind": "unit",
    "water": false,
    "type": "dozer"
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "frog",
    "uses": 10
   },
   "g": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   }
  },
  "inventory": {
   "dozer": 5
  },
  "center": null,
  "unlocks": [
   2,
   3
  ]
 },
 {
  "world": 3,
  "mission": 2,
  "name": "RIVERMAZE",
  "devName": "WATER PAC-MAN (2)",
  "width": 19,
  "height": 17,
  "grid": [
   "___________________",
   "_age___________ega_",
   "_g_gcwwwwewwwwcg_g_",
   "_ggg__w_____w__ggg_",
   "___g__w_____w__g___",
   "___g_ggggggggg_g___",
   "__gggg___h___gggg__",
   "__g____ww1ww____g__",
   "__gggggwdddwggggg__",
   "__g____wwwww____g__",
   "__g______w______g__",
   "__gggggggfggggggg__",
   "____g_________g____",
   "_gggg_wwiwiww_gggg_",
   "_g__gcw__2__wcg__g_",
   "_agge_wwiwiww_egga_",
   "___________________"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "duck"
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
     "energy": 1
    }
   },
   "b": {
    "kind": "building",
    "water": true,
    "type": "marina"
   },
   "c": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 1
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "i": {
    "kind": "pile",
    "water": true,
    "contents": {
     "wheel": 1
    }
   }
  },
  "inventory": {
   "tugboat": 10
  },
  "center": null,
  "unlocks": []
 },
 {
  "world": 3,
  "mission": 3,
  "name": "NAVAL SUPPORT",
  "devName": "NAVAL BACKUP (3)",
  "width": 31,
  "height": 10,
  "grid": [
   "T.....TT...wwwaaawwrww__..T....",
   "h.w.c..__wwwwaaiaawwrwwww__..12",
   "..w..wwwwwwwwwwbwwwrr..qwwww_..",
   "..wwww..__wwwwwwwwwwr.T....ww_.",
   "......c.wwwwww____ww_.TTT......",
   "TT..T..ww__ww_.....w_..T.qTTTT.",
   "TTTTT..w...qw...T..iww......qT.",
   "...d.qww..T.w..T..q..www.dTT...",
   "..wwwww.qT.....TT..T...w...TTT.",
   "q........TT.d.TTg.TT..q..T....."
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
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "b": {
    "kind": "unit",
    "water": true,
    "type": "tugboat"
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25
    }
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 2
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 20
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25
    }
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 5
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "i": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 2
   },
   "q": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "tugboat": 2
  },
  "center": null,
  "unlocks": [
   4
  ]
 },
 {
  "world": 3,
  "mission": 4,
  "name": "TREEBOT IN THE FOREST",
  "devName": "TREEBOT IN THE FOREST (4)",
  "width": 17,
  "height": 20,
  "grid": [
   "@.T.@....T.@....a",
   "@.@.@@.@.@@@@@.@@",
   "@2@.b..@..@..T...",
   "@@@@@@@@@.@.@@@@.",
   "@...@.....@..cb@.",
   "@.@.@T@@@@@@@@@@.",
   ".b@.@.....@......",
   ".@@.@@@@@.@T@@@@@",
   ".........b@.....@",
   ".@T@@@@@@@@@@@@.@",
   ".@...@.@........@",
   ".@@@.@.T.@@T@@.@@",
   ".@.@b@@@@@...@..b",
   "T@.@...@.@.@.@@@@",
   ".@.@@@.@.@.@....b",
   ".@.....@.@.@@@@@.",
   ".@@@@T@@.@.......",
   "..b.@.@..@@@@@@@T",
   "@@@.@.@.@@.......",
   "1dT.@...T..@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "buggy"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "treebot"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 25,
     "green": 10
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 10
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   }
  },
  "inventory": {},
  "center": [
   15,
   2
  ],
  "unlocks": [
   5
  ]
 },
 {
  "world": 3,
  "mission": 5,
  "name": "STONEHENGE",
  "devName": "TIGHT SOKOBAN (1)",
  "width": 23,
  "height": 15,
  "grid": [
   "www@@@@@@@Tf...T.1T@@@@",
   "www@@@@@@TT..bbT..T@_.@",
   "w2w@ww.......b.b.TT@_@_",
   "www@ww...g...b.b.TT@_@_",
   "@@w@ww.TTT.T..b.TTT@@_@",
   "@@w@wwbaT..TT..TTTT@@@@",
   "@@wwww.T.g.TTT.TTTT@@@@",
   "@@@www.b.b.TTT...TT@@@@",
   "@@@hww...T.TTTTT.TT@@@@",
   "@@@wwwg.TT.TTTT..TT@@@@",
   "@@@@@@@@@@@TTTT.TTT@@@@",
   "@@@@@@@@_@@.TT.b.TT@@@@",
   "@@@@@@@_@@@.TTb...T@@@@",
   "@@@@@@.@__@T.bdbbTT@@@@",
   "@@@@@@@_@@@TT.b...T@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "dozer"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "fish"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 10
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "dozer"
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 1
    }
   },
   "f": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 1
    }
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 2,
     "energy": 1
    }
   }
  },
  "inventory": {},
  "center": [
   15,
   2
  ],
  "unlocks": [
   6,
   7
  ]
 },
 {
  "world": 3,
  "mission": 6,
  "name": "STEAM-POWERED ISLAND",
  "devName": "STEAM-POWERED ISLAND (6)",
  "width": 20,
  "height": 10,
  "grid": [
   "@@@wexxw...xxwwxw@@@",
   "@@wwwwww.1.wwcwwzw@@",
   "@@dxxwwx.f.wwxxwwx@@",
   "@wwwwwww@@@wwwgwwww@",
   "@xxwwxxw@@@xxwwxxww@",
   "@~wwwww@@@@@wwwwwdzw",
   "xwwxxwb@@@@@wxxwwxxw",
   "wwwwwww@@@@@wwwwwwww",
   "wxxwwxx@@@@@xwwxxwwx",
   "a..wwww@@@@@wwzwwww2"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "steamshovel"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "defender"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "wheel": 4,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "gas_station",
    "uses": 10
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "robot_lab",
    "uses": 10
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 40,
     "green": 5
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 5
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 25,
     "yellow": 25,
     "green": 10
    }
   },
   "z": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   }
  },
  "inventory": {
   "steamshovel": 10
  },
  "center": [
   4,
   6
  ],
  "unlocks": [
   8,
   9
  ]
 },
 {
  "world": 3,
  "mission": 7,
  "name": "THREE ROOMS",
  "devName": "THREE ROOMS (7)",
  "width": 13,
  "height": 12,
  "grid": [
   ".......cde...",
   "...........a.",
   ".j.h.f.i.g...",
   ".............",
   "..b...b...b..",
   "TT.TTT.TTT.TT",
   "T...T...T...T",
   "T...T...T...T",
   "T.s.T.s.T.ssT",
   "T___T___T___T",
   "T_k_T_1_T_2_T",
   "TTTTTTTTTTTTT"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "snail"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "dumptruck"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "dumptruck"
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 2
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 5
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 105
    }
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 90
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 6
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 3
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 10
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 5
    }
   },
   "s": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "z": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   }
  },
  "inventory": {
   "dumptruck": 10
  },
  "center": [
   5,
   3
  ],
  "unlocks": [
   9,
   10
  ]
 },
 {
  "world": 3,
  "mission": 8,
  "name": "BLOCKADE",
  "devName": "WATER CRAB BLOCKADE (8)",
  "width": 30,
  "height": 10,
  "grid": [
   ".......wwwwwwwwwwwwwww..__....",
   "...k...wwwwrwwrrwlwwrw..._..2.",
   "..www..wwrwlwwwrrwwrrw...__...",
   "..jwwwwwwrrwwwwwwrwwww....____",
   "..www..wwrwwwwwwwwwrww......__",
   "..iww..wwwwwrwwwrwwrlw...k..g.",
   "..www..wwwwwrwlrrwwwww..www...",
   "..hw...rrwwwrwwwwwrrwwwwwfw1..",
   "...a...wwwwrwwwrwwrwww..www...",
   ".bcden.wwwwwwwwrwwwwww........"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "steamshovel"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "gas_station"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "freighter",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "marina",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "wheel": 6,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 40,
     "green": 5,
     "energy": 5
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 120,
     "yellow": 50,
     "energy": 10
    }
   },
   "k": {
    "kind": "building",
    "water": true,
    "type": "marina"
   },
   "l": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 10
   }
  },
  "inventory": {
   "snail": 10
  },
  "center": null,
  "unlocks": []
 },
 {
  "world": 3,
  "mission": 9,
  "name": "BACK AND FORTH",
  "devName": "TWO WORLDS ADVANCED (9)",
  "width": 22,
  "height": 8,
  "grid": [
   "wwrrrwwwiwwwwwwww.q.@s",
   "wwigvk..f..f...ww...@f",
   "wwwwwwwwwwwwwwwfeww_@l",
   "@@@@@@@@@@@@@@@@@@@_@.",
   "rrrwwwwwwwxxxw2www@_@.",
   "__r_bcw.hjTu..t.1w@_@.",
   "_rwwrr.wwwxxxwrflw@_@.",
   "arwwdrwwowmxxwrwww@..."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "anything"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "dirtbuggy"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "dirtbuggy"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "yellow": 5
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 1
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "buggy",
    "uses": 1
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 1
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "wheel": 4
    }
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 1
   },
   "i": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 10
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 1
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "tugboat",
    "uses": 1
   },
   "m": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 25,
     "green": 20
    }
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 1
   },
   "o": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 1
   },
   "p": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 5
    }
   },
   "q": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 15,
     "wheel": 2
    }
   },
   "s": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 1
   },
   "t": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "u": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 2
    }
   },
   "v": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 1
   }
  },
  "inventory": {
   "duck": 1
  },
  "center": [
   16,
   5
  ],
  "unlocks": [
   10
  ]
 },
 {
  "world": 3,
  "mission": 10,
  "name": "THE QUEST",
  "devName": "BIG QUEST (10)",
  "width": 35,
  "height": 16,
  "grid": [
   "@TTTT@@@@@@@@@.a...@@.......@@@@@@@",
   "Te.dTT..g..TT..z._.TT.@@@@@.@@@@@@@",
   "T.a..TT.....TT._.i.@@@@k....@@.a.@@",
   "Tb.cTTTT...hT...._zTT.@@@@@@@.....@",
   "@TTTTT@@.@@@@@__a..@@..............",
   "@@@@@@@@.@@j@@@@@@@@@@.@@@@@wwwxxxw",
   "@p@......c@............@@o@@xxwvxww",
   "@.@f@@@@@@@@@@@@@@@@@@@@@.@@wwwwwwx",
   "@.@@@....@@@@@@@@@@@......@@wxxxxww",
   "@.....@@......@@@@.@.@@@@@@@TTTTTTT",
   "@@@@@@@@@@@@@.@@@@@@.@@@@@@@xxwwxxx",
   "@@@.._.w..v_.___@@m....l.@@.wywwwwx",
   "@_.u...w._...._..@@_____@@..xwxxxyx",
   "12u__._w.q.__..n.T..........wwxxwwx",
   "@......w..__.._..@@_____@@.........",
   "@@@__..w....v._.@@.h...b.@@@@@@@@@@"
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
    "target": "dumptruck"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 20,
     "wheel": 6,
     "energy": 1
    }
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25
    }
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
     "green": 20
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 40,
     "green": 5
    }
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 10
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 10
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10
    }
   },
   "n": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "q": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 10
   },
   "u": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "v": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "y": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "dumptruck": 10
  },
  "center": [
   5,
   5
  ],
  "unlocks": [
   11
  ]
 },
 {
  "world": 3,
  "mission": 11,
  "name": "SCORPION MAZE",
  "devName": "SCORPION MAZE (11)",
  "width": 22,
  "height": 18,
  "grid": [
   "..ab2.....@@@@@@@@@@@@",
   "........ww@@@@@@@@@@@@",
   "wwwwwwwwww@@....@@@@@@",
   "w_.._w__._@@....@@@@@@",
   "._..ww_...@@....@@@@@@",
   "...____._.......@@@@@@",
   "._......____.@@@@@@@@@",
   "._.__c_._ww_.@@@@@@@@@",
   "...__......_.@@@@@@@@@",
   "@@@@@@@.__._......c...",
   "@@@@@@@.______._____._",
   "@@@.........._._....._",
   "@@@....@@@@@._._._____",
   "@@@....@@@@@.c._...w..",
   "@@@....@@@@@__._.__w_.",
   "@@@@@@@@@@@@wwwwwwwwww",
   "@@@@@@@@@@@@wdb.d...f.",
   "@@@@@@@@@@@@d.d.e1gddd"
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
    "target": "frog"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "steamshovel"
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 1
    }
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
    "unit": "frog",
    "uses": 1
   },
   "g": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   }
  },
  "inventory": {},
  "center": [
   3,
   3
  ],
  "unlocks": [
   12
  ]
 },
 {
  "world": 3,
  "mission": 12,
  "name": "THE FINAL SHOWDOWN",
  "devName": "THE FINAL BATTLE (12)",
  "width": 28,
  "height": 20,
  "grid": [
   "...u___....@.2.@..u...._...T",
   "TTT......__@@w@@._____u..TTT",
   "qwTTTT__..u..b.....u...TTTtw",
   "wrr._TTT.__....___u.__TTwrrw",
   "wrw____T.u..TTTTTTT..TT_rwww",
   "vwwrww_TTTTTTv1__TTTTTwwwwrr",
   "rrww.v._wwwww_vuuwwwwww.w.__",
   ".v_wwwww..__wwwwwww..v..www_",
   "wwww.v.wwwT._T_Tv.w..wwww.v.",
   "T____...._..m...T.._T___....",
   "_...lT____T____TT__l...._.ww",
   "_T_TTT_..........._TTTTT____",
   "_........ywwwwww..........._",
   "wwwy..wwww.o.z.wy.wwywwwww._",
   "_zcwwyw.c..f...gwww..z.c.yww",
   "_d..cz.e..z...c....c..bbz.d_",
   ".bbbbb.....c......h.bb..bbb.",
   "bi.j..bb............b...j.ib",
   "..k....b..aa.....aa..bb..k..",
   ".n.p..b_______________b.p.n."
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
    "target": "defender"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 10,
     "wheel": 4,
     "energy": 1
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
     "energy": 3
    }
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
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
     "yellow": 250
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 250
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 20
    }
   },
   "l": {
    "kind": "building",
    "water": false,
    "type": "robot_lab"
   },
   "m": {
    "kind": "building",
    "water": false,
    "type": "gas_station"
   },
   "n": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 250
    }
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 10
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 250
    }
   },
   "q": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 10
   },
   "t": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 10
   },
   "u": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "v": {
    "kind": "monster",
    "water": false,
    "type": "gator"
   },
   "y": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {
   "dirtbuggy": 10
  },
  "center": [
   14,
   5
  ],
  "unlocks": []
 },
 {
  "world": 4,
  "mission": 1,
  "name": "BUILD A SPEEDBOAT",
  "devName": "INTRODUCE SPEEDBOATS",
  "width": 11,
  "height": 14,
  "grid": [
   "@@wwwwwww@@",
   "@wwh.wwwww@",
   "wwwwwwwewww",
   "wwwwgwfwwrr",
   "wwrwwwwwwr2",
   "rwwdw1wdwrj",
   "wwwwwwwwwrw",
   "wwrwwwwwwrw",
   "wwwww.a.wrw",
   "xxxxx.xxxxx",
   "xxxxxxxxxxx",
   "wxxxxxxxwww",
   "@xx.bxxwwi@",
   "@@xxxxxxw@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "speedboat"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 10
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "speedboat",
    "uses": 10
   },
   "d": {
    "kind": "unit",
    "water": true,
    "type": "duck"
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 10
   },
   "f": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 30,
     "energy": 6
    }
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 15,
     "energy": 2
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 10,
     "energy": 2
    }
   },
   "i": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 10
   },
   "j": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [
   2,
   3
  ]
 },
 {
  "world": 4,
  "mission": 2,
  "name": "MYSTERIOUS WHIRLPOOLS",
  "devName": "WHAT'S THAT SWIRLY THING?",
  "width": 15,
  "height": 8,
  "grid": [
   "@@wbwwdrriwww@@",
   "@bwcwbwrrw1rk2@",
   "dwwawwwrfwwrrrr",
   "wbwwwbrrwewewge",
   "wwdbwwbrrwewwww",
   "wbcjdwcrewwweww",
   "@dwbbrrrrwwawe@",
   "@@bwwrkhrwfww@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "marina"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "frog"
   },
   "a": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "b": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5
    }
   },
   "c": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5
    }
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 1
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 1
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 1
   },
   "h": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 1
   },
   "i": {
    "kind": "plan",
    "water": true,
    "unit": "marina",
    "uses": 1
   },
   "j": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "k": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": []
 },
 {
  "world": 4,
  "mission": 3,
  "name": "SPEEDBOATS ON PATROL",
  "devName": "OUTRACE THE CRITTERS",
  "width": 21,
  "height": 9,
  "grid": [
   "@@crwwwrrrwrrrwrrrr@@",
   "@2wwerwrwwwwwgwwwwcw@",
   "rrrrwrwwwcrwwrrrrrwww",
   "wawrwrrrrrrrwewwwrwww",
   "wawwwrwwwrwrrrrwwrw1w",
   "wawrwwwrwwwgwwrwwrwwh",
   "rrrrrrrrrwwrwrrwwrrf.",
   "@wbwecwwrwwrwwwwgwww@",
   "@@rrrrwwwerrwcrrrrw@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "fish"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "steamshovel"
   },
   "a": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 40,
     "red": 10,
     "blue": 10,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 10
   },
   "c": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "g": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 50,
     "wheel": 4,
     "energy": 1
    }
   },
   "h": {
    "kind": "plan",
    "water": true,
    "unit": "steamshovel",
    "uses": 1
   }
  },
  "inventory": {
   "speedboat": 10
  },
  "center": null,
  "unlocks": [
   4
  ]
 },
 {
  "world": 4,
  "mission": 4,
  "name": "THE BERMUDA RECTANGLE",
  "devName": "WHIRLPOOL PUZZLE",
  "width": 22,
  "height": 12,
  "grid": [
   "@@w5rwbwr3wcrcwnrzw5@@",
   "@qcrrrrlrwwrrrrrrrw4r@",
   "rrrr4wrrrrrrwwrwgrrrrr",
   "wbwcwyrewrwswwrwirwwow",
   "wwvwrrrwfrww1rrrrrmwww",
   "rrrrrwrrrrrrrry2rkwbww",
   "wfwrdwwsredwhrrrrrwwlw",
   "ww5rrqwwrtwawjrpwrrrrr",
   "whwgrrrprrrrrrrrorwwdw",
   "rrrrrjrrrwzwwrtrrrw5ww",
   "@wcnrwwkrrwwwrwdrwiwr@",
   "@@mrrwbw5rdw3rwvrrrr@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "frog"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "frog"
   },
   "3": {
    "kind": "whirlpool",
    "water": true,
    "channel": 21
   },
   "4": {
    "kind": "whirlpool",
    "water": true,
    "channel": 18
   },
   "5": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 1
   },
   "a": {
    "kind": "unit",
    "water": true,
    "type": "tugboat"
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 1
   },
   "c": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 1
    }
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "e": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "f": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   },
   "g": {
    "kind": "whirlpool",
    "water": true,
    "channel": 3
   },
   "h": {
    "kind": "whirlpool",
    "water": true,
    "channel": 4
   },
   "i": {
    "kind": "whirlpool",
    "water": true,
    "channel": 5
   },
   "j": {
    "kind": "whirlpool",
    "water": true,
    "channel": 6
   },
   "k": {
    "kind": "whirlpool",
    "water": true,
    "channel": 7
   },
   "l": {
    "kind": "whirlpool",
    "water": true,
    "channel": 8
   },
   "m": {
    "kind": "whirlpool",
    "water": true,
    "channel": 9
   },
   "n": {
    "kind": "whirlpool",
    "water": true,
    "channel": 10
   },
   "o": {
    "kind": "whirlpool",
    "water": true,
    "channel": 11
   },
   "p": {
    "kind": "whirlpool",
    "water": true,
    "channel": 12
   },
   "q": {
    "kind": "whirlpool",
    "water": true,
    "channel": 13
   },
   "s": {
    "kind": "whirlpool",
    "water": true,
    "channel": 14
   },
   "t": {
    "kind": "whirlpool",
    "water": true,
    "channel": 15
   },
   "u": {
    "kind": "whirlpool",
    "water": true,
    "channel": 16
   },
   "v": {
    "kind": "whirlpool",
    "water": true,
    "channel": 17
   },
   "y": {
    "kind": "whirlpool",
    "water": true,
    "channel": 19
   },
   "z": {
    "kind": "whirlpool",
    "water": true,
    "channel": 20
   }
  },
  "inventory": {},
  "center": null,
  "unlocks": [
   5
  ]
 },
 {
  "world": 4,
  "mission": 5,
  "name": "SHARK!",
  "devName": "SHARK PEN",
  "width": 20,
  "height": 10,
  "grid": [
   "@@awawwwwc@@@@@@@@@@",
   "@awcwwawawd@@@@2w@@@",
   "wwawwwwawawa@@@@www@",
   "wwww.wwwwwwww@@@@@w@",
   "ww....wwwww.....@@w@",
   "..e..www....wwwwwwww",
   "ww..wwwww.e..wwwwwww",
   "wwwwwwwww.....wwbwww",
   "@gw1wwwwwwbww.wwwww@",
   "@@fwwwwwwwwww..www@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "marina"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "frog"
   },
   "a": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "b": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "c": {
    "kind": "unit",
    "water": true,
    "type": "frog"
   },
   "d": {
    "kind": "unit",
    "water": true,
    "type": "freighter"
   },
   "e": {
    "kind": "unit",
    "water": false,
    "type": "steamshovel"
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "speedboat",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 100,
     "red": 25
    }
   }
  },
  "inventory": {
   "fish": 10,
   "frog": 10,
   "steamshovel": 10,
   "tugboat": 10,
   "marina": 10
  },
  "center": null,
  "unlocks": [
   6,
   7
  ]
 },
 {
  "world": 4,
  "mission": 6,
  "name": "ALLIGATOR WRESTLING",
  "devName": "CAGED SHARK",
  "width": 28,
  "height": 7,
  "grid": [
   "@@wwawwawwwwwrwwwwwrww@@@@@w",
   "@wwwwrrrrwwwrawrwwwwwww@@www",
   "wwwwrw2wdrwwwwwwrwrdwwr@www@",
   "wfwwreswwrwwrwwrwwwrwwwww1@@",
   "wwwwwrrrrwwwwrwwwwrwwwc@www@",
   "@@@wwwwwwawwrewrwwwwwww@@www",
   "@@wwwwawwwwwwwwwrwwwbb@@@@@w"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "gator"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "duck"
   },
   "a": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "b": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 40,
     "blue": 10,
     "red": 10,
     "energy": 1
    }
   },
   "c": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 50,
     "energy": 10
    }
   },
   "d": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "e": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   },
   "s": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "speedboat",
    "uses": 10
   }
  },
  "inventory": {
   "duck": 5
  },
  "center": [
   10,
   3
  ],
  "unlocks": [
   8,
   9
  ]
 },
 {
  "world": 4,
  "mission": 7,
  "name": "THE TWO TOWERS",
  "devName": "FIRST TOWERS",
  "width": 11,
  "height": 15,
  "grid": [
   "errc1worrnw",
   "wrwcwcwrwwg",
   "wrrrcwwrwwr",
   "wwwrr2rr.rr",
   "rrwwjB.wwww",
   ".wwwwwwwrww",
   "wrwwawawwrw",
   "wwrwwwwwwww",
   "rwwrwfwwprw",
   "rrwrwwwrwww",
   "wwwrkwwlrww",
   "wrr....rwwr",
   "hrdwdw.drww",
   "rdddwddwwww",
   "wddmwdwddrw"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "frog"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "boulder"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "guard_tower",
    "uses": 2
   },
   "B": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 5
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 1
   },
   "f": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 5
   },
   "h": {
    "kind": "plan",
    "water": true,
    "unit": "dozer",
    "uses": 2
   },
   "i": {
    "kind": "plan",
    "water": true,
    "unit": "marina",
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
    "water": true,
    "contents": {
     "blue": 50,
     "energy": 1
    }
   },
   "l": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 50
    }
   },
   "m": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   },
   "n": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 1
   },
   "o": {
    "kind": "plan",
    "water": true,
    "unit": "steamshovel",
    "uses": 1
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {},
  "center": [
   5,
   1
  ],
  "unlocks": [
   9,
   10
  ]
 },
 {
  "world": 4,
  "mission": 8,
  "name": "BATTLE AT CRABBY BEACH",
  "devName": "ISLAND IN THE MIDDLE",
  "width": 31,
  "height": 8,
  "grid": [
   "@@@@@@wwwwwwwwwwwwwwwwwwww@@@@@",
   "@@@@@@wilwrwwwwww...wwwwww@@@@@",
   "@oww@@wwwiwww.p.T.z..wwwww@@@ww",
   "wj1owwiwwwww...f.new.w.wwwwww3w",
   "wo2lwwwlwww.g._.n..wwwwwwwwwwbw",
   "@oww@@wwrwww..mw.Ta.nwwwww@@@ww",
   "@@@@@@wwiwwwwwww....wwwwww@@@@@",
   "@@@@@@wwwwwwwwwwwwwwwwwwww@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "tugboat"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "robot_lab"
   },
   "3": {
    "kind": "unit",
    "water": true,
    "type": "duck"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 80,
     "yellow": 80,
     "energy": 3,
     "wheel": 4
    }
   },
   "z": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 20,
     "blue": 75
    }
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 5
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 5
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
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
     "yellow": 5
    }
   },
   "j": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 25
    }
   },
   "l": {
    "kind": "pile",
    "water": true,
    "contents": {
     "wheel": 2
    }
   },
   "m": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 15,
     "energy": 1
    }
   },
   "n": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "o": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "p": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 5
   }
  },
  "inventory": {},
  "center": [
   3,
   4
  ],
  "unlocks": []
 },
 {
  "world": 4,
  "mission": 9,
  "name": "STRANGE CURRENTS",
  "devName": "THE WHIRLPOOL MAMBO",
  "width": 15,
  "height": 15,
  "grid": [
   "@@@@@@@@@@baaa@",
   "1wwwww@@@wwwwww",
   "wwswww@@@rr65rr",
   "wwwws6@@@rr58rr",
   "@@@@@@@@@rr78rr",
   "@@@@@@@@@wwwwww",
   "wwwwww...wwwcww",
   "wwcwww...wwwwww",
   "wwwwww@@@@@@@@@",
   "rr31rr@@@@@@@@@",
   "rr34rr@@@7wswww",
   "rr24rr@@@wwwwww",
   "wwwwww@@@wwwsw2",
   "@wwww@@@@@@@@@@",
   "@w9ed@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "2": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   },
   "3": {
    "kind": "whirlpool",
    "water": true,
    "channel": 3
   },
   "4": {
    "kind": "whirlpool",
    "water": true,
    "channel": 4
   },
   "5": {
    "kind": "whirlpool",
    "water": true,
    "channel": 5
   },
   "6": {
    "kind": "whirlpool",
    "water": true,
    "channel": 6
   },
   "7": {
    "kind": "whirlpool",
    "water": true,
    "channel": 7
   },
   "8": {
    "kind": "whirlpool",
    "water": true,
    "channel": 8
   },
   "9": {
    "kind": "goal",
    "water": true,
    "target": "anything"
   },
   "s": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "a": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "c": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "duck",
    "uses": 1
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "bonusgoal",
    "water": true,
    "target": "duck"
   }
  },
  "inventory": {
   "frog": 3
  },
  "center": [
   5,
   5
  ],
  "unlocks": [
   10
  ]
 },
 {
  "world": 4,
  "mission": 10,
  "name": "DIRE STRAITS",
  "devName": "DANGEROUS CHANNELS",
  "width": 22,
  "height": 12,
  "grid": [
   "2h@@w3w@@ww4ww@@@@@@@@",
   "5w@@bwr@@wwwww....@@@@",
   "@wa@@grb@@wwrww@@.@@@@",
   "@fw@@www@@wwrww@@..@@@",
   "@@ww@@rwg@@wwrww@@.@@@",
   "@@fb@@bww@@dwrwe@@..@@",
   "@@@ww@@rwr@@wwrww@@.@@",
   "@@@wi@@wgb@@wwrww@@..@",
   "@@@@wf@@rcw@@wwsww@@.@",
   "@@@@w3@@j4j@@ww1ww@@..",
   "@@@@@@@@@@@@@@@.@@@@@.",
   "@@@@@@@@@@@@@@@...kl.."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "forklift"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "forklift"
   },
   "3": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "4": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   },
   "5": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "s": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "g": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "a": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 10
   },
   "b": {
    "kind": "plan",
    "water": true,
    "unit": "speedboat",
    "uses": 1
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "forklift",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "tugboat",
    "uses": 10
   },
   "f": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "h": {
    "kind": "unit",
    "water": false,
    "type": "forklift"
   },
   "i": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 40,
     "red": 10,
     "blue": 10,
     "energy": 1
    }
   },
   "j": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 5,
     "energy": 1
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "guard_tower",
    "uses": 5
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 25,
     "yellow": 25
    }
   }
  },
  "inventory": {},
  "center": [
   7,
   5
  ],
  "unlocks": [
   11
  ]
 },
 {
  "world": 4,
  "mission": 11,
  "name": "ARCHIPELAGO",
  "devName": "LAND BRIDGES",
  "width": 18,
  "height": 12,
  "grid": [
   "wwwwwrwrzwwwxxxxaz",
   "wbcwwwwywwwzwwxxxw",
   "wdewrww.z..ywwzwww",
   "wwwwww....wwwrwwwz",
   "wwxwww.wz.ywzwwywr",
   "xxwww..wwwwwwyw.ww",
   "xwwww..Mwwzw....rr",
   "www.M.....ww.wwrww",
   "wwwff.1.M....wrrrr",
   "wwwf..MMwwwwwwrhh2",
   "x34ww..wwwwwwrgwww",
   "xxwwwwwwwwwwwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "fish"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "buggy"
   },
   "3": {
    "kind": "unit",
    "water": true,
    "type": "frog"
   },
   "4": {
    "kind": "unit",
    "water": true,
    "type": "duck"
   },
   "a": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 10
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "freighter",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 40,
     "energy": 1
    }
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "speedboat",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 40,
     "red": 10,
     "blue": 10,
     "energy": 1
    }
   },
   "y": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "z": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": null,
  "unlocks": [
   12
  ]
 },
 {
  "world": 4,
  "mission": 12,
  "name": "MASTER AND COMMANDER",
  "devName": "MASTER AND COMMANDER",
  "width": 35,
  "height": 12,
  "grid": [
   "@@sxxwhwwwwwxwwdwwwwwfwrrww.wawbf@@",
   "@swhwhwwwwwwwzww.wwwwwwgwwwwwwwbww@",
   "xxwwwwhw.wwwwwzwwiwwwwww.wwwawwcwdw",
   "wwwxxxwwwwwzww.wwwwiwdwwwwwwa.wwwwe",
   "w1wwxxxxw.wwwwwwwwwwwwww.wwwwwwbwde",
   "wwwwwwxwwwwzwww.wwwwiwwwwwwwawwcwdw",
   "xswhwwhwwwwwwwwwwwiwwwwgw.wwwawwbww",
   "swswhwwxxwwwwwzwwwwdwwfrwwwww.wbwfw",
   "www@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
   "wwww.wwwwwwwwwwwwwwwwwwwwwwwwwww...",
   "@www.wwwswwswwswswswswwwwwwwwwtw.2.",
   "@@ww.wwwwwwwwwwwwwwwwwwwwwwwwwww..."
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
    "kind": "unit",
    "water": true,
    "type": "speedboat"
   },
   "b": {
    "kind": "unit",
    "water": true,
    "type": "freighter"
   },
   "c": {
    "kind": "unit",
    "water": true,
    "type": "tugboat"
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 5
    }
   },
   "e": {
    "kind": "pile",
    "water": true,
    "contents": {
     "blue": 40,
     "green": 5
    }
   },
   "f": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 25,
     "red": 25
    }
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 40,
     "red": 10,
     "blue": 10
    }
   },
   "h": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "i": {
    "kind": "unit",
    "water": true,
    "type": "frog"
   },
   "s": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "t": {
    "kind": "plan",
    "water": true,
    "unit": "fish",
    "uses": 1
   },
   "z": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   }
  },
  "inventory": {
   "speedboat": 15,
   "freighter": 10,
   "tugboat": 10,
   "guard_tower": 10,
   "marina": 10
  },
  "center": [
   3,
   3
  ],
  "unlocks": [
   13
  ]
 },
 {
  "world": 5,
  "mission": 1,
  "name": "DANGEROUS SWAMPS",
  "devName": "SWAMP INTRO",
  "width": 16,
  "height": 8,
  "grid": [
   "b..w..##__@###hg",
   "2.ww..f##___##.d",
   "www...####_##..@",
   "w.....######...@",
   "@..a.#####...1..",
   "@@...#####......",
   "....__##___...c.",
   "...f_###__@_...."
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
    "target": "duck"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 1
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 1
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 7
    }
   },
   "e": {
    "kind": "unit",
    "water": false,
    "type": "frog"
   },
   "f": {
    "kind": "unit",
    "water": false,
    "type": "duck"
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "dirtbuggy",
    "uses": 1
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 1
   }
  },
  "inventory": {},
  "center": [
   3,
   4
  ],
  "unlocks": [
   2,
   3
  ]
 },
 {
  "world": 5,
  "mission": 2,
  "name": "OFF ROAD RACING",
  "devName": "SWAMP BUGGY",
  "width": 15,
  "height": 8,
  "grid": [
   ".a.@#.Mbb...@@M",
   "....#.M######MM",
   ".##..MM####.##1",
   ".#...###.#####.",
   "@..MM#####@##..",
   "@..MM#b######.@",
   ".c.M###.#######",
   ".2.@##b####b##M"
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
    "target": "buggy"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 3
   }
  },
  "inventory": {},
  "center": [
   3,
   3
  ],
  "unlocks": []
 },
 {
  "world": 5,
  "mission": 3,
  "name": "FISH OUT OF WATER",
  "devName": "GATOR SWAMP",
  "width": 21,
  "height": 19,
  "grid": [
   "b.....###ww######...d",
   "####.#####2####...##.",
   "###.d.####ww###b####.",
   "b##..#############...",
   ".###...###########..#",
   "........#####.......#",
   "#.###...heeeh....##.#",
   "#.##..#..ai......##b.",
   "#.##...#.eee...#..##.",
   "#.##.#...www###...##.",
   "..##.##.wwww##..####.",
   ".##..##.wc..#....d##.",
   "....##..www...www..#.",
   "d######...wwwww1ww.#.",
   "...b#####....bwwww..b",
   "@@@@@@@@@@@@@@@@w@@@@",
   "@@@@@@@@@@@@@@@@w@@@@",
   "@@@@@@@@@@@wwwwww@@@@",
   "@@@@@@@@@@fgw@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "fish"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "fish"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 1
    }
   },
   "c": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 7
   },
   "d": {
    "kind": "monster",
    "water": false,
    "type": "gator"
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
    "water": true,
    "unit": "guard_tower",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "steamshovel",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "red": 25,
     "energy": 1
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "wheel": 4,
     "energy": 1
    }
   },
   "z": {
    "kind": "unit",
    "water": true,
    "type": "fish"
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": [
   12,
   10
  ],
  "unlocks": [
   4
  ]
 },
 {
  "world": 5,
  "mission": 4,
  "name": "T-REX LIVES!",
  "devName": "T-REX LIVES",
  "width": 15,
  "height": 16,
  "grid": [
   "##ccc..@@@@@@@@",
   "..ccc.w@@@@@@@@",
   "wwwdwww@@TTTT@@",
   ".h.e....TTkkTT@",
   ".##..h#@TTiiT@@",
   "w#..###@@@TT_@@",
   ".h.fw#.@@T_T@@@",
   "##.w...@@.@TT.@",
   "##.2.g.@@TTTT.@",
   "h...##.@@T.TTT@",
   "wwwwwww@i.T._@@",
   "ww..www@@TTT..@",
   "w##1.Tj.TTccTi@",
   "ww#..ww@.TccT@@",
   "bwwwwwb@@iT@.@@",
   "wawawaw@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "snail"
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
    "kind": "unit",
    "water": true,
    "type": "fish"
   },
   "c": {
    "kind": "unit",
    "water": false,
    "type": "frog"
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "defender",
    "uses": 2
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "f": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "g": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 5
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "fish",
    "uses": 1
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 1
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 1
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {},
  "center": [
   4,
   2
  ],
  "unlocks": [
   5
  ]
 },
 {
  "world": 5,
  "mission": 5,
  "name": "BOT VS. BEAST",
  "devName": "BATTLEBOTS",
  "width": 31,
  "height": 10,
  "grid": [
   "..@@@@....@...@@..@@@@....@@@..",
   "..................@@@...#......",
   "..d._###__#....e..@@@..##..##..",
   "@.e..##..e.d..c..@@ww..www..##.",
   "@#..b.e...f.#_..e@ww...##2c#wh.",
   ".#.b...e##e...._.gww...##ww##..",
   "..b.##..###.e.##1.ww..###wwi..@",
   "@__.e...ed...###_@@@....w.###.@",
   "..................@@@..#....#..",
   "...@@@@...@@......@@@@...@@...."
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "snail"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "snail"
   },
   "b": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 3
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
    "unit": "snail",
    "uses": 5
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 5
   },
   // custom
   h: {
    kind: "pile",
    water: false,
    contents: {
      wheel: 4, yellow: 15
    }
   },
   i: {
    kind: 'plan',
    water: true,
    unit: 'steamshovel',
    uses: 5
   }
  },
  "inventory": {},
  "center": [
   1,
   4
  ],
  "unlocks": [
   6,
   7
  ]
 },
 {
  "world": 5,
  "mission": 6,
  "name": "MEET REPAIRBOT",
  "devName": "REPAIRBOT!!",
  "width": 24,
  "height": 12,
  "grid": [
   "..............@@@@@@@@@@",
   ".ac.........k.@@@@@@@@@@",
   "..............@@@@@@@@@@",
   "w#www#www#wwww@@M......@",
   "w#www#www#wwww@....MM...",
   "w#www#www#ww1ww...f.Mg2.",
   "w#wjw#wjw#wwww@MM.......",
   "w#wjw#wjw#wwww@@..M..MM@",
   "###@###@###www@@@@@@@@@@",
   "###@###@###www@@@@@@@@@@",
   "...@...@...www@@@@@@@@@@",
   ".b.@.h.@.i.www@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "steamshovel"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "forklift"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "defender"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 10
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20,
     "green": 10,
     "yellow": 5,
     "energy": 1
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 4,
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "buggy",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 10
   },
   "g": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "j": {
    "kind": "pile",
    "water": true,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "wheel": 4
    }
   }
  },
  "inventory": {},
  "center": [
   3,
   3
  ],
  "unlocks": [
   8,
   9
  ]
 },
 {
  "world": 5,
  "mission": 7,
  "name": "PERPETUAL MOTION",
  "devName": "INFINITE ENERGY",
  "width": 26,
  "height": 16,
  "grid": [
   "@@@@@@@@@@@@@@@@@@@.......",
   "@###..##..#..#@@@@@.@@@@@.",
   "@.@@@@@@@@@@@#@...@.@2Ti..",
   "@......@@..#@.@.@.@.@@@@@@",
   "@@@@.@.@@#@##.@.@.@.......",
   "@....@..@#@@@@@.@f@@@@@@@T",
   "@.@@.@@.@...@@@.@.@.h.hhh.",
   "@Tc@.@@.@@@.@@@.@g@Mhh.hhM",
   "@@@@.@@.Tb@T@@@.@.@MMMTMMM",
   "@MM...@@@@@.@@@.@f@_e...e_",
   "@.a.......@.@@@.@.@_d_T_d_",
   "@.c.M.@@@.@..1..@g@_._._._",
   "@@@@@@@...@@@@@@@.@.......",
   "........@@@@@b@@@.@.......",
   ".@@@@@@@@@@@@T@@@.T.@@@@@@",
   "..............@@@@@@@@@@@@"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "treebot"
   },
   "a": {
    "kind": "unit",
    "water": false,
    "type": "treebot"
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 1
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 10,
     "blue": 20,
     "yellow": 5,
     "energy": 1
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "blue": 25,
     "green": 10
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 1
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 1
   },
   "h": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 1
   }
  },
  "inventory": {},
  "center": [
   13,
   10
  ],
  "unlocks": [
   9,
   10
  ]
 },
 {
  "world": 5,
  "mission": 8,
  "name": "HUNGRY PREDATORS",
  "devName": "DODGE'EM!",
  "width": 26,
  "height": 7,
  "grid": [
   ".##b.c#.b##b..#.w.b.wwwdww",
   "a...####...wc#.b##c#w1www3",
   ".b#c..b..###.b..#b..wwweww",
   "@@@@@@@@@@@@@@@@@@@@@@@@@@",
   "..ewwwwwrrwefrrrwwewwrrwww",
   "2.wr.rwwfwg.wwwfgr.rwwww.3",
   "..wfwewrewwwerrwwwewwrew.w"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": true,
    "target": "duck"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "frog"
   },
   "3": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "9": {
    "kind": "unit",
    "water": true,
    "type": "frog"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5,
     "energy": 1
    }
   },
   "b": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 1
   },
   "c": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "d": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 5,
     "energy": 1
    }
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "frog",
    "uses": 1
   },
   "f": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {
   "duck": 1
  },
  "center": [
   1,
   1
  ],
  "unlocks": []
 },
 {
  "world": 5,
  "mission": 9,
  "name": "DOUBLE TROUBLE",
  "devName": "SKIRMISHES",
  "width": 14,
  "height": 7,
  "grid": [
   "e1nmrwwww@@@@@",
   "@wmwmwwwwb@@@@",
   "@@3mwwrwwba@@@",
   "@@@@@@@@@@@@@@",
   "@@@2Td..l.hT@@",
   "@@@@cd...kzji@",
   "@@@@@....fgTw3"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "forklift"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "treebot"
   },
   "3": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "a": {
    "kind": "building",
    "water": true,
    "type": "marina"
   },
   "b": {
    "kind": "unit",
    "water": true,
    "type": "speedboat"
   },
   "c": {
    "kind": "building",
    "water": false,
    "type": "robot_lab"
   },
   "d": {
    "kind": "unit",
    "water": false,
    "type": "defender"
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
    "unit": "freighter",
    "uses": 10
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "forklift",
    "uses": 10
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 6
    }
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "j": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "k": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "l": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "m": {
    "kind": "monster",
    "water": true,
    "type": "gator"
   },
   "n": {
    "kind": "pile",
    "water": true,
    "contents": {
     "wheel": 4
    }
   }
  },
  "inventory": {
   "marina": 1,
   "robot_lab": 1,
   "speedboat": 3,
   "defender": 3
  },
  "center": [
   5,
   5
  ],
  "unlocks": [
   10
  ]
 },
 {
  "world": 5,
  "mission": 10,
  "name": "FOSSIL FUELING",
  "devName": "BOULDER GOAL",
  "width": 21,
  "height": 14,
  "grid": [
   "_..iwwwwwwwwwMMMMMwww",
   "_wwwwwrwww2wwM.MMwwcw",
   ".www1wrwwwwwww.awwwww",
   ".wwwwwTTMMTTTTbMMMwww",
   "..TT_.jp...._l.._wwTT",
   "___l_________...TTTTd",
   "................___..",
   ".MM.....k.o.....l____",
   ".MMM..m....TTTT___...",
   ".M..b....T....wwwwMM.",
   ".MMhMwwwwwwww.b..w_M.",
   ".lMMMMg...._wwewww__.",
   ".__..MMMMM.._wwww....",
   ".n__.........wwwf._MM"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "treebot"
   },
   "2": {
    "kind": "bonusgoal",
    "water": true,
    "target": "boulder"
   },
   "a": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 20
   },
   "b": {
    "kind": "monster",
    "water": false,
    "type": "boulder"
   },
   "c": {
    "kind": "pile",
    "water": true,
    "contents": {
     "green": 20,
     "energy": 2
    }
   },
   "d": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 20
   },
   "f": {
    "kind": "plan",
    "water": false,
    "unit": "dozer",
    "uses": 20
   },
   "g": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 5
    }
   },
   "h": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 25
    }
   },
   "i": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 20
    }
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 20
    }
   },
   "k": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 5
    }
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 3
    }
   },
   "m": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 8,
     "wheel": 2
    }
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 20
   },
   "o": {
    "kind": "unit",
    "water": false,
    "type": "buggy"
   },
   "p": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 1
    }
   }
  },
  "inventory": {
   "buggy": 10
  },
  "center": [
   10,
   7
  ],
  "unlocks": [
   11
  ]
 },
 {
  "world": 5,
  "mission": 11,
  "name": "BUILD YOUR OWN BATTLEFIELD",
  "devName": "BATTLEFIELD DESIGN",
  "width": 12,
  "height": 21,
  "grid": [
   "TTTTTTTTTTTT",
   "Tw..bcde..#T",
   "ww...af...##",
   "ww...pg...##",
   "ww.hijklm.##",
   "ww........##",
   "TTT......TTT",
   "MMMTTTTTTMMM",
   "MM.u..uu..MM",
   "@TT.qu..uTT@",
   "@@TTTTTTTT@@",
   "@@@TTTTTT@@@",
   "@@@@nsso@@@@",
   "@@@@..1.@@@@",
   "@@@TTTTTT@@@",
   "@@....._..@@",
   "@@.__.z...@@",
   "@@@...._z@@@",
   "@@@@wwww@@@@",
   "@@@@wwww@@@@",
   "@@@@@2w@@@@@"
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
    "target": "defender"
   },
   "a": {
    "kind": "pile",
    "water": false,
    "contents": {
     "energy": 10
    }
   },
   "b": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 100
    }
   },
   "c": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 200
    }
   },
   "d": {
    "kind": "pile",
    "water": false,
    "contents": {
     "red": 100
    }
   },
   "e": {
    "kind": "pile",
    "water": false,
    "contents": {
     "green": 100
    }
   },
   "f": {
    "kind": "pile",
    "water": false,
    "contents": {
     "wheel": 20
    }
   },
   "g": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "h": {
    "kind": "plan",
    "water": false,
    "unit": "robot_lab",
    "uses": 10
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "gas_station",
    "uses": 10
   },
   "j": {
    "kind": "plan",
    "water": false,
    "unit": "treebot",
    "uses": 10
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "dumptruck",
    "uses": 10
   },
   "l": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "guard_tower",
    "uses": 10
   },
   "n": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 5
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 10
   },
   "P": {
    "kind": "unit",
    "water": false,
    "type": "dumptruck"
   },
   "q": {
    "kind": "plan",
    "water": false,
    "unit": "snail",
    "uses": 10
   },
   "s": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20,
     "green": 10,
     "yellow": 5,
     "energy": 1
    }
   },
   "u": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "z": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "y": {
    "kind": "unit",
    "water": false,
    "type": "snail"
   }
  },
  "inventory": {},
  "center": [
   6,
   12
  ],
  "unlocks": [
   12
  ]
 },
 {
  "world": 5,
  "mission": 12,
  "name": "MONSTERLAND",
  "devName": "MONSTERLAND",
  "width": 26,
  "height": 11,
  "grid": [
   "gwxxwwww6ww.h__Mywxxxxwwww",
   "6xxxww###wwd3._MMwwwwwwbwz",
   "xxxwww#..3.#....Mwwwwwbabw",
   "wcwww.3hnm...._.MMwwwTT...",
   "ww6wgww.##..31M..MTTTT...M",
   "yw.Mww8w.h3..__.3....TTTMM",
   "MM....wf..##.....__.3TTkll",
   ".4.4...ww.3ho###.h...Tijjj",
   "MMM.54.weww#.gwwww6wTTTMMM",
   "5.ww...ww8wwww6xxCwwwgTTMz",
   "2..M4...gw6wwxxxxxxxwwwwww"
  ],
  "items": {
   "1": {
    "kind": "goal",
    "water": false,
    "target": "snail"
   },
   "2": {
    "kind": "bonusgoal",
    "water": false,
    "target": "duck"
   },
   "3": {
    "kind": "monster",
    "water": false,
    "type": "crab"
   },
   "4": {
    "kind": "monster",
    "water": false,
    "type": "scorpion"
   },
   "5": {
    "kind": "monster",
    "water": false,
    "type": "trex"
   },
   "6": {
    "kind": "monster",
    "water": true,
    "type": "water_crab"
   },
   "8": {
    "kind": "monster",
    "water": true,
    "type": "shark"
   },
   "a": {
    "kind": "building",
    "water": true,
    "type": "marina"
   },
   "b": {
    "kind": "unit",
    "water": true,
    "type": "speedboat"
   },
   "c": {
    "kind": "plan",
    "water": true,
    "unit": "speedboat",
    "uses": 3
   },
   "d": {
    "kind": "plan",
    "water": true,
    "unit": "treebot",
    "uses": 10
   },
   "e": {
    "kind": "plan",
    "water": true,
    "unit": "freighter",
    "uses": 10
   },
   "f": {
    "kind": "plan",
    "water": true,
    "unit": "snail",
    "uses": 10
   },
   "g": {
    "kind": "pile",
    "water": true,
    "contents": {
     "red": 1
    }
   },
   "h": {
    "kind": "monster",
    "water": false,
    "type": "gator"
   },
   "i": {
    "kind": "plan",
    "water": false,
    "unit": "defender",
    "uses": 10
   },
   "j": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 40,
     "yellow": 25,
     "energy": 1
    }
   },
   "k": {
    "kind": "plan",
    "water": false,
    "unit": "repairbot",
    "uses": 10
   },
   "l": {
    "kind": "pile",
    "water": false,
    "contents": {
     "blue": 20,
     "green": 10,
     "red": 10,
     "yellow": 5
    }
   },
   "m": {
    "kind": "plan",
    "water": false,
    "unit": "steamshovel",
    "uses": 10
   },
   "n": {
    "kind": "pile",
    "water": false,
    "contents": {
     "yellow": 25,
     "wheel": 4,
     "energy": 1
    }
   },
   "o": {
    "kind": "plan",
    "water": false,
    "unit": "duck",
    "uses": 10
   },
   "y": {
    "kind": "whirlpool",
    "water": true,
    "channel": 1
   },
   "z": {
    "kind": "whirlpool",
    "water": true,
    "channel": 2
   }
  },
  "inventory": {
   "speedboat": 3
  },
  "center": [
   13,
   3
  ],
  "unlocks": []
 }
];
