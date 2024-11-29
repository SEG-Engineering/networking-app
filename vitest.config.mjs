import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./src/__tests__/setup/setup.ts'],
        testTimeout: 10000, // Global timeout setting
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        pool: 'forks', // Better for integration tests
        logHeapUsage: true, // Memory tracking
        reporters: ['verbose'], // Detailed test reporting
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})