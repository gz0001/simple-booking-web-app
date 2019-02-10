import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Box } from 'tt-react-ui-2'
import posed, { PoseGroup } from 'react-pose'
import { tween } from 'popmotion'

// Components:
import { Loading } from 'atoms/Loading'
import { Nav } from 'components/Nav'

// Pages:
import { Auth } from 'pages/Auth'
import Booking from './pages/Booking'
import Event from './pages/Event'
import StyleGuide from 'pages/StyleGuide'
import { AnimatedBox } from 'atoms/AnimatedBox'

// GQL:
import { setAuthMutation } from 'resolvers/authResolver'

const verifyToken = gql`
  mutation Verify {
    verifyToken {
      userId
      token
      tokenExpiration
    }
  }
`

// Private Route:
const PrivateRoute = (props: any) => {
  const { auth, ...restProps } = props
  return auth ? <Route {...restProps} /> : <Redirect to={`/start`} />
}

// Posed:
const FadeInBox = posed(AnimatedBox)({
  preEnter: { opacity: 0 },
  enter: {
    opacity: 1,
    beforeChildren: true,
    transition: props => {
      return tween(props)
    }
  },
  exit: {
    opacity: 0,
    transition: props => {
      return tween(props)
    }
  }
})

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
        const newToken = result.data.verifyToken.token

        localStorage.setItem('token', newToken)

        client.mutate({
          mutation: setAuthMutation,
          variables: { userId, token, isAuth: true }
        })
      } catch (error) {
        console.log('token expired!')
      }
    }
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
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
      <Box className="App" min-h="screen" overflow="y-auto">
        {loading ? (
          <Box className="App-load" justify="center" items="center" key="load">
            <Loading />
          </Box>
        ) : (
          <PoseGroup preEnterPose="preEnter" animateOnMount>
            <FadeInBox className="App-content" key="app-content">
              {isAuth && <Nav />}
              <Switch>
                <Redirect from="/" to="/start" exact />
                <Route auth={isAuth} path="/start" render={() => (isAuth ? <Event /> : <Auth />)} />
                <Route path="/style" render={() => <StyleGuide client={client} />} />
                <PrivateRoute auth={isAuth} path="/booking" component={Booking} />
                <PrivateRoute
                  auth={isAuth}
                  render={() => <h1 className="text-center">404. Page not founded</h1>}
                />
              </Switch>
            </FadeInBox>
          </PoseGroup>
        )}
      </Box>
    )
  }
}
