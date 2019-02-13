import * as React from 'react'
import cx from 'classnames'
import { Box, BoxProps } from 'tt-react-ui-2'

// Styles:
import './style.css'

// ================================================================================================

export interface SpinnerProps extends BoxProps {
  className?: string
  size?: string
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({ className,size, ...rest }) => {
  return <Box {...rest} className={cx(className && className, 'Spinner t-1/2 l-1/2')} h={size} w={size}/>
}

Spinner.defaultProps = {
  bg:"transparent",
  border: 'first, 2',
  display: 'absolute',
  rounded: '1/2',
  size: "8"
}
