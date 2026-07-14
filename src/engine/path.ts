export interface Cell { x: number; y: number; }

const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;

/**
 * 4방향 A*. cost 는 칸 진입 비용(늪 페널티 반영), passable 이 false 면 통행 불가.
 * 도착 칸은 occupied 여부와 무관하게 목표로 허용하려면 ignoreGoalBlock 사용.
 */
export function findPath(
  w: number, h: number,
  from: Cell, to: Cell,
  passable: (x: number, y: number) => boolean,
  cost: (x: number, y: number) => number,
): Cell[] | null {
  if (from.x === to.x && from.y === to.y) return [];
  const key = (x: number, y: number) => y * w + x;
  const open: number[] = [key(from.x, from.y)];
  const g = new Map<number, number>([[key(from.x, from.y), 0]]);
  const parent = new Map<number, number>();
  const closed = new Set<number>();
  const hxy = (x: number, y: number) => Math.abs(x - to.x) + Math.abs(y - to.y);

  while (open.length) {
    // 단순 최소 f 추출 (맵 크기가 작아 힙 불필요)
    let bi = 0, bf = Infinity;
    for (let i = 0; i < open.length; i++) {
      const k = open[i];
      const f = (g.get(k) ?? Infinity) + hxy(k % w, Math.floor(k / w));
      if (f < bf) { bf = f; bi = i; }
    }
    const cur = open.splice(bi, 1)[0];
    if (closed.has(cur)) continue;
    closed.add(cur);
    const cx = cur % w, cy = Math.floor(cur / w);
    if (cx === to.x && cy === to.y) {
      const path: Cell[] = [];
      let k = cur;
      while (k !== key(from.x, from.y)) {
        path.push({ x: k % w, y: Math.floor(k / w) });
        k = parent.get(k)!;
      }
      return path.reverse();
    }
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const isGoal = nx === to.x && ny === to.y;
      if (!passable(nx, ny) && !isGoal) continue;
      if (isGoal && !passable(nx, ny)) continue; // 목표도 통행 가능해야 함
      const nk = key(nx, ny);
      if (closed.has(nk)) continue;
      const ng = (g.get(cur) ?? 0) + cost(nx, ny);
      if (ng < (g.get(nk) ?? Infinity)) {
        g.set(nk, ng);
        parent.set(nk, cur);
        open.push(nk);
      }
    }
  }
  return null;
}

/** 목표 칸에 인접(4방향)한 통행 가능 칸까지의 경로 — 액션 대상 접근용 */
export function findPathAdjacent(
  w: number, h: number,
  from: Cell, target: Cell,
  passable: (x: number, y: number) => boolean,
  cost: (x: number, y: number) => number,
): Cell[] | null {
  if (Math.abs(from.x - target.x) + Math.abs(from.y - target.y) === 1) return [];
  let best: Cell[] | null = null;
  for (const [dx, dy] of DIRS) {
    const nx = target.x + dx, ny = target.y + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h || !passable(nx, ny)) continue;
    const p = findPath(w, h, from, { x: nx, y: ny }, passable, cost);
    if (p && (!best || p.length < best.length)) best = p;
  }
  return best;
}
