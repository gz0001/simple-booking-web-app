import React from 'react'
import { Button as Btn, ButtonProps } from 'tt-react-ui-2'

// ================================================================================================

export const Button: React.FunctionComponent<ButtonProps> = props => {
  const { h = '12', p = '2', rounded = 'sm', ...rest } = props
  return <Btn {...rest} rounded={rounded} p={p} h={h} />
}
