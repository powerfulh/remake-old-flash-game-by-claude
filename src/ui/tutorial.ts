// 월드 1 미션 1 튜토리얼 — 원작 tutorial_sequence 캐스트 멤버의 단계 구성을
// 리메이크 UI(드래그 카메라, DOM HUD, Q/E 단축키)에 맞게 이식.
// 원작 스크립트 좌표는 1-based → 여기서는 0-based 로 변환해 하드코딩.
import type { Game } from '../engine/game';
import { brickTotal } from '../engine/level';
import { STEP_X, STEP_Y, SHEAR } from '../engine/const';
import type { Camera } from '../engine/render';
import { playSfxEvent } from '../engine/audio';

// map1.1 의 튜토리얼 대상 좌표 (원작 스크립트 기준, 0-based)
const GOAL: [number, number] = [17, 6];
const DUCK: [number, number] = [12, 4];
const PLAN: [number, number] = [15, 3];
const RED_PILE: [number, number] = [11, 3];
const BUILD1: [number, number] = [12, 3];
const BUILD2: [number, number] = [13, 3];
const BLUE_PILE: [number, number] = [11, 2];
const MOVE1: [number, number] = [11, 3];
const MOVE2: [number, number] = [14, 3];
const DROP: [number, number] = [14, 2];

interface TutStep {
  text: string;
  /** 버튼만으로 진행하는 단계 */
  buttons?: { label: string; action: 'next' | 'quit' }[];
  /** 캔버스 셀 하이라이트 */
  cell?: [number, number];
  /** DOM 버튼 하이라이트 (매 프레임 탐색) */
  domFind?: () => HTMLElement | null;
  /** 완료 조건 (매 프레임 폴링) */
  done?: (t: Tutorial) => boolean;
}

const findActionBtn = (prefix: string) => () =>
  [...document.querySelectorAll<HTMLElement>('#actions button')].find(b => b.textContent!.startsWith(prefix)) ?? null;
const findPlanBtn = () => document.querySelector<HTMLElement>('#plans button');

const at = (g: Game, type: string, [x, y]: [number, number]) =>
  g.level.entities.some(e => !e.dead && e.type === type && !e.moving && e.x === x && e.y === y);
const buggyCount = (g: Game) =>
  g.level.entities.filter(e => !e.dead && e.type === 'buggy').length;
const totalCarried = (g: Game) =>
  g.level.entities.reduce((a, e) => a + (e.dead ? 0 : brickTotal(e.carrying)), 0);
const hoverIs = (g: Game, [x, y]: [number, number]) =>
  !!g.hover && g.hover.x === x && g.hover.y === y;

const STEPS: TutStep[] = [
  {
    text: 'WorldBuilder에 온 것을 환영합니다!<br><br>기본 조작을 배워 볼까요?',
    buttons: [{ label: '시작할게요', action: 'next' }, { label: '튜토리얼 건너뛰기', action: 'quit' }],
  },
  {
    text: '모든 미션에는 골이 있습니다.<br>화면을 <b>드래그</b>(또는 WASD/방향키)해서 이 미션의 골 마커(초록 느낌표)를 화면에 보이게 하세요.',
    done: t => t.cellVisible(GOAL),
  },
  {
    text: '저것이 미션 골입니다.<br>골 위에 <b>마우스를 올려</b> 무엇이 도달해야 하는지 확인해 보세요.',
    cell: GOAL,
    done: t => hoverIs(t.game, GOAL),
  },
  {
    text: '이 미션을 깨려면 <b>buggy</b>를 저 지점에 도달시켜야 합니다.<br><br>버기가 아직 없으니 하나 만들어 봅시다.',
    buttons: [{ label: '다음', action: 'next' }],
  },
  {
    text: '모델을 만들려면 플랜이 필요합니다. 맵에 흩어진 플랜은 유닛이 그 위를 지나가면 주울 수 있습니다.<br><br>먼저 이 <b>오리를 클릭</b>해 선택하세요.',
    cell: DUCK,
    done: t => t.game.selected?.type === 'duck',
  },
  {
    text: '이 <b>플랜 타일을 클릭</b>해서 오리를 그 위로 이동시키세요.',
    cell: PLAN,
    done: t => t.game.level.planInv.some(p => p.unit === 'buggy'),
  },
  {
    text: '플랜을 획득했습니다! 획득한 플랜은 하단 컬렉션에 들어갑니다.<br><br>컬렉션의 <b>플랜 버튼을 클릭</b>해 확인해 보세요. (단축키 1)',
    domFind: findPlanBtn,
    done: t => t.game.mode.type === 'build',
  },
  {
    text: '표시된 숫자가 buggy 조립에 필요한 브릭입니다.<br><br>조립하려면 필요한 브릭이 <b>3×3 범위 안</b>에 들어오는 빈 칸을 클릭하면 됩니다.',
    buttons: [{ label: '다음', action: 'next' }],
  },
  {
    text: '이 <b>브릭 더미에 마우스를 올려</b> 어떤 브릭이 들었는지 확인해 보세요.',
    cell: RED_PILE,
    done: t => hoverIs(t.game, RED_PILE),
  },
  {
    text: '빨강 브릭 10개, 바퀴 4개, 에너지 브릭 1개 — buggy를 만들기에 딱 맞는 재료네요!',
    buttons: [{ label: '다음', action: 'next' }],
  },
  {
    text: '플랜을 선택한 상태에서 더미 옆 <b>이 칸을 클릭</b>해 버기를 조립하세요.',
    cell: BUILD1,
    done: t => buggyCount(t.game) >= 1,
  },
  {
    text: '잘했어요, 버기 완성! 🎉<br><br>모델은 분해할 수도 있습니다. 버기를 선택하고 <b>분해하기 (E)</b> 버튼을 눌러 보세요.',
    domFind: findActionBtn('분해'),
    done: t => buggyCount(t.game) === 0,
  },
  {
    text: '좋아요. 분해된 브릭은 그 자리에 남습니다.<br><br>이제 다시 만들어 봅시다 — <b>플랜을 클릭</b>하세요.',
    domFind: findPlanBtn,
    done: t => t.game.mode.type === 'build',
  },
  {
    text: '이번에는 <b>여기를 클릭</b>해 조립하세요. (분해된 브릭이 3×3 범위에 들어옵니다)',
    cell: BUILD2,
    done: t => buggyCount(t.game) >= 1,
  },
  {
    text: '버기를 선택하면 <b>왼쪽 패널</b>에서 능력·통행 지형·적재량·에너지를 확인할 수 있습니다.',
    buttons: [{ label: '다음', action: 'next' }],
  },
  {
    text: '버기로 브릭을 운반할 수 있습니다.<br><br>버기를 선택하고 파란 브릭 옆 <b>이 칸을 클릭</b>해 이동하세요.',
    cell: MOVE1,
    done: t => at(t.game, 'buggy', MOVE1),
  },
  {
    text: '<b>브릭 집기 (Q)</b> 버튼을 누르세요.',
    domFind: findActionBtn('브릭 집기'),
    done: t => t.game.mode.type === 'pickup',
  },
  {
    text: '<b>파란 브릭을 클릭</b>해 집으세요.',
    cell: BLUE_PILE,
    done: t => totalCarried(t.game) > 0,
  },
  {
    text: '파란 브릭을 실었습니다! 이제 다른 곳으로 옮겨 봅시다.<br><br><b>여기를 클릭</b>해 이동하세요.',
    cell: MOVE2,
    done: t => at(t.game, 'buggy', MOVE2),
  },
  {
    text: '<b>내려놓기 (Q)</b> 버튼을 누르세요.',
    domFind: findActionBtn('내려놓기'),
    done: t => t.game.mode.type === 'drop',
  },
  {
    text: '<b>여기를 클릭</b>해 브릭을 내려놓으세요.',
    cell: DROP,
    done: t => totalCarried(t.game) === 0,
  },
  {
    text: '기본기를 모두 배웠습니다! 💪<br><br>이제 버기를 <b>골</b>로 보내서 미션을 완료하세요.',
    cell: GOAL,
    done: t => t.game.goalDone,
  },
];

