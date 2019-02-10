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
import { previewQuery, setEventOption } from 'gql/eventQL'

const authStatus = gql`
  query GetEvents {
    popularEvents {
      _id
      title
    }
  }
`

const Event: React.FunctionComponent<any> = () => {
  // Filter:

  // Hooks:
  const slider = React.useRef(null)

  // Handlers:
  const handleSlide = (next: boolean) => {
    if (slider.current) {
      next ? slider.current.slickNext() : slider.current.slickPrev()
    }
  }

  return (
    <Query query={previewQuery} variables={{ option: setEventOption(null, null, 5) }}>
      {({ data, loading, error, client }) => {
        !loading && console.log('got preview: ', data)

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
