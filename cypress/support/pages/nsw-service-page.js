// Page Object Model for NSW Service Homepage

class NSWServicePage {
  
  // Selectors
  selectors = {
    homepage: 'body',
    navigation: 'nav, .navigation, .main-nav, [role="navigation"]',
    logo: '.logo, [data-testid="logo"], img[alt*="Service NSW"]',
    searchBox: 'input[type="search"], .search-input, [data-testid="search"]',
    mainMenu: '.main-menu, .primary-nav, [role="menubar"]',
    footer: 'footer, .footer, [role="contentinfo"]'
  }

  // Actions
  visit() {
    cy.visit('/')
    cy.waitForPageLoad()
  }

  verifyHomepageLoaded() {
    cy.url().should('include', 'service.nsw.gov.au')
    cy.get(this.selectors.homepage).should('be.visible')
  }

  verifyNavigationVisible() {
    cy.get(this.selectors.navigation).should('be.visible')
  }

  verifyLogoVisible() {
    cy.get(this.selectors.logo).should('be.visible')
  }

  searchForService(searchTerm) {
    cy.get(this.selectors.searchBox)
      .clear()
      .type(searchTerm)
      .type('{enter}')
  }

  clickMainMenu() {
    cy.get(this.selectors.mainMenu).first().click()
  }

  verifyFooterVisible() {
    cy.get(this.selectors.footer).should('be.visible')
  }

  // Navigation methods
  navigateToMotorVehicleStampDuty() {
    cy.visit('/transaction/check-motor-vehicle-stamp-duty')
    cy.waitForPageLoad()
  }

  // Utility methods
  takeScreenshot(name) {
    cy.screenshot(name, { capture: 'fullPage' })
  }

  verifyPageTitle(expectedTitle) {
    cy.title().should('contain', expectedTitle)
  }
}

module.exports = { NSWServicePage }
