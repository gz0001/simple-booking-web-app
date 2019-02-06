import * as React from 'react'
import cx from 'classnames'
import Slider from 'react-slick'
import { Box } from 'tt-react-ui-2'

// Components:

// Styles:
import './style.css'

// ================================================================================================

export interface HeadSliderProps {
  ref: React.Ref<any>
}

export const HeadSlider: React.FunctionComponent<HeadSliderProps> = React.forwardRef((props, ref) => {
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
      <Slider className="bg-error h-full" {...settings} ref={ref}>
        <Box className="HeadSlider-item">
          <h3>1</h3>
        </Box>
        <Box className="HeadSlider-item">
          <h3>2</h3>
        </Box>
        <Box className="HeadSlider-item">
          <h3>3</h3>
        </Box>
        <Box className="HeadSlider-item">
          <h3>4</h3>
        </Box>
      </Slider>
    </Box>
  )
})
