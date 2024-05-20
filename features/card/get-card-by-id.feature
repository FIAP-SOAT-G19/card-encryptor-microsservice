Feature: Get Card By Id
  As a user
  I want to get a card by its id
  So that I can retrieve the card's details

Scenario: Successfully get a card by id
  Given I have a valid card id
  When I send a GET request to "/card/{id}" with the card id
  Then I should receive a 200 status code and the encrypted card data
