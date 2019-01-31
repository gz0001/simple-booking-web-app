import * as React from 'react'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'

// Components:
import { Icon } from 'atoms/Icon'

// ================================================================================================

export interface NavItemProps {
  to?: string
  icon: string
  label: string
}

export const NavItem: React.FunctionComponent<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink className="NavItem w-full py-2 my-1" activeClassName="active" to={`/${to}`}>
      <Icon className="NavItem-icon transition" display="block" center name={icon} size="lg" />
    </NavLink>
  )
}
