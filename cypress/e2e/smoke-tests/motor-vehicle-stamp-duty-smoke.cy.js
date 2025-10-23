// Smoke tests for NSW Service Motor Vehicle Stamp Duty
describe('NSW Service Motor Vehicle Stamp Duty - Smoke Tests', () => {
  
  beforeEach(() => {
    // Visit the motor vehicle stamp duty page before each test
    cy.visit('/transaction/check-motor-vehicle-stamp-duty')
    cy.waitForPageLoad()
  })

  it('should complete full motor vehicle stamp duty calculation flow', () => {
    // Step 1: Click the Check Online button
    cy.get('.cta__action > .button').click()
    
    // Verify redirect to calculator page
    cy.waitForCalculatorPage()
    
    // Verify the subsequent page (calculator) appears
    cy.url().should('include', 'calculator')
    cy.get('body').should('be.visible')
    
    // Step 2: Select "Yes" for the vehicle question
    cy.get('input[value="Yes"], input[type="radio"][value*="Yes"], label:contains("Yes")')
      .first()
      .click()
    
    // Step 3: Enter a vehicle value
    cy.fillVehicleValue('30000')
    
    // Step 4: Click the Calculate button
    cy.calculateStampDuty()
    
    // Verify calculation result appears
    cy.get('.result, .calculation-result, [data-testid="result"]')
      .should('be.visible')
    
    // Step 5: Verify popup window appears
    cy.verifyPopupWindow()
    
    // Step 6: Assert popup contents
    cy.get('.modal, .popup, .dialog, [role="dialog"], .modal-dialog')
      .should('be.visible')
      .and('contain.text', '30000')
      .and('contain.text', '$')
    
    // Take screenshot for verification
    cy.takeScreenshot('complete-motor-vehicle-stamp-duty-calculation')
  })
})
