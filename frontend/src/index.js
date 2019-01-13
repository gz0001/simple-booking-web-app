import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

import "./index.scss";
import App from "./App";

// Auth:
const httpLink = createHttpLink({
  uri: "http://localhost:1234/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });

  return forward(operation);
});

// Client:
const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache()
});
client.initQueryManager();

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
