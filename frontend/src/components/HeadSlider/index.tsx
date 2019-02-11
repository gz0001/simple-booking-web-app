import * as React from 'react'
import cx from 'classnames'
import Slider from 'react-slick'
import { format } from 'date-fns'

// Components:
import { Box, Text, Headline } from 'tt-react-ui-2'

// Styles:
import './style.css'

// Types:
import { EventPreview } from 'types/gql-type'

// Images:
import sl1 from 'assets/images/sl1.jpg'
import sl2 from 'assets/images/sl2.jpg'
import sl3 from 'assets/images/sl3.jpg'
import sl4 from 'assets/images/sl4.jpg'

// ================================================================================================

export interface HeadSliderProps {
  ref: React.Ref<any>
  eventPreviews: EventPreview[]
}

export const HeadSlider: React.FunctionComponent<HeadSliderProps> = React.forwardRef(
  ({ eventPreviews }, ref) => {
    // slider setting:
    const settings = {
      dots: false,
      draggable: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true
    }

    // bg images:
    const bgImg = [sl1, sl2, sl3, sl4]

    console.log('preview: ', eventPreviews)

    return (
      <Box bg="grey-darker" className={cx('HeadSlider')} display="block">
        <Slider className="h-full" {...settings} ref={ref}>
          {eventPreviews.map((event: EventPreview, index: number) => {
            return (
              <Box className="HeadSlider-item" bg="cover, center" image={bgImg[index % 4]} key={event._id}>
                <Box
                  className="HeadSlider__content"
                  h="full"
                  px="6"
                  pb="4"
                  justify="end"
                  flex="col"
                  position="absolute"
                  z="10"
                >
                  <Text className="HeadSlider__date" size="sm">
                    {format(new Date(event.date), 'MMM DD, YYYY')}
                  </Text>
                  <Headline
                    className="HeadSlider__title transition"
                    cursor="hover:pointer"
                    font="bold"
                    text="2xl, hover:first"
                  >
                    {event.title}
                  </Headline>
                  <Text className="HeadSlider__subtitle" paragraph w="1/2" mt="4">
                    {event.description}
                  </Text>
                </Box>
              </Box>
            )
          })}
        </Slider>
      </Box>
    )
  }
)
