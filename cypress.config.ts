import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'n9ti31',
  e2e: {
    baseUrl: 'http://localhost:3000',
    // testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
