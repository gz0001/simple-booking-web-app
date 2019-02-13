import * as React from 'react'
import cx from 'classnames'
import { Box, Container, Row, Col, Headline } from 'tt-react-ui-2'

// Type:
import { EventPreview } from 'types/gql-type'

// Components:
import { Spinner } from 'atoms/Spinner'

// Styles:
import './style.css'

// Images:
import sl1 from 'assets/images/sl1.jpg'
import sl2 from 'assets/images/sl2.jpg'
import sl3 from 'assets/images/sl3.jpg'
import sl4 from 'assets/images/sl4.jpg'

// ================================================================================================

export interface PreviewSectionProps {
  className?: string
  eventPreviews: EventPreview[]
  loading: boolean
  section: string
}

export const PreviewSection: React.FunctionComponent<PreviewSectionProps> = ({
  className,
  eventPreviews,
  loading,
  section
}) => {
  // bg images:
  const bgImg = [sl1, sl2, sl3, sl4]

  return (
    <Box className={cx(className && className, 'Preview')} display="block" pt="4" px="6">
      <Headline className="Preview--title" font="bold" text="sm" mb="4" pl="4">
        {section}
      </Headline>
      {loading ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row>
            {eventPreviews.map((event, index) => {
              return (
                <Col width="12, md:6, lg:3" key={event._id} mt="2">
                  <Box className="Preview--item" image={bgImg[index % 4]} h="full">
                    {event.title}
                  </Box>
                </Col>
              )
            })}
          </Row>
        </Container>
      )}
    </Box>
  )
}
