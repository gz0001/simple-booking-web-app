import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

// Styles:
import "./styles.scss";

const bookings = gql`
  {
    bookings {
      event {
        title
        description
      }
      user {
        email
      }
    }
  }
`;

const user = gql`
  {
    users {
      email
      password
    }
  }
`;

const query = gql`
  query getAuth {
    auth @client {
      userId
      token
      isAuth
    }
  }
`;

class Booking extends Component {
  render() {
    return (
      <Query query={user} notifyOnNetworkStatusChange>
        {({ loading, error, data, refetch, networkStatus, client }) => {
          //console.log("booking: ", client.readQuery({ query }));
          if (networkStatus === 4) return "Refetching!";
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log("got data: ", data);
          return (
            <div>
              got data <Link to="/event">go to event</Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Booking;