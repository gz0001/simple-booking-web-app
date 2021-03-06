import * as React from 'react'
import cx from 'classnames'
import { Text, TextProps } from 'tt-react-ui-2'

// ================================================================================================

export interface IconProps extends TextProps {
  name: string
  transition?: boolean
}

export const Icon: React.FunctionComponent<IconProps> = props => {
  const { className, name,transition, ...rest } = props
  return <Text {...rest} className={cx(className && className, `Icon icon-${name}`, transition && 'transition')} />
}

Icon.defaultProps = {
  color: 'white',
  transition: true

}
