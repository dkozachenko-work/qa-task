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

//  Scenario: Create session

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

//  Scenario: Place order

Given(
  "User is moved to PlaceOrder method within TRADING API section",
  function () {
    cy.get('[data-cy="method-item-Trading API/placeOrder"]').click();
  }
);

When(
  "Update Message Builder Block with required values and click Send",
  function () {
    cy.streamRequest(
      {
        url: "wss://sandbox-shared.staging.exberry-uat.io",
      },
      {
        d: {
          orderType: "Limit",
          side: "Buy",
          quantity: 1.3,
          price: 100.33,
          instrument: "INS3",
          mpOrderId: 1001,
          timeInForce: "GTC",
          userId: "UATUserTest12",
        },
        q: "v1/exchange.market/placeOrder",
        sid: 1,
      }
    );
  }
);
