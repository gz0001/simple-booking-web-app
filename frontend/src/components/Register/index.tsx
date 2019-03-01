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

// Styles:
import './style.css'

// Mutations:
import  {setAuthMutation } from 'resolvers/authResolver'
const registerQL = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $age: Int!
    $city: String!
  ) {
    createUser(
      userInput: {
        email: $email
        password: $password
        firstname: $firstname
        lastname: $lastname
        age: $age
        city: $city
      }
    ) {
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
    staggerChildren: 200,
    beforeChildren: true,
    opacity: 1,
    y: '0',
    delay: 100,
    duration: 100
  }
})

const FadeInBox = posed(Box)({
  preEnter: {
    opacity: 0,
    x: '20%'
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

export interface RegisterProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  isLogin: boolean
}

export const Register: React.FunctionComponent<RegisterProps> = ({ setLogin, isLogin }) => {
  // Hooks:
  const form = React.useRef(null)

  const [state, setState] = createState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    age: '',
    city: '',
    valid: {
      value: true,
      message: ''
    }
  })

  const { firstname, lastname, email, password, passwordRepeat, age, city, valid } = state

  // Handlers:

  const validateForm = e => {
    const passwordRegex = new RegExp(
      '(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*'
    )
    let message = ''
    let value = true
    switch (true) {
      case !form.current.checkValidity():
        message = 'Please check your input again!'
        value = false
        break
      case password !== passwordRepeat:
        message = 'Please repeat your password correct !'
        value = false
        e.preventDefault()
        break
      case !password.match(passwordRegex):
        message =
          'Your password must contain 8 or more characters with a mix of normal letters, capital letters, numbers and symbols !'
        value = false
        e.preventDefault()
        break
      default:
        break
    }

    return { value, message }
  }

  const handleRegister = async (mutate, client, e) => {
    const valid = validateForm(e)
    setState({ valid })

    if (valid.value === true) {
      e.preventDefault()
      try {
        const result = await mutate()
        const { token, userId } = result.data.createUser
        client.mutate({
          mutation: setAuthMutation,
          variables: { userId, token, isAuth: true }
        })
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
      } catch (error) {
        console.log('got err: ', error)
      }
    }
  }

  return (
    <Mutation
      mutation={registerQL}
      variables={{ firstname, lastname, email, password, age: parseInt(age), city }}
      fetchPolicy="no-cache"
    >
      {(mutate, { loading, error, client }) => {
        return (
          <PoseGroup preEnterPose="preEnter">
            {!isLogin && (
              <FadeContainer
                className={cx('Register flex flex-col px-6')}
                ref={form}
                key="register"
                onSubmit={e => handleRegister(mutate, client, e)}
                withParent={false}
              >
                <FadeInBox flex="col">
                  <Headline level="2">Sign up</Headline>
                  <Text size="xs" mt="2">
                    Join the greate community.
                  </Text>
                </FadeInBox>
                <FadeInBox mt="6">
                  <Textfield
                    className={cx('Register-firstname mr-4 w-1/2')}
                    label="First name"
                    inputProps={{ required: true }}
                    value={firstname}
                    onInput={(firstname: string) => setState({ firstname })}
                  />
                  <Textfield
                    className={cx('Register-lastname w-1/2')}
                    label="Last name"
                    inputProps={{ required: true }}
                    value={lastname}
                    onInput={(lastname: string) => setState({ lastname })}
                  />
                </FadeInBox>

                <FadeInBox mt="2">
                  <Textfield
                    className={cx('Register-username flex-1')}
                    inputProps={{ required: true }}
                    label="Email"
                    type="email"
                    value={email}
                    onInput={(email: string) => setState({ email })}
                  />
                </FadeInBox>
                <FadeInBox mt="2">
                  <Textfield
                    className={cx('Register-password flex-1')}
                    label="Password"
                    inputProps={{ required: true }}
                    type="password"
                    value={password}
                    onInput={(password: string) => setState({ password })}
                  />
                </FadeInBox>
                <FadeInBox mt="2">
                  <Textfield
                    className={cx('Register-password flex-1')}
                    label="Repeat password"
                    inputProps={{ required: true }}
                    type="password"
                    value={passwordRepeat}
                    onInput={(passwordRepeat: string) => setState({ passwordRepeat })}
                  />
                </FadeInBox>
                <FadeInBox mt="2">
                  <Textfield
                    className={cx('Register-age mr-4 w-1/2')}
                    label="Age"
                    inputProps={{ required: true }}
                    type="number"
                    value={age}
                    onInput={(age: string) => setState({ age })}
                  />
                  <Textfield
                    className={cx('Register-lastname w-1/2')}
                    inputProps={{ required: true }}
                    label="City"
                    value={city}
                    onInput={(city: string) => setState({ city })}
                  />
                </FadeInBox>
                <FadeInBox mt="6">
                  <Button className={cx('Login-submit')} flex="1" type="submit" loading={loading}>
                    Sign up
                  </Button>
                </FadeInBox>
                <FadeInBox mt="2">
                  <Text display="block" center size="xs" flex="1">
                    Already have an account?
                    <Text
                      color="first"
                      cursor="hover:pointer"
                      underline="hover"
                      p="2"
                      textProps={{ onClick: () => setLogin(true) }}
                    >
                      Sign in
                    </Text>
                  </Text>
                </FadeInBox>

                {error && (
                  <Text display="block" color="error" center mt="2" size="xs">
                    Failed to register. Please try again !
                  </Text>
                )}

                {!valid.value && (
                  <Text display="block" color="error" center mt="2" size="xs">
                    {valid.message}
                  </Text>
                )}
              </FadeContainer>
            )}
          </PoseGroup>
        )
      }}
    </Mutation>
  )
}
