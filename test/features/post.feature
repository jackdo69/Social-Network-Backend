@Elasticsearch
@Post

Feature: Managing posts

    @Post_1
    Scenario: I can get posts from the database
        Given Posts "post/post-bulk.json" are loaded in the database
        When I get the posts from the server
        Then the status code should be 401
        Given existing user "auth/register-valid.json"
        Given user "auth/login-valid.json" is logged in
        When I get the posts from the server
        Then the status code should be 200
        Then I receive 3 posts