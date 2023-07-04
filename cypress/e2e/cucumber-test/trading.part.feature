Feature: Trading part
    Scenario: Create session
        Given The User is on Trading Part page
        When The User in Message Builder section put the APIKey and Secret values of the APIKey that he recently generated
        When The User updating timestamp input clicking on Refresh icon and Sending object
        Then No error message should be displayed and User proceed with Place Order endpoints


