import * as React from 'react'
import cx from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { TextProps, Text } from 'tt-react-ui-2'

// ================================================================================================

export interface LinkProps extends TextProps {
  title?: string
  className?: string
  external?: boolean
  href: string
  transition?: boolean
  linkProps?: React.HTMLProps<HTMLAnchorElement>
}

export const Link: React.FunctionComponent<LinkProps> = ({
  children,
  className,
  external,
  href,
  linkProps,
  title,
  transition,
  ...rest
}) => {
  const Tag = external ? 'a' : RouterLink
  const link = external ? { href } : { to: href }
  return (
    // @ts-ignore
    <Tag className={cx(className && className, 'Link')} title={title} {...link} {...linkProps}>
      <Text {...rest} className={cx('Link-text', transition && 'transition')}>
        {children}
      </Text>
    </Tag>
  )
}

Link.defaultProps = {
  color: 'first',
  external: false,
  hover: 'second',
  transition: true
}
