// 배경음/효과음 볼륨 슬라이더 (메뉴·일시정지 오버레이 공용)
import { getVolumes, playSfxEvent, setMusicVolume, setSfxVolume } from '../engine/audio';

const VKEY = 'wb-remake-volume';

/** 저장된 볼륨을 오디오 모듈에 적용 (부트 시 1회) */
export function loadVolumes(): void {
  try {
    const v = JSON.parse(localStorage.getItem(VKEY) ?? '{}');
    if (typeof v.music === 'number') setMusicVolume(v.music);
    if (typeof v.sfx === 'number') setSfxVolume(v.sfx);
  } catch { /* 무시 */ }
}

function save(): void {
  localStorage.setItem(VKEY, JSON.stringify(getVolumes()));
}

/** 볼륨 슬라이더 2개(배경음/효과음)가 든 컨테이너 생성 */
export function createVolumeControls(): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.className = 'volume-controls';
  const row = (label: string, value: number, onInput: (v: number) => void, testSfx: boolean) => {
    const lab = document.createElement('label');
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.05';
    slider.value = String(value);
    slider.oninput = () => {
      onInput(Number(slider.value));
      save();
    };
    // 효과음은 조절이 끝났을 때 샘플 재생으로 체감 확인
    if (testSfx) slider.onchange = () => playSfxEvent('click_button');
    lab.append(`${label} `, slider);
    wrap.appendChild(lab);
  };
  const v = getVolumes();
  row('배경음', v.music, setMusicVolume, false);
  row('효과음', v.sfx, setSfxVolume, true);
  return wrap;
}
