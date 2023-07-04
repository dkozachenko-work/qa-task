export class Basepage {
  open() {
    cy.visit("https://admin.master.dev.exberry.io/");
  }
  login(username, password) {
    cy.origin(
      "https://staging-admin-exchange-om2.eu.auth0.com",
      { args: { username, password } },
      ({ username, password }) => {
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.contains("Continue").click({ force: true });
      }
    );
  }
  checkLocationHostname(host) {
    cy.location().then((loc) => {
      expect(loc.hostname).to.eq(host);
    });
  }
  checkElementVisibleByText(text) {
    cy.contains(text).should("be.visible");
  }

  clickElementByProvidedLocator(locator) {
    return cy.get(locator).click();
  }
}

export const basepage = new Basepage();
