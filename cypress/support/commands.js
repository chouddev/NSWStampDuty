// Custom Cypress commands for NSW Service testing

// Command to navigate to NSW Service homepage
Cypress.Commands.add('visitNSWService', () => {
  cy.visit('/')
  cy.waitForPageLoad()
})

// Command to navigate to motor vehicle stamp duty page
Cypress.Commands.add('visitMotorVehicleStampDuty', () => {
  cy.visit('/transaction/check-motor-vehicle-stamp-duty')
  cy.waitForPageLoad()
})



// Command to wait for calculator page to load
Cypress.Commands.add('waitForCalculatorPage', () => {
  cy.url().should('include', 'calculator')
  cy.get('body').should('be.visible')
})

// Command to fill vehicle value
Cypress.Commands.add('fillVehicleValue', (value) => {
  cy.get('#purchasePrice')
    .type(value)
})

// Command to calculate stamp duty
Cypress.Commands.add('calculateStampDuty', () => {
  cy.get('button:contains("Calculate"), input[type="submit"], .calculate-button')
    .first()
    .click()
})

// Command to verify stamp duty result
Cypress.Commands.add('verifyStampDutyResult', (expectedAmount) => {
  cy.get('.result, .calculation-result, [data-testid="result"]')
    .should('be.visible')
    .and('contain.text', expectedAmount)
})

// Command to verify popup window appears
Cypress.Commands.add('verifyPopupWindow', () => {
  cy.get('#purchasePrice')
    .should('be.visible')
})

// Command to verify popup contents
Cypress.Commands.add('verifyPopupContents', (vehicleValue, stampDutyAmount) => {
  cy.get('.modal, .popup, .dialog, [role="dialog"], .modal-dialog')
    .should('be.visible')
    .and('contain.text', vehicleValue)
    .and('contain.text', stampDutyAmount)
})

// Command to close popup window
Cypress.Commands.add('closePopupWindow', () => {
  cy.get('.modal .close, .popup .close, .dialog .close, [aria-label="Close"], .btn-close')
    .first()
    .click()
})

// Command to take screenshot with custom name
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'fullPage' })
})

// Command to verify page elements are loaded
Cypress.Commands.add('verifyPageLoaded', () => {
  cy.get('body').should('be.visible')
  cy.get('main, .main-content, #main').should('exist')
})
