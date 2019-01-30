import * as React from 'react'
import cx from 'classnames'
import { Text, TextProps } from 'tt-react-ui-2'

// ================================================================================================

export interface IconProps extends TextProps {
  name: string

}


export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const {name, ...rest} = props
  return (
    <Text {...rest} className={cx(`Icon icon-${name}`)}/>
  )
}

Icon.defaultProps = {
  color: "white"
}

