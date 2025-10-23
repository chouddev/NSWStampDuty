// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import XPath support
import 'cypress-xpath'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // This is useful for handling third-party scripts
  return false
})

// Custom commands for BDD
Cypress.Commands.add('logStep', (step) => {
  cy.log(`BDD Step: ${step}`)
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().should('have.property', 'document')
})

// Custom assertion for BDD
Cypress.Commands.add('assertPageTitle', (expectedTitle) => {
  cy.title().should('contain', expectedTitle)
})

Cypress.Commands.add('assertElementVisible', (selector) => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('assertElementContainsText', (selector, text) => {
  cy.get(selector).should('contain.text', text)
})
