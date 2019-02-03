import * as React from 'react'
import { ApolloClient } from 'apollo-boost'
import { ApolloConsumer } from 'react-apollo'
// Comonents:
import { Box } from 'tt-react-ui-2'
import { Hr } from 'atoms/Hr'
import { Icon } from 'atoms/Icon'
import { NavItem } from './NavItem'

// Styles:
import './style.css'

// Images:
import logo from 'assets/images/logo.png'

// ================================================================================================

export interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = ({}) => {
  // Handlers:
  const handleLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    client: ApolloClient<any>
  ) => {
    e.preventDefault()
    console.log('wanto log out: ', client)
    localStorage.clear()
    client.writeData({
      data: {
        auth: {
          userId: null,
          token: null,
          isAuth: false,
          __typename: 'AuthStatus'
        }
      }
    })
  }

  return (
    <ApolloConsumer>
      {client => (
        <Box className="Nav" w="16" h="screen" flex="col" items="center">
          <img className="Nav-logo pt-4" src={logo} />
          <Hr className="Nav-hr" my="4" />
          <NavItem to="start" icon="home" label="Home" />
          <NavItem to="booking" icon="ticket" label="Booking" />
          <NavItem to="user" icon="user-circle" label="User" />

          <Hr className="Nav-hr" mt="auto" />
          <Icon
            className="NavItem-icon hover:cursor-pointer"
            color="first"
            name="sign-out"
            size="lg"
            py="4"
            textProps={{
              onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                handleLogout(e, client)
            }}
          />
        </Box>
      )}
    </ApolloConsumer>
  )
}
