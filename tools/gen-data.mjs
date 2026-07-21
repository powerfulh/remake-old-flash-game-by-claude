// Codegen: extract/ 의 원본 추출 데이터를 remake/src/data/generated/ TS 모듈로 변환하고
// public/assets/ 로 스프라이트·오디오를 복사한다.
//   node tools/gen-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const EXTRACT = path.join(ROOT, '..', 'extract');
const MAPS = path.join(EXTRACT, 'extracted_maps');
const SPRITES = path.join(EXTRACT, 'extracted_sprites');
const AUDIO = path.join(EXTRACT, 'extracted_audio');
// WorldBuilder 2 (오디오는 WB1 과 동일 세트라 재사용)
const EXTRACT2 = path.join(ROOT, '..', 'extract2');
const MAPS2 = path.join(EXTRACT2, 'extracted_maps');
const SPRITES2 = path.join(EXTRACT2, 'extracted_sprites');
const OUT = path.join(ROOT, 'src', 'data', 'generated');
const PUB = path.join(ROOT, 'public', 'assets');
/** 리메이크에서 현재 안 쓰는 원본 애셋 보관소 (빌드에 포함되지 않음) */
const UNUSED = path.join(ROOT, 'unused-assets');
for (const d of [path.join(PUB, 'sprites'), path.join(PUB, 'audio'), path.join(UNUSED, 'sprites'), path.join(UNUSED, 'audio')]) {
  fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(d, { recursive: true });
}
fs.mkdirSync(OUT, { recursive: true });

// ---------- 사용 애셋 판정 ----------
// 게임 코드(render.ts 등)가 참조할 수 있는 스프라이트 이름 패턴.
// 여기 안 걸리면 unused-assets/ 로 보관된다. 나중에 쓰게 되면 패턴 추가 후 npm run gen.
const USED_SPRITE_PATTERNS = [
  /^terrain\./,
  /^vehicle\./,
  /^monster\./,
  /^building\./,
  /^object\./,        // boulder 등
  /^resource\./,
  /^whirlpool\.generic/,
  /^carry\./,          // 유닛 적재물 표시

  /^build_cloud/,      // 조립 이펙트 (2프레임)
  /^take_apart_cloud/, // 분해 이펙트 (3프레임)
  /^damage\./,         // 피격 이펙트 (5프레임)
  /^icon\.(charging|no_energy|low_energy)/, // 충전/에너지 경고 아이콘
];
// 커스텀 벡터 스프라이트(customSprites.ts)로 대체되어 더 이상 안 쓰는 원본
const REPLACED_BY_CUSTOM = new Set([
  'goal.goal', 'goal.bonus',
  'action_arrow_up', 'action_arrow_down', 'action_arrow_left', 'action_arrow_right',
  'action_arrow_middle', 'action_arrow_negative',
]);
const isSpriteUsed = name =>
  !REPLACED_BY_CUSTOM.has(name) && USED_SPRITE_PATTERNS.some(re => re.test(name));

