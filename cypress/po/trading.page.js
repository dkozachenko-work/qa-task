import { Basepage } from "./base.page";

class TradingPage extends Basepage {
  open() {
    return cy.visit(
      "https://sandbox.exberry.io/?url=https://raw.githubusercontent.com/dmitriyslaym/qa-test/main/exchange-gw-sandbox-data.json"
    );
  }

  createSession() {
    cy.get('[data-cy="method-item-Authentication API/createSession"]', {
      timeout: 10000,
    }).click();
    cy.get('[data-cy="message-builder"]').should("be.visible");
  }

  populateSecrets(secret, key) {
    cy.get('[id="message-builder-field-secret"]').clear().type(secret);
    cy.get("#message-builder-field-apiKey")
      .should("be.visible", { timeout: 5000 })
      .clear()
      .type(key);
  }

  refreshTimestamp() {
    super.clickElementByProvidedLocator(
      '[data-cy="message-builder-field-timestamp-timestamp-refresh"]'
    );
  }
  submitSession() {
    super.clickElementByProvidedLocator(
      '[data-cy="message-builder-submit-button"]'
    );
    super.clickElementByProvidedLocator(
      '[data-cy="request-form-submit-btn-active"]'
    );
  }

  checkTheLastLog() {
    cy.get('[data-cy*="logger-row-data-"]')
      .last()
      .should("not.contain", "errorCode");
  }
}

export const tradingPage = new TradingPage();
