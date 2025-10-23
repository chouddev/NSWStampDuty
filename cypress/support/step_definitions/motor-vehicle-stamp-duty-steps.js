// Step definitions for motor vehicle stamp duty feature

const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps')

// Background steps
Given('I am on the NSW Service website', () => {
  cy.visit('/')
  cy.log('Navigated to NSW Service website')
})

Given('I navigate to the motor vehicle stamp duty page', () => {
  cy.visit('/transaction/check-motor-vehicle-stamp-duty')
  cy.log('Navigated to motor vehicle stamp duty page')
})

// Button interaction steps
When('I click the {string} button', (buttonText) => {
  if (buttonText === 'Check online') {
    cy.get('[data-testid="check-online-button"], .btn-primary, button:contains("Check online")')
      .first()
      .should('be.visible')
      .click()
    cy.log(`Clicked ${buttonText} button`)
  } else if (buttonText === 'Calculate') {
    cy.get('button:contains("Calculate"), input[type="submit"], .calculate-button')
      .first()
      .click()
    cy.log(`Clicked ${buttonText} button`)
  } else {
    cy.get(`button:contains("${buttonText}")`).click()
    cy.log(`Clicked ${buttonText} button`)
  }
})

// Selection steps
When('I select {string} for the vehicle question', (option) => {
  cy.get(`input[value="${option}"], input[type="radio"][value*="${option}"], label:contains("${option}")`)
    .first()
    .click()
  cy.log(`Selected ${option} for vehicle question`)
})

// Input steps
When('I enter a vehicle value of {string}', (value) => {
  const numericValue = value.replace(/[$,]/g, '')
  cy.get('input[name="vehicleValue"], input[type="number"], input[placeholder*="value"]')
    .first()
    .clear()
    .type(numericValue)
  cy.log(`Entered vehicle value: ${value}`)
})

// Verification steps
Then('I should be redirected to the stamp duty calculator page', () => {
  cy.url().should('include', 'calculator')
  cy.log('Verified redirect to calculator page')
})

Then('the calculator page should be fully loaded', () => {
  cy.get('body').should('be.visible')
  cy.log('Verified calculator page is fully loaded')
})

Then('I should see the stamp duty calculation result', () => {
  cy.get('.result, .calculation-result, [data-testid="result"]')
    .should('be.visible')
  cy.log('Verified stamp duty calculation result is displayed')
})

Then('I should see a popup window with calculation details', () => {
  cy.get('.modal, .popup, .dialog, [role="dialog"], .modal-dialog')
    .should('be.visible')
  cy.log('Verified popup window with calculation details is displayed')
})

Then('the popup should contain the vehicle value and stamp duty amount', () => {
  // Verify popup contains vehicle value ($30,000) and stamp duty amount
  cy.get('.modal, .popup, .dialog, [role="dialog"], .modal-dialog')
    .should('be.visible')
    .and('contain.text', '30000')
    .and('contain.text', '$')
  cy.log('Verified popup contains vehicle value and stamp duty amount')
})
