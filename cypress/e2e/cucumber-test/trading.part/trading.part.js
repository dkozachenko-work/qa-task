import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { tradingPage } from "../../../po/trading.page";
import { getAPIKeyForMP } from "../../../po/api";

before(() => {
  cy.clearAllSessionStorage();
  cy.clearAllCookies();
  getAPIKeyForMP();
});

beforeEach(() => {
  cy.viewport(1920, 1080);
});

Given("The User is on Trading Part page", function () {
  tradingPage.open();
});

When(
  "The User in Message Builder section put the APIKey and Secret values of the APIKey that he recently generated",
  function () {
    tradingPage.createSession();
    tradingPage.populateSecrets(
      this.apiKeySecretResponse.secret,
      this.apiKeySecretResponse.apiKey
    );
  }
);

When(
  "The User updating timestamp input clicking on Refresh icon and Sending object",
  function () {
    tradingPage.refreshTimestamp();
    tradingPage.submitSession();
  }
);

Then(
  "No error message should be displayed and User proceed with Place Order endpoints",
  function () {
    tradingPage.checkTheLastLog();
  }
);
