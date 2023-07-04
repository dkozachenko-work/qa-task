import { Basepage } from "./base.page";

class InstrumentPage extends Basepage {
  getBearerToken() {
    return cy
      .request({
        method: "POST",
        url: `https://admin-api-master.ops.rnd.exberry.io/api/auth/token`,
        body: {
          email: "qacandidate@gmail.com",
          password: "p#xazQI!Y%z^L34a#",
        },
      })
      .then(({ body }) => {
        return body.token;
      });
  }

  addNewInstrumentPostRequest(inputData, token) {
    cy.request({
      method: "POST",
      url: `https://admin-api-master.ops.rnd.exberry.io/api/v2/instruments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        symbol: Cypress._.now(),
        quoteCurrency: "USD",
        calendarId: inputData.Calendar,
        pricePrecision: inputData["Price Precision"],
        quantityPrecision: inputData["Quantity Precision"],
        minQuantity: inputData["Min Quantity"],
        maxQuantity: inputData["Max Quantity"],
        activityStatus: inputData.Status,
        description: inputData.Description,
      },
    }).then(({ body, status }) => {
      cy.wrap({ body, status }).as("instrumentResponse");
    });
  }
  verifyAddNewInstrumentResponse(responseData) {
    expect(responseData.status).to.be.eq(200);
    expect(responseData.body.id).to.have.length;
    expect(responseData.body.marketStatus).to.be.eq("Opened");
    expect(responseData.body.tradingStatus).to.be.eq("TRADE");
  }
}

export const instrumentPage = new InstrumentPage();
