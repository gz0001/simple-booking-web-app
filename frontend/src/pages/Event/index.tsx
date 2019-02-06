import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'

// Components:
import { HeadBar } from 'components/HeadBar'
import { HeadSlider } from 'components/HeadSlider'

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

const Event: React.FunctionComponent<any> = () => {
  // Hooks:
  const slider = React.useRef(null)

  console.log('mess: ', slider)

  // Handlers:
  const handleSlide = (next: boolean) => {
    if (slider.current) {
      next ? slider.current.slickNext() : slider.current.slickPrev()
    }
  }

  return (
    <Query query={authStatus}>
      {({ data }) => {
        return (
          <Box className="Event page">
            <HeadBar onSlide={handleSlide} />
            <HeadSlider ref={slider} />
          </Box>
        )
      }}
    </Query>
  )
}

export default Event