// SFX 는 소스 코드에서 실제 참조되는 이름만 유지 (s_* 리터럴 스캔)
function scanUsedSfx() {
  const used = new Set();
  const walk = dir => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { if (f.name !== 'generated') walk(p); }
      else if (/\.(ts|tsx)$/.test(f.name)) {
        for (const m of fs.readFileSync(p, 'utf8').matchAll(/['"](s_\w+)['"]/g)) used.add(m[1]);
      }
    }
  };
  walk(path.join(ROOT, 'src'));
  return used;
}

const HEADER = '// 자동 생성 파일 — tools/gen-data.mjs 가 extract/ 데이터에서 생성. 직접 수정 금지.\n';

// ---------- 지형 문자 → TerrainId (WB1 + WB2 terrainmap 통합 — 문자 충돌 없음) ----------
const TERRAIN_CHARS = {
  '.': 'normal', '_': 'rocky', 'M': 'mountain', 'T': 'tree', 'w': 'water',
  'x': 'deep', 'r': 'reef', '#': 'swamp', '^': 'volcano', '@': 'hole', '~': 'billboard',
  // WB2 (extract2/extracted_maps/terrainmap.txt)
  ':': 'zone', '`': 'cement', '>': 'roadblock',
  '(': 'street1', '[': 'street2', '{': 'street3', '\\': 'street4', '/': 'street5',
  ')': 'street6', ']': 'street7', '}': 'street8', '+': 'street9', '=': 'street10',
  '-': 'street_undiggable',
  '!': 'tree2', "'": 'tree3', '?': 'tree4',
  '%': 'jungle1', '&': 'jungle2', '$': 'jungle3', '*': 'jungle4',
};
// config 의 지형 이름 → TerrainId
const TERRAIN_NAMES = {
  normal: 'normal', normal_undiggable: 'rocky', water: 'water',
  water_undiggable: 'deep', water_whirlpool: 'whirl', water_reefs: 'reef', swamp: 'swamp',
  street: 'street', // 통행 판정은 terrainFamily 로 street1~10/cement 를 street 로 정규화
};

// ---------- 레벨 파싱 ----------
function parseMapFile(txt) {
  const grid = [];
  let name = '', center = null, section = '';
  const items = {};
  const inventory = {};
  for (const line of txt.split('\n')) {
    const t = line.replace(/\s+$/, '');
    const tt = t.trim();
    if (tt.startsWith('--') || tt === '') continue;
    if (/^\[map\]/i.test(tt)) { section = 'map'; continue; }
    if (/^\[mapitems\]/i.test(tt)) { section = 'items'; continue; }
    if (/^\[inventory\]/i.test(tt)) { section = 'inv'; continue; }
    const eq = tt.indexOf('=');
    if (eq < 0) continue;
    const k = tt.slice(0, eq).trim();
    const v = tt.slice(eq + 1);
    if (k === 'name') name = v.trim();
    else if (k === 'map') grid.push(v.replace(/\s+$/, ''));
    else if (k === 'center') {
      const m = v.trim().match(/(\d+)\s*,\s*(\d+)/);
      if (m) center = [Number(m[1]), Number(m[2])];
    } else if (section === 'items') items[k] = v.split(',').map(s => s.trim()).filter(Boolean);
    else if (section === 'inv') inventory[k] = Number(v.trim()) || 0;
  }
  return { name, grid, center, items, inventory };
}

function toItemDef(spec) {
  const kind = spec[0];
  const water = kind.startsWith('water');
  switch (kind.replace(/^water/, '')) {
    case 'unit': {
      const cls = spec[1]; // vehicle | building | monster
      return { kind: cls === 'monster' ? 'monster' : cls === 'building' ? 'building' : 'unit', water, type: spec[2] };
    }
    case 'pile': {
      const contents = {};
      for (let i = 1; i + 1 < spec.length + 1; i += 2) {
        const c = spec[i], n = Number(spec[i + 1]);
        if (c && Number.isFinite(n)) contents[c] = (contents[c] ?? 0) + n;
      }
      return { kind: 'pile', water, contents };
    }
    case 'plan':
      return { kind: 'plan', water, unit: spec[1], uses: Number(spec[2] ?? 1) || 1 };
    case 'goal': case 'bonusgoal': {
      const kind2 = kind.replace(/^water/, '');
      // WB2: "goal,collect 1 lion" — 존 포획 골
      const cm = spec[1]?.match(/^collect\s+(\d+)\s+(\w+)$/i);
      if (cm) return { kind: kind2, water: spec.includes('water'), target: spec[1], collect: { count: Number(cm[1]), type: cm[2] } };
      return { kind: kind2, water: spec.includes('water'), target: spec[1] };
    }
    case 'whirlpool':
      return { kind: 'whirlpool', water: true, channel: Number(spec[1] ?? 1) || 1 };
    default:
      return null;
  }
}

const warnings = [];

/** 한 게임의 맵 폴더에서 레벨 배열 생성 (game 인자가 있으면 각 레벨에 표기) */
function processLevels(mapsDir, worldCount, game) {
  const tag = game ? `wb${game} ` : '';
  const levelNames = {};
  for (const l of fs.readFileSync(path.join(mapsDir, 'level names.txt'), 'utf8').split('\n')) {
    const m = l.match(/^(\d+)\s+(\d+)\s+(.*)$/);
    if (m) levelNames[`${m[1]}.${m[2]}`] = m[3].trim();
  }
  const unlocks = {};
  for (const l of fs.readFileSync(path.join(mapsDir, 'worlds.txt'), 'utf8').split('\n')) {
    const m = l.match(/^(\d+)\s+(\d+)\s*(.*)$/);
    if (m) unlocks[`${m[1]}.${m[2]}`] = m[3].split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n) && n > 0);
  }
  const levels = [];
  for (let w = 1; w <= worldCount; w++) {
    for (let ms = 1; ms <= 12; ms++) {
      const f = path.join(mapsDir, `map${w}.${ms}.txt`);
      if (!fs.existsSync(f)) { warnings.push(`${tag}missing map${w}.${ms}`); continue; }
      const p = parseMapFile(fs.readFileSync(f, 'utf8'));
      const width = Math.max(...p.grid.map(r => r.length));
      // 그리드 정규화: 폭 통일(부족분은 평지), 아이템 키 검증
      const items = {};
      for (const [k, spec] of Object.entries(p.items)) {
        const def = toItemDef(spec);
        if (def) items[k] = def; else warnings.push(`${tag}map${w}.${ms}: unknown item ${k}=${spec.join(',')}`);
      }
      const grid = p.grid.map(r => r.padEnd(width, '.'));
      for (const row of grid) {
        for (const ch of row) {
          if (!TERRAIN_CHARS[ch] && !items[ch] && !items[ch.toLowerCase()]) {
            warnings.push(`${tag}map${w}.${ms}: undefined cell char '${ch}' (평지로 처리)`);
          }
        }
      }
      const lv = {
        world: w, mission: ms,
        name: levelNames[`${w}.${ms}`] || p.name,
        devName: p.name,
        width, height: grid.length,
        grid, items, inventory: p.inventory, center: p.center,
        unlocks: unlocks[`${w}.${ms}`] ?? [],
      };
      if (game) lv.game = game; // WB1 levels.ts 는 기존 형태 그대로 프리징
      levels.push(lv);
    }
  }
  return levels;
}

