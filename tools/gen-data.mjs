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
const OUT = path.join(ROOT, 'src', 'data', 'generated');
const PUB = path.join(ROOT, 'public', 'assets');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(PUB, 'sprites'), { recursive: true });
fs.mkdirSync(path.join(PUB, 'audio'), { recursive: true });

const HEADER = '// 자동 생성 파일 — tools/gen-data.mjs 가 extract/ 데이터에서 생성. 직접 수정 금지.\n';

// ---------- 지형 문자 → TerrainId ----------
const TERRAIN_CHARS = {
  '.': 'normal', '_': 'rocky', 'M': 'mountain', 'T': 'tree', 'w': 'water',
  'x': 'deep', 'r': 'reef', '#': 'swamp', '^': 'volcano', '@': 'hole', '~': 'billboard',
};
// config 의 지형 이름 → TerrainId
const TERRAIN_NAMES = {
  normal: 'normal', normal_undiggable: 'rocky', water: 'water',
  water_undiggable: 'deep', water_whirlpool: 'whirl', water_reefs: 'reef', swamp: 'swamp',
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
    case 'goal':
      return { kind: 'goal', water: spec.includes('water'), target: spec[1] };
    case 'bonusgoal':
      return { kind: 'bonusgoal', water: spec.includes('water'), target: spec[1] };
    case 'whirlpool':
      return { kind: 'whirlpool', water: true, channel: Number(spec[1] ?? 1) || 1 };
    default:
      return null;
  }
}

const levelNames = {};
for (const l of fs.readFileSync(path.join(MAPS, 'level names.txt'), 'utf8').split('\n')) {
  const m = l.match(/^(\d+)\s+(\d+)\s+(.*)$/);
  if (m) levelNames[`${m[1]}.${m[2]}`] = m[3].trim();
}

const unlocks = {};
for (const l of fs.readFileSync(path.join(MAPS, 'worlds.txt'), 'utf8').split('\n')) {
  const m = l.match(/^(\d+)\s+(\d+)\s*(.*)$/);
  if (m) unlocks[`${m[1]}.${m[2]}`] = m[3].split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n) && n > 0);
}

