import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'

// Components:
import { HeadBar } from 'components/HeadBar'
import { HeadSlider } from 'components/HeadSlider'
import { PreviewSection } from 'components/PreviewSection'
import { Footer } from 'components/Footer'

// Styles:
//import "./style.css";

// Query:
import { previewQuery, setEventOption } from 'gql/eventQL'

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
    <Query query={previewQuery} variables={{option: setEventOption(null, null)}}>
      {({ data, loading, error, client }) => {
        const { popularEvents, events } = data

        if (error) return 'Error :('

        return (
          <Box className="Event page" display="block">
            <HeadBar onSlide={handleSlide} />
            <HeadSlider ref={slider} eventPreviews={popularEvents} loading={loading} />
            <PreviewSection
              className="PopularSection"
              eventPreviews={popularEvents}
              loading={loading}
              section="Popular"
            />
            <PreviewSection
              className="EventSection"
              eventPreviews={events}
              loading={loading}
              section="Recently Added"
            />
            <Footer />
          </Box>
        )
      }}
    </Query>
  )
}

export default Event
