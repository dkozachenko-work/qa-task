import { Basepage } from "./base.page";

class AdminPage extends Basepage {
  static calendarIconLocator = "[data-testid='DateRangeIcon']";

  checkCalendarIcon() {
    cy.get(AdminPage.calendarIconLocator)
      .should("be.visible")
      .siblings("div")
      .should("have.text", "Calendars");
  }

  openCalendar() {
    super.clickElementByProvidedLocator(AdminPage.calendarIconLocator);
  }
}

export const adminPage = new AdminPage();
