import { beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// Set up the MSW server with handlers
const server = setupServer(...handlers);

beforeAll(() => {
    // Start the MSW server before running any tests
    server.listen({ onUnhandledRequest: 'warn' });
    console.log('Setting up test environment');

    // Configure global error handling for unhandled rejections
    process.on('unhandledRejection', (error) => {
        console.error('Unhandled Promise Rejection:', error);
    });

    // Configure global detailed logging in tests
    console.debug = (...args) => {
        console.log('[DEBUG]', ...args);
    };
});

afterEach(() => {
    // Reset the handlers after each test to avoid state bleed
    server.resetHandlers();
    console.log('Cleaning up after test');
});

afterAll(() => {
    // Clean up the server and remove listeners after all tests are done
    server.close();
    console.log('Tearing down test environment');
});
