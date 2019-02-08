import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'

// Components:
import { HeadBar } from 'components/HeadBar'
import { HeadSlider } from 'components/HeadSlider'

// Styles:
//import "./style.css";

// Query:
const authStatus = gql`
  query getEvents {
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

  // Handlers:
  const handleSlide = (next: boolean) => {
    if (slider.current) {
      next ? slider.current.slickNext() : slider.current.slickPrev()
    }
  }

  return (
    <Query query={authStatus}>
      {({ data, client }) => {
        return (
          <Box className="Event page" display="block">
            <HeadBar onSlide={handleSlide} />
            <HeadSlider ref={slider} />
          </Box>
        )
      }}
    </Query>
  )
}

export default Event
