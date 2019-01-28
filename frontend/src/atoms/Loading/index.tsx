import * as React from 'react'
import cx from 'classnames'

// Styles:
import './style.css'

// ================================================================================================

export interface LoadingProps {}

export const Loading: React.FunctionComponent<LoadingProps> = ({}) => {
  return (
    <svg className="Loading" width="68px" height="68px">
      <circle
        className="Loading-circel"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        cx="34"
        cy="34"
        r="30"
      />
    </svg>
  )
}