const levels = [];
const warnings = [];
for (let w = 1; w <= 5; w++) {
  for (let ms = 1; ms <= 12; ms++) {
    const f = path.join(MAPS, `map${w}.${ms}.txt`);
    if (!fs.existsSync(f)) { warnings.push(`missing map${w}.${ms}`); continue; }
    const p = parseMapFile(fs.readFileSync(f, 'utf8'));
    const width = Math.max(...p.grid.map(r => r.length));
    // 그리드 정규화: 폭 통일(부족분은 평지), 아이템 키 검증
    const items = {};
    for (const [k, spec] of Object.entries(p.items)) {
      const def = toItemDef(spec);
      if (def) items[k] = def; else warnings.push(`map${w}.${ms}: unknown item ${k}=${spec.join(',')}`);
    }
    const grid = p.grid.map(r => r.padEnd(width, '.'));
    for (const row of grid) {
      for (const ch of row) {
        if (!TERRAIN_CHARS[ch] && !items[ch] && !items[ch.toLowerCase()]) {
          warnings.push(`map${w}.${ms}: undefined cell char '${ch}' (평지로 처리)`);
        }
      }
    }
    levels.push({
      world: w, mission: ms,
      name: levelNames[`${w}.${ms}`] || p.name,
      devName: p.name,
      width, height: grid.length,
      grid, items, inventory: p.inventory, center: p.center,
      unlocks: unlocks[`${w}.${ms}`] ?? [],
    });
  }
}

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
  return {
    id: get(/^#(\w+)=/),
    name: get(/#name:"([^"]+)"/) ?? '',
    kind: get(/#kind:#(\w+)/) ?? 'vehicle',
    speed: num(/#speed:\s*([\d.]+)/) ?? 1,
    energy, terrain, recipe,
    carries: num(/#carries:\s*(\d+)/) ?? 0,
    shield: num(/#shield:\s*([\d.eE-]+)/) ?? 1,
    dig: /#dig:#yes/.test(line),
    push: /#push:#yes/.test(line),
    transplant: /#transplant:#yes/.test(line),
    waterversion: /#waterversion:#yes/.test(line),
    attack, recharges,
    restEvery: num(/#rest_every:\s*([\d.]+)/),
    restFor: num(/#rest_for:\s*([\d.]+)/),
  };
}
const sections = { building: {}, vehicle: {}, monster: {} };
let cur = null;
const MONSTER_IDS = new Set(['crab', 'gator', 'boulder', 'scorpion', 'water_crab', 'shark', 'trex']);
for (const line of configTxt.split('\n')) {
  const s = line.trim();
  if (/^\[building\]/i.test(s)) { cur = 'building'; continue; }
  if (/^\[vehicle\]/i.test(s)) { cur = 'vehicle'; continue; }
  if (/^\[(setup|terrain)\]/i.test(s)) { cur = null; continue; }
  const m = s.match(/^#(\w+)=\s*\[/);
  if (m && cur) {
    const def = parseDef(s);
    const sec = MONSTER_IDS.has(def.id) ? 'monster' : cur;
    sections[sec][def.id] = def;
  }
}

// ---------- 스프라이트 매니페스트 + 복사 ----------
const spriteMeta = JSON.parse(fs.readFileSync(path.join(SPRITES, 'sprites.json'), 'utf8'));
const manifest = {};
let copied = 0;
for (const s of spriteMeta) {
  if (!s.name || s.format === 'jpeg') continue; // 히어로 JPEG 는 UI 전용 — 필요 시 추가
  if (manifest[s.name]) continue; // 이름 중복은 첫 항목 우선
  const safe = s.name.replace(/[^\w.-]/g, '_') + '.png';
  fs.copyFileSync(path.join(SPRITES, s.file), path.join(PUB, 'sprites', safe));
  manifest[s.name] = { file: safe, w: s.w, h: s.h, regX: s.regX, regY: s.regY };
  copied++;
}

// ---------- 오디오 복사 ----------
const audio = { bgm: [], sfx: [] };
for (const kind of ['bgm', 'sfx']) {
  const dir = path.join(AUDIO, kind);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.mp3')) continue;
    fs.copyFileSync(path.join(dir, f), path.join(PUB, 'audio', f));
    audio[kind].push(f.replace(/\.mp3$/, ''));
  }
}

// ---------- 출력 ----------
function writeTs(file, name, type, value) {
  const baseType = type.replace(/\[\]$/, '');
  fs.writeFileSync(path.join(OUT, file),
    `${HEADER}import type { ${baseType} } from '../types';\n\nexport const ${name}: ${type} = ${JSON.stringify(value, null, 1)};\n`);
}
writeTs('levels.ts', 'LEVELS', 'LevelDef[]', levels);
writeTs('units.ts', 'UNIT_DATA', 'UnitData', {
  vehicles: sections.vehicle, buildings: sections.building, monsters: sections.monster,
});
writeTs('sprites.ts', 'SPRITE_MANIFEST', 'SpriteManifest', manifest);
fs.writeFileSync(path.join(OUT, 'audio.ts'),
  `${HEADER}\nexport const BGM: string[] = ${JSON.stringify(audio.bgm)};\nexport const SFX: string[] = ${JSON.stringify(audio.sfx)};\n`);
fs.writeFileSync(path.join(OUT, 'terrainChars.ts'),
  `${HEADER}import type { TerrainId } from '../types';\n\nexport const TERRAIN_CHARS: Record<string, TerrainId> = ${JSON.stringify(TERRAIN_CHARS, null, 1)};\n`);

console.log(`levels: ${levels.length}, vehicles: ${Object.keys(sections.vehicle).length}, buildings: ${Object.keys(sections.building).length}, monsters: ${Object.keys(sections.monster).length}`);
console.log(`sprites copied: ${copied}, bgm: ${audio.bgm.length}, sfx: ${audio.sfx.length}`);
if (warnings.length) console.log('warnings:\n  ' + [...new Set(warnings)].join('\n  '));
