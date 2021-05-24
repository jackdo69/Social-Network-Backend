@Elasticsearch
@Authorization

Feature: Authentication

    @Authorization_1
    Scenario: I can register a new user
        Given existing user "auth/register-existed.json"
        When I register with "auth/register-existed.json"
        Then the status code should be 422
        When I register with "auth/register-missing-field.json"
        Then the status code should be 422
        When I register with "auth/register-valid.json"
        Then the status code should be 201
        Then I will receive the access and refresh tokens

    @Authorization_2
    Scenario: I can login as user
        Given existing user "auth/register-valid.json"
        When I log in with "auth/login-wrong-username.json"
        Then the status code should be 401
        When I log in with "auth/login-wrong-password.json"
        Then the status code should be 401
        When I log in with "auth/login-valid.json"
        Then the status code should be 202
        Then I will receive the access and refresh tokens

    @Authorization_3
    Scenario: I can logout from the system
        Given existing user "auth/register-valid.json"
        When I log out the system
        Then the status code should be 401
        Given user "auth/login-valid.json" is logged in
        When I log out the system
        Then the status code should be 200

    @Authorization_4
    Scenario: I can renew my token
        Given existing user "auth/register-valid.json"
        When I renew my token
        Then the status code should be 401
        Given user "auth/login-valid.json" is logged in
        When I renew my token
        Then the status code should be 202



