const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  env: {
    TAGS: "not @ignore"
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    baseUrl: "https://www.service.nsw.gov.au",
    supportFile: "cypress/support/e2e.js",
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
    ],
    excludeSpecPattern: [
      "cypress/e2e/**/node_modules/**",
      "cypress/e2e/**/coverage/**"
    ],
    setupNodeEvents(on, config) {
      // Custom tasks
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
      
      return config;
    }
  }
})
