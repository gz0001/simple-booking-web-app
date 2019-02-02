import * as React from 'react'
import cx from 'classnames'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import posed, { PoseGroup } from 'react-pose'
import { tween } from 'popmotion'
import { Box, Headline, Text, createState } from 'tt-react-ui-2'

// Components:
import { Textfield } from 'atoms/Textfield'
import { Button } from 'atoms/Button'
import { AnimatedBox } from 'atoms/AnimatedBox'

// Styles:
import './style.css'

// Mutations:
const loginQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`
// Animations:
const FadeContainer = posed.form({
  preEnter: {
    opacity: 0
  },
  enter: {
    staggerChildren: 50,
    beforeChildren: true,
    opacity: 1,
    y: '0',
    delay: 100,
    duration: 100
  }
})

const FadeInBox = posed(AnimatedBox)({
  preEnter: {
    opacity: 0,
    x: '-20%'
  },
  enter: {
    delay: 300,
    opacity: 1,
    x: 0,
    duration: 200,
    transition: props => {
      return tween(props)
    }
  }
})

// ================================================================================================

export interface LoginProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  isLogin: boolean
}

export const Login: React.FunctionComponent<LoginProps> = ({ setLogin, isLogin }) => {
  // Hooks:
  const form = React.useRef(null)
  const [state, setState] = createState({ email: '', password: '' })
  const { email, password } = state

  // Handlers:
  const handleLogin = async (mutate, client, e) => {
    if (form.current.checkValidity()) {
      e.preventDefault()
      try {
        const result = await mutate()
        console.log('got res: ', result)
        const { token, userId } = result.data.login
        client.writeData({
          data: {
            auth: { userId, token, isAuth: true, __typename: 'AuthStatus' }
          }
        })
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
      } catch (error) {
        console.log('got err: ', error)
      }
    }
  }

  return (
    <Mutation mutation={loginQL} variables={{ email, password }} fetchPolicy="no-cache">
      {(mutate, { loading, error, client }) => (
        <PoseGroup preEnterPose="preEnter" animateOnMount={true}>
          {isLogin && (
            <FadeContainer
              className={cx('Login flex flex-col px-6')}
              onSubmit={e => handleLogin(mutate, client, e)}
              ref={form}
              key="login"
              withParent={false}
            >
              <FadeInBox flex="col">
                <Headline level="2">Sign In</Headline>
                <Text size="xs" mt="2">
                  Enter your email and password to proceed.
                </Text>
              </FadeInBox>
              <FadeInBox mt="6">
                <Textfield
                  className={cx('Login-username flex-1')}
                  inputProps={{ required: true }}
                  label="Email"
                  onInput={(email: string) => setState({ email })}
                  value={email}
                />
              </FadeInBox>
              <FadeInBox mt="2">
                <Textfield
                  className={cx('Login-username flex-1')}
                  inputProps={{ required: true }}
                  label="Password"
                  onInput={(password: string) => setState({ password })}
                  type="password"
                  value={password}
                />
              </FadeInBox>
              <FadeInBox mt="6">
                <Button className={cx('Login-submit')} flex="1" type="submit" loading={loading}>
                  Sign in
                </Button>
              </FadeInBox>
              <FadeInBox mt="2">
                <Text display="block" center size="xs" flex="1">
                  Dont have an account?
                  <Text
                    color="first"
                    cursor="hover:pointer"
                    underline="hover"
                    p="2"
                    textProps={{ onClick: () => setLogin(false) }}
                  >
                    Create Account
                  </Text>
                </Text>
              </FadeInBox>

              {error && (
                <Text display="block" color="error" center mt="2" size="xs">
                  Failed to login. Please try again !
                </Text>
              )}
            </FadeContainer>
          )}
        </PoseGroup>
      )}
    </Mutation>
  )
}
