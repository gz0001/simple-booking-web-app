import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Box } from 'tt-react-ui-2'

// Components:
import { HeadBar } from 'components/HeadBar'

// Styles:
//import "./style.css";

// Query AuthStatus:
const authStatus = gql`
  query getAuth {
    auth @client {
      userId
      token
      isAuth
    }
  }
`

class Event extends Component {
  state = {
    error: false
  }

  render() {
    const { error } = this.state
    return (
      <Query query={authStatus}>
        {({ data }) => {
          console.log(data)
          return (
            <Box className="Event" bg="grey">
              <HeadBar />
            </Box>
          )
        }}
      </Query>
    )
  }
}

export default Event
