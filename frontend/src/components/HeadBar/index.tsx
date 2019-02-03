import * as React from 'react'
import cx from 'classnames'
import { Box } from 'tt-react-ui-2'

// Components:
import { Icon } from 'atoms/Icon'

// Styles: 
import './style.css'

// ================================================================================================

export interface HeadBarProps {

}


export const HeadBar: React.FunctionComponent<HeadBarProps> = ({}) => {

  return (
    <Box className={cx('HeadBar')} position="absolute" h="16" px="6" items="center">
      <Icon className={cx('HeadBar-arrow')} name="chevron-left" pr="4"></Icon>
      <Icon className={cx('HeadBar-arrow')} name="chevron-right" pr="4"></Icon>

    </Box>
  )
}

