import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths';
import react from '@vitejs/plugin-react';

const config = defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.ts'
    }
});

export default config;