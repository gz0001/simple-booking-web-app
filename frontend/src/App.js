import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

// Pages:
import Login from './pages/Login'
import Booking from './pages/Booking'
import Event from './pages/Event'
import StyleGuide from 'pages/StyleGuide'

// Private Route:
const PrivateRoute = props => {
  const { auth, ...restProps } = props
  return auth ? <Route {...restProps} /> : <Redirect to="/start" />
}

// Verify token:
const verifyToken = gql`
  mutation {
    verifyToken {
      isAuth
    }
  }
`

class App extends Component {
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
        const isAuth = result.data.verifyToken.isAuth
        console.log('token verified: ', result)

        client.writeData({
          data: {
            auth: { userId, token, isAuth, __typename: 'AuthStatus' }
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
    this.setState({ loading: false })
  }

  render() {
    const { isAuth, loading } = this.props.data.auth

    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Switch>
            <Redirect from="/" to={'/style'} exact />
            <Route path="/style" component={StyleGuide} />
            <Route path="/start" component={isAuth ? Booking : Login} exact />
            <PrivateRoute auth={isAuth} path="/booking" component={Booking} />
            <PrivateRoute auth={isAuth} path="/event" component={Event} />
            <Route render={() => <h1 className="text-center">404. Page not founded</h1>} />
          </Switch>
        )}
      </>
    )
  }
}

export default App
