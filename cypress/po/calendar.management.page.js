import { Basepage } from "./base.page";

class CalendarManagementPage extends Basepage {
  static nameCalendarInputLocator = "#name";
  static selectTimeZoneLocator = "[id='mui-component-select-Time Zone (UTC)']";
  static submitNewCalendarLocator = '[data-testid="submit-btn"]';
  static calendarManagementRowsLocator = '[data-testid="data-table"] tr';
  static tradingDaysIconsLocator = '[data-testid*="week-days-picker-"]';

  openAddNewCalendarModalWindow() {
    super.clickElementByProvidedLocator('[data-testid="PlaylistAddIcon"]');
  }
  populateRequiredCalendarData(datatable) {
    const calendarName = datatable.hashes()[0].Name + Cypress._.now();
    cy.wrap(calendarName).as("calendarNameLabel");
    super
      .clickElementByProvidedLocator(
        CalendarManagementPage.nameCalendarInputLocator
      )
      .type(calendarName);
    super.clickElementByProvidedLocator(
      CalendarManagementPage.selectTimeZoneLocator
    );
    cy.contains(datatable.hashes()[0].TimeZone).click();
    super.clickElementByProvidedLocator(
      CalendarManagementPage.submitNewCalendarLocator
    );
  }

  verifyTheNewCalendarAppearedInTheTabel() {
    cy.contains(
      CalendarManagementPage.calendarManagementRowsLocator,
      this.calendarNameLabel
    )
      .should("be.visible")
      .then((row) => {
        cy.wrap(row)
          .find("td")
          .then(($el) => {
            const rowText = Cypress.$($el).text();
            expect(rowText).to.contain("+01:00");
          });
        cy.wrap(row)
          .find(CalendarManagementPage.tradingDaysIconsLocator)
          .each((dayIcon) => {
            cy.wrap(dayIcon).should(
              "have.css",
              "background-color",
              "rgb(65, 130, 255)"
            );
          });
      });
  }
}

export const calendarManagementPage = new CalendarManagementPage();
