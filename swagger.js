const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Social Network Backend",
    description: "Social Network API",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "Posts",
      description: "API for posts in the system",
    },
    {
      name: "Users",
      description: "API for users in the system",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/post": {
      get: {
        tags: ["Posts"],
        summary: "Query posts",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/Posts",
            },
          },
        },
      },
    },
    "/post": {
      post: {
        tags: ["Posts"],
        summary: "Add a new post to the store",
        description: "",
        operationId: "addPost",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Post object that needs to be added to the store",
            required: true,
            schema: {
              $ref: "#/definitions/Post",
            },
          },
        ],
      },
    },
    "/post/search": {},
    "/post/{postId}": {},
    "/post/{postId}": {},
  },
  definitions: {
    Post: {
      required: ["title", "user", "content"],
      properties: {
        title: {
          type: "string",
        },
        user: {
          type: "string",
        },
        content: {
          type: "string",
        },
      },
    }
  },
};

export default swaggerDocument;
