const { Given, When, Then } = require('@cucumber/cucumber');
// const { GetCardByIdController } = require('../../adapters/controllers/card/get-card-by-id.controller');
const { GetCardByIdController } = require('../../dist/adapters/controllers/get-card-by-id/get-card-by-id.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let cardId;

class GetCardByIdUseCaseMock {
  async execute(id) {
    return 'mock-encrypted-card-data';
  }
}

Given('I have a valid card id', function () {
  cardId = 'mock-card-id';
  controller = new GetCardByIdController(new GetCardByIdUseCaseMock());
});

When('I send a GET request to {string} with the card id', async function (path) {
  const httpRequest = {
    params: { id: cardId },
    path,
    method: 'GET',
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the encrypted card data', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body).to.equal('mock-encrypted-card-data');
});
