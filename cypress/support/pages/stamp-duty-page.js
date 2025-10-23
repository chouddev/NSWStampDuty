// Page Object Model for Motor Vehicle Stamp Duty Page

class StampDutyPage {
  
  // Selectors
  selectors = {
    pageContainer: 'body',
    pageTitle: 'h1, .page-title, [data-testid="page-title"]',
    checkOnlineButton: '.cta__action > .button, [data-testid="check-online-button"], .btn-primary, button:contains("Check online")',
    introductionSection: '.introduction, .intro, [data-testid="introduction"]',
    stampDutyInfo: '.stamp-duty-info, .information, [data-testid="stamp-duty-info"]',
    calculatorForm: 'form, .calculator-form, [data-testid="calculator-form"]',
    vehicleValueInput: '#purchasePrice, input[name="vehicleValue"], input[type="number"], input[placeholder*="value"]',
    calculateButton: 'button:contains("Calculate"), input[type="submit"], .calculate-button',
    resultSection: '.result, .calculation-result, [data-testid="result"]',
    errorMessage: '.error, .validation-error, .alert-danger, [role="alert"]',
    moreInfoSection: '.more-information, .additional-info, [data-testid="more-info"]',
    linksSection: '.links, .related-links, [data-testid="links"]',
    popupModal: '.modal, .popup, .dialog, [role="dialog"], .modal-dialog'
  }

  // Actions
  visit() {
    cy.visit('/transaction/check-motor-vehicle-stamp-duty')
    cy.waitForPageLoad()
  }

  verifyPageLoaded() {
    cy.url().should('include', 'check-motor-vehicle-stamp-duty')
    cy.get(this.selectors.pageContainer).should('be.visible')
  }

  verifyPageTitle() {
    cy.get(this.selectors.pageTitle)
      .should('be.visible')
      .and('contain.text', 'motor vehicle stamp duty')
  }

  clickCheckOnlineButton() {
    cy.get(this.selectors.checkOnlineButton)
      .first()
      .should('be.visible')
      .click()
  }

  verifyCheckOnlineButtonVisible() {
    cy.get(this.selectors.checkOnlineButton)
      .should('be.visible')
  }

  verifyIntroductionSection() {
    cy.get(this.selectors.introductionSection)
      .should('be.visible')
  }

  verifyStampDutyInfo() {
    cy.get(this.selectors.stampDutyInfo)
      .should('be.visible')
  }

  // Calculator page methods
  verifyCalculatorPageLoaded() {
    cy.url().should('include', 'calculator')
    cy.get(this.selectors.calculatorForm)
      .should('be.visible')
  }

  enterVehicleValue(value) {
    cy.get(this.selectors.vehicleValueInput)
      .first()
      .clear()
      .type(value)
  }

  clickCalculateButton() {
    cy.get(this.selectors.calculateButton)
      .first()
      .click()
  }

  verifyCalculationResult() {
    cy.get(this.selectors.resultSection)
      .should('be.visible')
  }

  verifyPopupModal() {
    cy.get(this.selectors.popupModal)
      .should('be.visible')
  }

  verifyPopupContents(vehicleValue, containsDollarSign = true) {
    cy.get(this.selectors.popupModal)
      .should('be.visible')
      .and('contain.text', vehicleValue)
    
    if (containsDollarSign) {
      cy.get(this.selectors.popupModal)
        .and('contain.text', '$')
    }
  }

  verifyErrorMessage() {
    cy.get(this.selectors.errorMessage)
      .should('be.visible')
  }

  verifyNoCalculationResult() {
    cy.get(this.selectors.resultSection)
      .should('not.exist')
  }

  // Validation methods
  verifyMoreInfoSection() {
    cy.get(this.selectors.moreInfoSection)
      .should('be.visible')
  }

  verifyLinksSection() {
    cy.get(this.selectors.linksSection)
      .should('be.visible')
  }

  // Utility methods
  takeScreenshot(name) {
    cy.screenshot(name, { capture: 'fullPage' })
  }

  verifyPageContainsText(text) {
    cy.get(this.selectors.pageContainer)
      .should('contain.text', text)
  }

  // Accessibility methods
  verifyHeadingStructure() {
    cy.get('h1').should('exist')
    cy.get('h2').should('exist')
  }

  verifyImagesHaveAltText() {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  }

  verifyKeyboardNavigation() {
    cy.get('a, button, input, select, textarea')
      .first()
      .focus()
      .should('be.focused')
  }
}

module.exports = { StampDutyPage }
