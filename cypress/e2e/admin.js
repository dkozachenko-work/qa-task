import ws from "socket.io-client";
const io = require("socket.io-client");
const wss = "https://sandbox-shared.staging.exberry-uat.io";

describe("Admin part", () => {
  it("Login", () => {
    cy.origin("https://staging-admin-exchange-om2.eu.auth0.com", () => {
      cy.visit("https://admin.master.dev.exberry.io/");
      cy.get("#username").type("qacandidate@gmail.com");
      cy.get("#password").type("p#xazQI!Y%z^L34a#");
      cy.contains("Continue").click({ force: true });
    });
  });

  it("Create Calendar", () => {
    cy.get('[data-testid="nav-menu-button-exchange-calendars"]').click();
  });

  it.only("check web socket ", () => {
    const webSocket = ws("wss://sandbox-shared.staging.exberry-uat.io");
    // const webClient = io.connect(wss, {
    //   transports: ["websocket"],
    // });

    webSocket.on("connect", () => {
      console.log(webSocket.connected); // x8WIv7-mJelg7on_ALbx
    });

    cy.streamRequest(
      {
        url: "wss://sandbox-shared.staging.exberry-uat.io",
      },
      {
        startUpMessage: {
          d: {
            apiKey: "241e6faf-bbde-4f33-bd5d-5a63d690adfb",
            timestamp: 1688393989960,
            signature:
              "36f63b70c0edab1a692c56efc846b323fb8b4843c2dd11b1aace8e5747a92909",
          },
          q: "exchange.market/createSession",
          sid: 1,
        },
      }
    );
    // ioClient.emit({
    //   d: {
    //     apiKey: "241e6faf-bbde-4f33-bd5d-5a63d690adfb",
    //     timestamp: 1688393989960,
    //     signature:
    //       "36f63b70c0edab1a692c56efc846b323fb8b4843c2dd11b1aace8e5747a92909",
    //   },
    //   q: "exchange.market/createSession",
    //   sid: 1,
    // });

    // webSocket.on("connect", () => {
    //   console.log(webSocket.connected);
    //   socket.send("createSession", {
    //     d: {
    //       apiKey: "241e6faf-bbde-4f33-bd5d-5a63d690adfb",
    //       timestamp: 1688393989960,
    //       signature:
    //         "36f63b70c0edab1a692c56efc846b323fb8b4843c2dd11b1aace8e5747a92909",
    //     },
    //     q: "exchange.market/createSession",
    //     sid: 1,
    //   });
    // });
    // cy.visit(
    //   "https://sandbox.exberry.io/?url=https://raw.githubusercontent.com/dmitriyslaym/qa-test/main/exchange-gw-sandbox-data.json"
    // ).then(() => {
    //   webSocket.emit({
    //     d: {
    //       apiKey: "241e6faf-bbde-4f33-bd5d-5a63d690adfb",
    //       timestamp: 1688399595180,
    //       signature:
    //         "9d951a322a7a04df99905b3fcc2df598ce1e7b8d60beb3634c785617eccdb9f9",
    //     },
    //     q: "exchange.market/createSession",
    //     sid: 1,
    //   });
    // });
  });
});
