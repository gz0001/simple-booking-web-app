import React, { Component } from "react";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import environment from "../../evironment";

// Styles:
import "./styles.scss";

class Booking extends Component {
  componentDidMount() {
    console.log("token:", localStorage.getItem("USER_TOKEN"));
  }
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query BookingsQuery {
            users {
              email
              password
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            console.log(error);

            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log("got res: ", props);
          return <div>Bookings</div>;
        }}
      />
    );
  }
}

export default Booking;
