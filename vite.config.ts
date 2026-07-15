import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // 로컬 개발(dev)은 루트, 빌드 배포본은 하위 경로에서 서빙
  base: command === 'build' ? '/remake-old-flash-game-by-claude/' : '/',
  server: { port: 5173 },
  build: { target: 'es2022' },
}));
