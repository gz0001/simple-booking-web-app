import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'

// Styles:
//import "./style.css";

const bookings = gql`
  query Bookings {
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
`

const user = gql`
  query Users {
    users {
      email
      password
    }
  }
`

const query = gql`
  query getAuth {
    auth @client {
      userId
      token
      isAuth
    }
  }
`

const userQL = gql`
  query User {
    user(name: "sacsac") {
      _id
    }
  }
`

class Booking extends Component {
  render() {
    return (
      <Query query={user} notifyOnNetworkStatusChange>
        {({ loading, error, data, refetch, networkStatus, client }) => {
          //console.log("booking: ", client.readQuery({ query }));
          if (networkStatus === 4) return 'Refetching!'
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          console.log('got data: ', data)
          return (
            <Box className="Booking">
              got data <Link to="/event">go to event</Link>
            </Box>
          )
        }}
      </Query>
    )
  }
}

export default Booking
