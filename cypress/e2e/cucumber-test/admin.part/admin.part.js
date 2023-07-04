import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { basepage } from "../../../po/base.page";
import { adminPage } from "../../../po/admin.page";
import { calendarManagementPage } from "../../../po/calendar.management.page";
import { instrumentPage } from "../../../po/instruments.page";

before(() => {
  cy.clearAllSessionStorage();
  cy.clearAllCookies();
  cy.fixture("admin_page").its("moduleLabels").as("adminPageModuleLabels");
});

Given("The User is on the exberry login page", () => {
  basepage.open();
});

When(
  "The User proceed with Email {string} and password {string}",
  (username, password) => {
    basepage.login(username, password);
  }
);

Then("The User will be redirected to the main {string} page", function (host) {
  basepage.checkLocationHostname(host);
  Cypress._.forEach(this.adminPageModuleLabels, (moduleLabel) => {
    basepage.checkElementVisibleByText(moduleLabel);
  });
});

// Scenario: Create Calendar

Given("The User is on the exberry admin is able to see Calendars icon", () => {
  adminPage.checkCalendarIcon();
  adminPage.openCalendar();
});

When("Adding new calendar after opening Calendar Management page", () => {
  adminPage.openCalendar();
  calendarManagementPage.openAddNewCalendarModalWindow();
});

When("Populating all required fields", function (datatable) {
  calendarManagementPage.populateRequiredCalendarData(datatable);
});

Then("Newly created calendar should be appeared in the table", function () {
  calendarManagementPage.verifyTheNewCalendarAppearedInTheTabel();
});

// Scenario: Create Instrument

Given(
  "The QA has following station data to post for new Instrument creation:",
  function (datatable) {
    cy.wrap(datatable.hashes()[0]).as("postInstrumentData");
  }
);

When("After making the POST request with required JSON data", function () {
  instrumentPage.getBearerToken().then((token) => {
    instrumentPage.addNewInstrumentPostRequest(this.postInstrumentData, token);
  });
});

Then(
  "Response from the new Instrument POST request should have 200 status and indicated id",
  function () {
    instrumentPage.verifyAddNewInstrumentResponse(this.instrumentResponse);
  }
);