export class Tutorial {
  readonly game: Game;
  private cam: Camera;
  private canvas: HTMLCanvasElement;
  private el: HTMLDivElement;
  private idx = -1;
  private highlighted: HTMLElement | null = null;
  private finished = false;

  constructor(game: Game, cam: Camera, canvas: HTMLCanvasElement) {
    this.game = game;
    this.cam = cam;
    this.canvas = canvas;
    this.el = document.createElement('div');
    this.el.id = 'tutorial';
    document.getElementById('hud')!.appendChild(this.el);
    this.advance();
  }

  /** 셀이 현재 뷰포트 안에 보이는지 */
  cellVisible([x, y]: [number, number]): boolean {
    const px = x * STEP_X - y * SHEAR - this.cam.x;
    const py = y * STEP_Y - this.cam.y;
    return px > 20 && px < this.canvas.width - 20 && py > 20 && py < this.canvas.height - 20;
  }

  private advance(): void {
    this.idx++;
    if (this.idx >= STEPS.length) { this.destroy(); return; }
    const s = STEPS[this.idx];
    this.game.tutorialCell = s.cell ?? null;
    this.el.innerHTML = `<div class="tut-step">${this.idx + 1} / ${STEPS.length}</div><div class="tut-text">${s.text}</div>`;
    if (s.buttons) {
      const wrap = document.createElement('div');
      wrap.className = 'tut-buttons';
      for (const b of s.buttons) {
        const btn = document.createElement('button');
        btn.textContent = b.label;
        btn.onclick = () => {
          playSfxEvent('click_button');
          if (b.action === 'quit') this.destroy();
          else this.advance();
        };
        wrap.appendChild(btn);
      }
      this.el.appendChild(wrap);
    }
  }

  /** 게임 루프에서 매 프레임 호출 */
  update(): void {
    if (this.finished) return;
    const s = STEPS[this.idx];
    if (!s) return;
    // DOM 하이라이트 갱신 (HUD 가 다시 그려져도 유지되도록 매 프레임 재적용)
    const target = s.domFind?.() ?? null;
    if (this.highlighted !== target) {
      this.highlighted?.classList.remove('tut-highlight');
      target?.classList.add('tut-highlight');
      this.highlighted = target;
    } else if (target && !target.classList.contains('tut-highlight')) {
      target.classList.add('tut-highlight');
    }
    if (s.done?.(this)) {
      this.highlighted?.classList.remove('tut-highlight');
      this.highlighted = null;
      this.advance();
    }
  }

  destroy(): void {
    if (this.finished) return;
    this.finished = true;
    this.highlighted?.classList.remove('tut-highlight');
    this.game.tutorialCell = null;
    this.el.remove();
  }
}
