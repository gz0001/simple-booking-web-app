const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

// Schema:
const schema = require("grql/schema");

// Resolvers:
const rootResolvers = require("grql/resolvers");

// Main:
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello from express");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue: rootResolvers,
    graphiql: true
  })
);

// Connect and start server:
(async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/grql",
      {
        useNewUrlParser: true
      }
    );
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
