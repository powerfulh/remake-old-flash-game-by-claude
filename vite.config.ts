import { defineConfig } from 'vite';

export default defineConfig(({ command, isPreview }) => ({
  // 로컬 개발(vite dev)은 루트, 빌드 산출물(vite build / vite preview)은 하위 경로에서 서빙.
  // 주의: vite preview 도 command === 'serve' 로 들어오므로 isPreview 로 구분해야 한다.
  base: command === 'build' || isPreview ? '/remake-old-flash-game-by-claude/' : '/',
  server: { port: 5173 },
  build: { target: 'es2022', outDir: '/docs' },
}));
