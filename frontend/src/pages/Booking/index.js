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

class Booking extends Component {
  render() {
    return (
      <Query query={bookings}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.bookings.map(({ event, user }) => (
            <div key={user.email}>
              {user.email}
              <p>Event: {event.title}</p>
              <p>Desciption: {event.description}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Booking;
