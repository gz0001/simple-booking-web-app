import * as React from 'react'
import cx from 'classnames'
import posed from 'react-pose'
import { getClassNames, BoxProps } from 'tt-react-ui-2'

// ================================================================================================

export interface AnimatedBoxProps extends BoxProps {
  ref?: React.Ref<HTMLDivElement>
}

export const AnimatedBox: React.FunctionComponent<AnimatedBoxProps> = React.forwardRef( (props, ref) => {
  const {children,className, ...rest} = props
  return (
    <div className={cx(className && className, 'AnimatedBox', getClassNames(rest))} ref={ref}>
      {children}
    </div>
  )
})

AnimatedBox.defaultProps = {
  display: 'flex',
  position: 'relative',
  w: 'full'
}
