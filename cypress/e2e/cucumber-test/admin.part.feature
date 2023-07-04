Feature: Admin part
    Scenario: Login
        Given The User is on the exberry login page
        When The User proceed with Email "qacandidate@gmail.com" and password "p#xazQI!Y%z^L34a#"
        Then The User will be redirected to the main 'admin.master.dev.exberry.io' page

    Scenario: Create Calendar
        Given The User is on the exberry admin is able to see Calendars icon
        When Adding new calendar after opening Calendar Management page
        And Populating all required fields
            | Name | TimeZone  | MarketOpen | MarketClose | TradingDays | Holidays |
            | AQA  | UTC+01:00 |            |             | smtwtfs     |          |
        Then Newly created calendar should be appeared in the table

    Scenario: Create Instrument
        Given The QA has following station data to post for new Instrument creation:
            | symbol | Description | Calendar | Status | Quote Currency | Price Precision | Quantity Precision | Min Quantity | Max Quantity |
            | test   | Instrument  | 1881     | ACTIVE | USD            | 6               | 2                  | 1            | 100000       |
        When After making the POST request with required JSON data
        Then Response from the new Instrument POST request should have 200 status and indicated id

# Scenario: Create MP
#     Given The User is on the Market Participants page
#     When The User click on "Add new" button on the right top part of the screen
#     When The User fill required inputs and submit the form
#     Then Newly created MP should appear in the table

# Scenario: Create APIKey for MP
#     Given The User is on the Market Participants page
#     When The User click on "Add APIKey" button of the MP that was just created
#     When The User select all the permissions and generate APIKey
#     Then Newly created APIKey and Secret should be saved
