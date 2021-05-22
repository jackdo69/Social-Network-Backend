@Elasticsearch

@Authorization
Feature: Authentication

    @Authorization_1
    Scenario: I can register a new user
        Given existing user "auth/register-existed.json"
        When I try to register with "auth/register-existed.json" status code should be 422 
        When I try to register with "auth/register-missing-field.json" status code should be 422
        When I try to register with "auth/register-valid.json" status code should be 201
