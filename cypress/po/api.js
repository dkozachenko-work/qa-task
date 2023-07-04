export const getAPIKeyForMP = () => {
  cy.request({
    method: "POST",
    url: `https://admin-api-master.ops.rnd.exberry.io/api/auth/token`,
    body: {
      email: "qacandidate@gmail.com",
      password: "p#xazQI!Y%z^L34a#",
    },
  }).then(({ body }) => {
    cy.request({
      method: "POST",
      url: `https://admin-api-master.ops.rnd.exberry.io/api/mps`,
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
      body: {
        name: "qatestMP" + Cypress._.random(0, 1000000),
        compId: "test1" + Cypress._.random(0, 1000000),
        Status: "Active",
      },
    }).then((response) => {
      const mpId = response.body.id;

      // MP ApiKey
      cy.request({
        method: "POST",
        url: `https://admin-api-master.ops.rnd.exberry.io/api/mps/${mpId}/api-keys`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
        body: {
          label: "label1",
          permissions: [
            "market-service:market:order_book_depth",
            "market-service:market:order_book_state",
            "market-service:market:place_order",
            "market-service:market:cancel_order",
            "market-service:market:modify_order",
            "market-service:market:replace_order",
            "market-service:market:mass_cancel",
            "market-service:market:execution_reports",
            "market-service:market:mass_order_status",
            "market-service:market:trades",
            "reporting:mp:orders",
            "reporting:mp:trades",
          ],
          cancelOnDisconnect: false,
        },
      }).then(({ body }) => {
        cy.wrap(body).as("apiKeySecretResponse");
        const mpId = response.body.mpId;
        const secret = response.body.secret;
        const apiKey = response.body.apiKey;
      });
    });
  });
};
