import * as React from 'react'
import cx from 'classnames'
import { format } from 'date-fns'
import { Box, Container, Row, Col, Headline, Text } from 'tt-react-ui-2'

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
      <Headline className="Preview__title" font="bold" text="sm" pl="4">
        {section}
      </Headline>
      {loading ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row>
            {eventPreviews.map((event, index) => {
              const { _id, date, dateEnd, location, title } = event

              return (
                <Col width="12, md:6, lg:3" key={_id} mt="4">
                  <Box className="Preview__wrap" image={bgImg[index % 4]}>
                    <Box
                      className={cx('Preview__item')}
                      h="full"
                      flex="col"
                      items="center"
                      justify="center"
                    >
                      <Headline font="bold" capitalize>{title}</Headline>
                      <Text paragraph mt="2" size="sm">
                        {format(date, 'MMM D')}
                        {dateEnd && format(dateEnd, ' - D')}
                      </Text>
                    </Box>
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
