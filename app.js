const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const { format } = require("date-fns");

// Schema:
const schema = require("grql/schema");

// Resolvers:
const rootResolvers = require("grql/resolvers");

// Middlewares:
const isAuth = require("middleware/is-auth");

// Main:
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);

app.get("/", (req, res, next) => {
  res.send(
    `Hello from express and docker: ${format(new Date(), "dd.MM.YYYY")}`
  );
});

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue: rootResolvers,
    graphiql: true,
    formatError: error => {
      console.log("app err: ", error);
      return {
        ...error,
        code: -1
      };
    }
  })
);

// Connect and start server:
(async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/grql", {
      useNewUrlParser: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30
    });
    console.log("Database connected");
    app.listen(1234, () => {
      console.log("Server started at port 1234");
    });
  } catch (error) {
    console.log(error);
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  }
})();
