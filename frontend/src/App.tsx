import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'
import posed, { PoseGroup } from 'react-pose'

// Pages:
import Login from './pages/Login'
import Booking from './pages/Booking'
import Event from './pages/Event'
import StyleGuide from 'pages/StyleGuide'

// Private Route:
const PrivateRoute = (props: any) => {
  const { auth, ...restProps } = props
  return auth ? <Route {...restProps} /> : <Redirect to={`/start`} />
}

// Verify token:
const verifyToken = gql`
  mutation {
    verifyToken {
      userId
      token
      tokenExpiration
    }
  }
`

export default class App extends Component<any, any> {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { client } = this.props
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (token) {
      try {
        const result = await client.mutate({ mutation: verifyToken })
        console.log('token verified: ', result)
        const newToken = result.data.verifyToken.token

        localStorage.setItem('token', newToken)
        client.writeData({
          data: {
            auth: {
              userId,
              token: newToken,
              isAuth: true,
              __typename: 'AuthStatus'
            }
          }
        })
      } catch (error) {
        client.writeData({
          data: {
            auth: { userId, token, isAuth: false, __typename: 'AuthStatus' }
          }
        })
      }
    }
    setTimeout(() => {
      
      this.setState({ loading: false })
    }, 1000);
  }

  render() {
    const {
      client,
      data: {
        auth: { isAuth }
      }
    } = this.props

    const { loading } = this.state
    console.log('got auth: ', this.props)

    return (
      <Box className="App page">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Switch>
            <Redirect from="/" to="/start" exact />
            <Route auth={isAuth} path="/start" render={() => (isAuth ? <Event /> : <Login />)} />
            <Route path="/style" render={() => <StyleGuide client={client} />} />
            <PrivateRoute auth={isAuth} path="/booking" component={Booking} />
            <Route render={() => <h1 className="text-center">404. Page not founded</h1>} />
          </Switch>
        )}
        
      </Box>
    )
  }
}
