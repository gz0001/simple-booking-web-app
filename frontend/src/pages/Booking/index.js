import React, { Component } from "react";
import { Query } from "react-apollo";
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

class Booking extends Component {
  componentDidMount() {
    console.log(user);
  }
  render() {
    return (
      <Query query={bookings} notifyOnNetworkStatusChange>
        {({ loading, error, data, refetch, networkStatus }) => {
          if (networkStatus === 4) return "Refetching!";
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log("got data: ", data);
          return data.bookings.map(({ event, user }) => (
            <div key={user.email}>
              <span>{user.email}</span>
              <br />
              <span>Event: {event.title}</span>
              <br />
              <span>Desciption: {event.description}</span>
              <button onClick={() => refetch()}>Refetch!</button>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Booking;
