import * as React from 'react'
import cx from 'classnames'
import Slider from 'react-slick'
import { format } from 'date-fns'

// Components:
import { Box, Text, Headline } from 'tt-react-ui-2'

// Styles:
import './style.css'

// Images:
import sl1 from 'assets/images/sl1.jpg'
import sl2 from 'assets/images/sl2.jpg'
import sl3 from 'assets/images/sl3.jpg'
import sl4 from 'assets/images/sl4.jpg'

// ================================================================================================

export interface HeadSliderProps {
  ref: React.Ref<any>
}

export const HeadSlider: React.FunctionComponent<HeadSliderProps> = React.forwardRef(
  (props, ref) => {
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

    return (
      <Box bg="grey-darker" className={cx('HeadSlider')} display="block">
        <Slider className="h-full" {...settings} ref={ref}>
          <Box className="HeadSlider-item" bg="cover, center" image={sl1}>
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
                {format(new Date(), 'MMM DD, YYYY')}
              </Text>
              <Headline className="HeadSlider__title transition"cursor="hover:pointer" font="bold" text="2xl, hover:first">
                Lorem ipsum dolor sit amet
              </Headline>
              <Text className="HeadSlider__subtitle" paragraph w="1/2" mt="4">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </Text>
            </Box>
          </Box>
          <Box className="HeadSlider-item" bg="cover, center" image={sl2}>
            <h3>2</h3>
          </Box>
          <Box className="HeadSlider-item" bg="cover, center" image={sl3}>
            <h3>3</h3>
          </Box>
          <Box className="HeadSlider-item" bg="cover, center" image={sl4}>
            <h3>4</h3>
          </Box>
        </Slider>
      </Box>
    )
  }
)
