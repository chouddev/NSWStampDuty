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
    reportDir: "cypress/reports/.jsons",
    overwrite: false,
    html: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
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
      // Import the cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
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
      
      // Generate merged HTML report after test run
      on('after:run', async () => {
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        
        try {
          console.log('📊 Generating merged Mochawesome report...');
          
          // Merge JSON reports
          const { stdout: mergeOutput } = await execPromise(
            'npx mochawesome-merge "cypress/reports/.jsons/*.json" > cypress/reports/merged-report.json'
          );
          
          // Generate HTML report
          const { stdout: htmlOutput } = await execPromise(
            'npx marge cypress/reports/merged-report.json --reportDir cypress/reports --inline'
          );
          
          console.log('✅ Mochawesome report generated: cypress/reports/merged-report.html');
        } catch (error) {
          console.error('❌ Error generating report:', error.message);
        }
      });
      
      return config;
    }
  }
})
