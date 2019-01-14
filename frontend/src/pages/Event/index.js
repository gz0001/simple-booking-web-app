import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
// Styles:
import "./styles.scss";

// Query AuthStatus:
const authStatus = gql`
  query getAuth {
    auth @client {
      userId
      token
      isAuth
    }
  }
`;

class Event extends Component {
  state = {
    error: false
  };

  render() {
    const { error } = this.state;
    return (
      <Query query={authStatus}>
        {({ data }) => {
          console.log(data);
          return (
            <div>
              Event <Link to="/start">go to login</Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Event;
