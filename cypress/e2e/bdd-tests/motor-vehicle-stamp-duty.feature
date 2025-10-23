@motor-vehicle-stamp-duty @smoke
Feature: Motor Vehicle Stamp Duty Check
  As a NSW resident
  I want to check motor vehicle stamp duty
  So that I can calculate the cost when buying a vehicle

  Background:
    Given I am on the NSW Service website
    And I navigate to the motor vehicle stamp duty page

  @check-online-button @critical
  Scenario: Complete Motor Vehicle Stamp Duty Calculation Flow
    When I click the "Check online" button
    Then I should be redirected to the stamp duty calculator page
    And the calculator page should be fully loaded
    When I select "Yes" for the vehicle question
    And I enter a vehicle value of "$30000"
    And I click the "Calculate" button
    Then I should see the stamp duty calculation result
    And I should see a popup window with calculation details
    And the popup should contain the vehicle value and stamp duty amount
