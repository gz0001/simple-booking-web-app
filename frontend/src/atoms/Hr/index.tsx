import * as React from 'react'
import cx from 'classnames'
import { Box, BoxProps } from 'tt-react-ui-2'

// ================================================================================================

export const Hr: React.FunctionComponent<BoxProps> = props => {
  const { className, h, bg, ...rest } = props
  return <Box {...rest} className={cx(className && className, 'Hr')} h={h} bg={bg} />
}

Hr.defaultProps = {
  h: 'px',
  bg: 'grey-darker'
}
