import React from 'react'
import { Button as Btn, ButtonProps } from 'tt-react-ui-2'

// ================================================================================================

export const Button: React.FunctionComponent<ButtonProps> = props => {
  return <Btn {...props} />
}

Button.defaultProps = {
  h: '12',
  p: '2',
  ripple: true,
  rounded: 'sm'
}