const levels = processLevels(MAPS, 5, 0);
const levels2 = fs.existsSync(MAPS2) ? processLevels(MAPS2, 2, 2) : [];

// ---------- config 파싱 (유닛/건물/몬스터/셋업) ----------
const configTxt = fs.readFileSync(path.join(MAPS, 'config.txt'), 'latin1');
function parseDef(line) {
  const get = re => { const m = line.match(re); return m ? m[1] : null; };
  const num = re => { const v = get(re); return v == null ? null : Number(v); };
  const recipe = {};
  const rm = line.match(/#recipe:\s*\[([^\]]*)\]/);
  if (rm) for (const pm of rm[1].matchAll(/#(\w+):\s*(\d+)/g)) recipe[pm[1]] = Number(pm[2]);
  const terrain = [];
  const tm = line.match(/#terrain:\s*\[([^\]]*)\]/);
  if (tm) for (const t of tm[1].matchAll(/#(\w+)/g)) {
    const id = TERRAIN_NAMES[t[1]];
    if (id) terrain.push(id); else warnings.push(`config: unknown terrain #${t[1]}`);
  }
  const energy = {};
  const em = line.match(/#energy:\s*\[([^\]]*)\]/);
  if (em) for (const pm of em[1].matchAll(/#(\w+):\s*([\d.]+)/g)) energy[pm[1]] = Number(pm[2]);
  const recharges = [];
  const cm = line.match(/#recharges:\s*\[([^\]]*)\]/);
  if (cm) for (const t of cm[1].matchAll(/#(\w+)/g)) recharges.push(t[1]);
  const dmg = line.match(/#damage_range:\s*\[(\d+),\s*(\d+)\]/);
  const attack = /#attack:\s*\[/.test(line) ? {
    damage: dmg ? [Number(dmg[1]), Number(dmg[2])] : [100, 200],
    hitsPerMinute: num(/#hits_per_minute:\s*([\d.]+)/) ?? 25,
    chance: num(/#chance_of_success:\s*(\d+)/) ?? 100,
    searchRange: num(/#attack_search_range:\s*(\d+)/) ?? 2,
  } : null;
  // WB2: freezebot 빙결 능력
  const freezeDuration = num(/#freeze_duration:\s*([\d.]+)/);
  const freeze = freezeDuration != null ? {
    duration: freezeDuration,
    recharge: num(/#freeze_recharge:\s*([\d.]+)/) ?? 3,
    range: num(/#freeze_range:\s*([\d.]+)/) ?? 2,
  } : null;
  return {
    id: get(/^#(\w+)=/),
    name: get(/#name:"([^"]+)"/) ?? '',
    kind: get(/#kind:#(\w+)/) ?? 'vehicle',
    speed: num(/#speed:\s*([\d.]+)/) ?? 1,
    energy, terrain, recipe,
    carries: num(/#carries:\s*(\d+)/) ?? 0,
    shield: num(/#shield:\s*([\d.eE-]+)/) ?? 1,
    dig: /#dig:\s*#yes/.test(line),
    push: /#push:\s*#yes/.test(line),
    transplant: /#transplant:\s*#yes/.test(line),
    waterversion: /#waterversion:\s*#yes/.test(line),
    attack, recharges,
    restEvery: num(/#rest_every:\s*([\d.]+)/),
    restFor: num(/#rest_for:\s*([\d.]+)/),
    // WB2: 빙결/생산 건물
    freeze,
    makeHowManyBricks: num(/#makeHowManyBricks:\s*(\d+)/),
    howLongDoesItTake: num(/#howLongDoesItTake:\s*([\d.]+)/),
  };
}
const MONSTER_IDS = new Set(['crab', 'gator', 'boulder', 'scorpion', 'water_crab', 'shark', 'trex', 'lion']);

function parseConfig(txt, into) {
  let cur = null;
  for (const line of txt.split('\n')) {
    const s = line.trim();
    if (/^\[building\]/i.test(s)) { cur = 'building'; continue; }
    if (/^\[vehicle\]/i.test(s)) { cur = 'vehicle'; continue; }
    if (/^\[(setup|terrain)\]/i.test(s)) { cur = null; continue; }
    const m = s.match(/^#(\w+)=\s*\[/);
    if (m && cur) {
      const def = parseDef(s);
      const sec = MONSTER_IDS.has(def.id) ? 'monster' : cur;
      into[sec][def.id] = def;
    }
  }
}

// WB1 정의 위에 WB2 정의를 덮어쓰기 병합 — WB2 config 는 WB1 의 상위집합
// (기존 유닛에 street 통행 추가 + lion/freezebot/생산 건물 신규. WB1 맵에는
//  street 지형이 등장하지 않으므로 WB1 레벨 동작에 영향 없음)
const sections = { building: {}, vehicle: {}, monster: {} };
parseConfig(configTxt, sections);
const CONFIG2 = path.join(MAPS2, 'config.txt');
if (fs.existsSync(CONFIG2)) parseConfig(fs.readFileSync(CONFIG2, 'latin1'), sections);
// defender2/defender3: 원작에서 정의만 있고 어떤 맵에도 배치되지 않는 미사용 유닛 — 제외
// (맵의 죽은 [mapitems] 정의는 그리드 배치 0개라 스폰 경로를 타지 않음)
delete sections.vehicle.defender2;
delete sections.vehicle.defender3;

// ---------- 유닛 설명 (원작 unit info 텍스트 = wb_help_models 위키와 동일 내용) ----------
const descriptions = {};
for (const DESC_DIR of [path.join(MAPS, 'descriptions'), path.join(MAPS2, 'descriptions')]) {
  if (!fs.existsSync(DESC_DIR)) continue;
  for (const f of fs.readdirSync(DESC_DIR)) {
    const m = f.match(/^(?:vehicle|building)\.(\w+)\.description\.txt$/);
    if (!m) continue;
    const id = m[1];
    if (id === 'defender2' || id === 'defender3') continue; // 미사용 유닛 제외
    const lines = fs.readFileSync(path.join(DESC_DIR, f), 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
    const entry = { text: '', terrain: '', speed: '', actions: '', capacity: '' };
    let field = null;
    for (const line of lines) {
      const fm = line.match(/^(Terrain|Speed|Actions|Capacity):\s*(.*)$/i);
      if (fm) {
        field = fm[1].toLowerCase();
        entry[field] = fm[2].trim();
      } else if (field) {
        entry[field] = (entry[field] + ' ' + line).trim();
      } else {
        entry.text = (entry.text + ' ' + line).trim();
      }
    }
    // 'Pick Up,' 처럼 이어지는 줄의 콤마 중복 정리
    for (const k of ['terrain', 'speed', 'actions', 'capacity']) entry[k] = entry[k].replace(/,\s*,/g, ',').replace(/,\s*$/, '');
    descriptions[id] = entry;
  }
}

// ---------- 스프라이트 매니페스트 + 복사 (사용/미사용 분리) ----------
const spriteMeta = JSON.parse(fs.readFileSync(path.join(SPRITES, 'sprites.json'), 'utf8'));
const manifest = {};
const seenNames = new Set();
let copied = 0, archived = 0;
for (const s of spriteMeta) {
  if (!s.name) continue;
  const ext = s.format === 'jpeg' ? '.jpg' : '.png';
  const safe = s.name.replace(/[^\w.-]/g, '_') + ext;
  if (seenNames.has(safe)) continue; // 이름 중복은 첫 항목 우선
  seenNames.add(safe);
  if (s.format !== 'jpeg' && isSpriteUsed(s.name)) {
    fs.copyFileSync(path.join(SPRITES, s.file), path.join(PUB, 'sprites', safe));
    manifest[s.name] = { file: safe, w: s.w, h: s.h, regX: s.regX, regY: s.regY };
    copied++;
  } else {
    fs.copyFileSync(path.join(SPRITES, s.file), path.join(UNUSED, 'sprites', safe));
    archived++;
  }
}

// 원본 데이터가 손상된 스프라이트 별칭: defender 정지 4방향은 저장된 팔레트 인덱스가
// 어떤 CLUT 와도 맞지 않아(임포트 리맵 손상 추정) 같은 방향의 walk.1 프레임으로 대체
for (const dir of ['up', 'down', 'left', 'right']) {
  const idle = `vehicle.defender.${dir}`;
  const walk = manifest[`${idle}.walk.1`];
  if (walk) manifest[idle] = walk;
}

// repairbot: 원본 캐스트 이름이 camelCase(repairBot) — 유닛 id(repairbot) 기준 소문자 별칭 생성
for (const key of Object.keys(manifest)) {
  if (key.startsWith('vehicle.repairBot.')) {
    manifest[key.replace('vehicle.repairBot.', 'vehicle.repairbot.')] = manifest[key];
  }
}
// repairbot 은 걷기 프레임만 존재 — 정지 스프라이트는 walk.1 로 별칭
for (const dir of ['up', 'down', 'left', 'right']) {
  const idle = `vehicle.repairbot.${dir}`;
  if (!manifest[idle] && manifest[`${idle}.walk.1`]) manifest[idle] = manifest[`${idle}.walk.1`];
}


// ---------- WB2 스프라이트 병합 ----------
// 같은 이름은 WB1 아트 유지, WB2 신규 이름만 추가 (파일은 wb2_ 접두사로 복사)
let wb2Added = 0;
if (fs.existsSync(SPRITES2)) {
  const meta2 = JSON.parse(fs.readFileSync(path.join(SPRITES2, 'sprites.json'), 'utf8'));
  for (const s of meta2) {
    if (!s.name || s.format === 'jpeg' || manifest[s.name]) continue;
    if (!isSpriteUsed(s.name)) { archived++; fs.copyFileSync(path.join(SPRITES2, s.file), path.join(UNUSED, 'sprites', 'wb2_' + s.name.replace(/[^\w.-]/g, '_') + '.png')); continue; }
    const safe = 'wb2_' + s.name.replace(/[^\w.-]/g, '_') + '.png';
    fs.copyFileSync(path.join(SPRITES2, s.file), path.join(PUB, 'sprites', safe));
    manifest[s.name] = { file: safe, w: s.w, h: s.h, regX: s.regX, regY: s.regY };
    wb2Added++;
  }
  // freezebot: 정지 스프라이트 이름이 '.{dir}.stand' — 표준 '.{dir}' 별칭 생성
  for (const dir of ['up', 'down', 'left', 'right']) {
    const stand = manifest[`vehicle.freezebot.${dir}.stand`];
    if (stand && !manifest[`vehicle.freezebot.${dir}`]) manifest[`vehicle.freezebot.${dir}`] = stand;
  }
  // windmill: 회전 프레임(.1~.4)만 존재 — 기본명 별칭
  if (!manifest['building.windmill'] && manifest['building.windmill.1']) {
    manifest['building.windmill'] = manifest['building.windmill.1'];
  }
}

// ---------- 오디오 복사 (BGM 전체 사용, SFX 는 코드 참조분만) ----------
const usedSfx = scanUsedSfx();
const audio = { bgm: [], sfx: [] };
let audioArchived = 0;
for (const kind of ['bgm', 'sfx']) {
  const dir = path.join(AUDIO, kind);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.mp3')) continue;
    const name = f.replace(/\.mp3$/, '');
    const used = kind === 'bgm' || usedSfx.has(name);
    if (used) {
      fs.copyFileSync(path.join(dir, f), path.join(PUB, 'audio', f));
      audio[kind].push(name);
    } else {
      fs.copyFileSync(path.join(dir, f), path.join(UNUSED, 'audio', f));
      audioArchived++;
    }
  }
}

// ---------- 출력 ----------
function writeTs(file, name, type, value) {
  const baseType = type.replace(/\[\]$/, '');
  fs.writeFileSync(path.join(OUT, file),
    `${HEADER}import type { ${baseType} } from '../types';\n\nexport const ${name}: ${type} = ${JSON.stringify(value, null, 1)};\n`);
}
writeTs('levels.ts', 'LEVELS', 'LevelDef[]', levels);
writeTs('levels2.ts', 'LEVELS2', 'LevelDef[]', levels2);
writeTs('units.ts', 'UNIT_DATA', 'UnitData', {
  vehicles: sections.vehicle, buildings: sections.building, monsters: sections.monster,
});
writeTs('sprites.ts', 'SPRITE_MANIFEST', 'SpriteManifest', manifest);
writeTs('descriptions.ts', 'UNIT_DESCRIPTIONS', 'UnitDescriptions', descriptions);
fs.writeFileSync(path.join(OUT, 'audio.ts'),
  `${HEADER}\nexport const BGM: string[] = ${JSON.stringify(audio.bgm)};\nexport const SFX: string[] = ${JSON.stringify(audio.sfx)};\n`);
fs.writeFileSync(path.join(OUT, 'terrainChars.ts'),
  `${HEADER}import type { TerrainId } from '../types';\n\nexport const TERRAIN_CHARS: Record<string, TerrainId> = ${JSON.stringify(TERRAIN_CHARS, null, 1)};\n`);

console.log(`levels: ${levels.length} (+wb2 ${levels2.length}), vehicles: ${Object.keys(sections.vehicle).length}, buildings: ${Object.keys(sections.building).length}, monsters: ${Object.keys(sections.monster).length}, wb2 sprites: +${wb2Added}`);
console.log(`sprites used: ${copied}, archived: ${archived} -> unused-assets/sprites`);
console.log(`audio used: bgm ${audio.bgm.length} + sfx ${audio.sfx.length}, archived: ${audioArchived} -> unused-assets/audio`);
if (warnings.length) console.log('warnings:\n  ' + [...new Set(warnings)].join('\n  '));
