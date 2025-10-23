# NSW Service Cypress BDD Framework

A comprehensive Cypress testing framework with BDD (Behavior Driven Development) integration for testing the NSW Service motor vehicle stamp duty functionality.

## 🎯 Test Scenario

**Primary Test Case**: Click the "Check Online" button and assert that the subsequent page appears.

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── bdd-tests/                    # BDD feature files
│   │   ├── motor-vehicle-stamp-duty.feature
│   │   └── nsw-service-navigation.feature
│   ├── smoke-tests/                  # Smoke test files
│   │   └── motor-vehicle-stamp-duty-smoke.cy.js
│   └── regression-tests/             # Regression test files
│       └── motor-vehicle-stamp-duty-regression.cy.js
├── support/
│   ├── pages/                        # Page Object Model
│   │   ├── nsw-service-page.js
│   │   └── stamp-duty-page.js
│   ├── step_definitions/             # BDD step definitions
│   │   ├── motor-vehicle-stamp-duty-steps.js
│   │   └── nsw-service-navigation-steps.js
│   ├── commands.js                   # Custom Cypress commands
│   └── e2e.js                       # Support file configuration
├── fixtures/                         # Test data files
├── screenshots/                      # Test screenshots
├── videos/                          # Test recordings
└── reports/                         # Test reports
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests

#### Using the Test Runner Script

```bash
# Make the script executable (if not already)
chmod +x run-tests.sh

# Run specific test suites
./run-tests.sh smoke          # Run smoke tests only
./run-tests.sh regression     # Run regression tests only
./run-tests.sh bdd           # Run BDD tests only
./run-tests.sh all           # Run all tests

# Run tests in different browsers
./run-tests.sh chrome        # Run in Chrome
./run-tests.sh firefox       # Run in Firefox
./run-tests.sh edge          # Run in Edge

# Open Cypress GUI
./run-tests.sh open          # Open Cypress Test Runner

# Clean test artifacts
./run-tests.sh clean         # Clean videos, screenshots, reports
```

#### Using npm Scripts

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run specific test suites
npm run test:smoke
npm run test:regression
npm run test:bdd

# Open Cypress GUI
npm run cypress:open
```

## 🧪 Test Types

### 1. BDD Tests (Gherkin)
- **Location**: `cypress/e2e/bdd-tests/`
- **Format**: `.feature` files
- **Purpose**: Business-readable test scenarios

### 2. Smoke Tests
- **Location**: `cypress/e2e/smoke-tests/`
- **Purpose**: Critical functionality verification
- **Focus**: Check Online button functionality

### 3. Regression Tests
- **Location**: `cypress/e2e/regression-tests/`
- **Purpose**: Comprehensive functionality testing
- **Focus**: Extended scenarios and edge cases

## 🔧 Configuration

### Cypress Configuration
- **File**: `cypress.config.js`
- **Base URL**: `https://www.service.nsw.gov.au`
- **Viewport**: 1280x720 (desktop)
- **Timeouts**: Configured for NSW Service response times

### BDD Configuration
- **Processor**: `cypress-cucumber-preprocessor`
- **Step Definitions**: `cypress/support/step_definitions/`
- **Non-global**: Step definitions are scoped to features

## 📋 Test Scenarios

### Primary Scenario
```
Given I am on the NSW Service website
And I navigate to the motor vehicle stamp duty page
When I click the "Check online" button
Then I should be redirected to the stamp duty calculator page
And the calculator page should be fully loaded
And I should see the stamp duty calculation form
```

## 🛠️ Custom Commands

The framework includes custom Cypress commands for NSW Service testing:

- `cy.visitNSWService()` - Navigate to NSW Service homepage
- `cy.visitMotorVehicleStampDuty()` - Navigate to stamp duty page
- `cy.clickCheckOnlineButton()` - Click the Check Online button
- `cy.waitForCalculatorPage()` - Wait for calculator page to load
- `cy.takeScreenshot(name)` - Take custom screenshot

## 📊 Reporting

- **Mochawesome Reporter**: HTML and JSON reports
- **Screenshots**: Automatic on test failure
- **Videos**: Recorded for all test runs
- **Cucumber Reports**: JSON format for BDD tests

## 🔍 Page Object Model

The framework uses Page Object Model for maintainable test code:

- `NSWServicePage`: Homepage interactions
- `StampDutyPage`: Motor vehicle stamp duty page interactions

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Electron (Cypress default)

## 📝 Notes

- Tests are configured to handle NSW Service's specific page structure
- Custom selectors accommodate various possible element structures
- Framework includes retry logic for flaky tests
- Screenshots are taken at key verification points

## 🤝 Contributing

1. Follow the existing code structure
2. Add new step definitions for additional scenarios
3. Update Page Object Model for new page interactions
4. Maintain BDD feature files for business scenarios

## 📞 Support

For questions or issues with the framework, please refer to the Cypress documentation or create an issue in the project repository.
