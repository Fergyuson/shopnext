// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],  // паттерн ваших тестов
    setupFiles: 'src/setupTests.ts',      // если есть setup-файл, иначе уберите
  },
});
