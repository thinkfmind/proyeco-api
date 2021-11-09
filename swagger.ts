export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "WALOW API Rest",
      description: "Loremp ipsum",
      license: {
        name: "MIT",
        url: "https://walow-api.heroku.app.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./src/user/user.controller.ts", "./src/routes/*"],
};
