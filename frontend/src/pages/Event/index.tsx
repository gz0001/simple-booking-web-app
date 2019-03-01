import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'

// Components:
import { HeadBar } from 'components/HeadBar'
import { HeadSlider } from 'components/HeadSlider'
import { PreviewSection } from 'components/PreviewSection'
import { Footer } from 'components/Footer'
import { Spinner } from 'atoms/Spinner'

// Styles:
import "./style.css";

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
    <Query query={previewQuery} variables={{ option: setEventOption(null, null) }}>
      {({ data, loading, error, client }) => {
        console.log('data at event: ', data)

        const { popularEvents, events } = data

        if (error) return 'Error :('

        return (
          <Box className="Event page" flex="col" min-h="screen">
            <HeadBar onSlide={handleSlide} />
            <HeadSlider ref={slider} eventPreviews={popularEvents} loading={loading} />
            <Box className="Event-preview" display="block">
               {loading ? (
              <Spinner />
            ) : (
              <>
                <PreviewSection
                  className="PopularSection"
                  eventPreviews={popularEvents}
                  section="Popular"
                />
                <PreviewSection
                  className="EventSection"
                  eventPreviews={events}
                  section="Recently Added"
                />
              </>
            )}
            </Box>
           
            <Footer />
          </Box>
        )
      }}
    </Query>
  )
}

export default Event
