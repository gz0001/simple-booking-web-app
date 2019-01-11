import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import "./index.scss";
import App from "./App";

// Client:
const client = new ApolloClient({
  uri: "http://localhost:1234/graphql"
});

/* client
  .query({
    query: gql`
      {
        bookings {
          event {
            title
          }
        }
      }
    `
  })
  .then(res => console.log("got result: ", res))
  .catch(err => console.log("got err: ", err)); */

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
