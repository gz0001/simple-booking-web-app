import * as React from 'react'
import cx from 'classnames'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import posed, { PoseGroup } from 'react-pose'
import { Box, Headline, Text, createState } from 'tt-react-ui-2'

// Components:
import { Textfield } from 'atoms/Textfield'
import { Button } from 'atoms/Button'
import { AnimatedBox } from 'atoms/AnimatedBox'

// Styles:
import './style.css'

// Mutations:
const registerQL = gql`
  mutation Register($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`
// Animations:
const FadeInBox = posed(AnimatedBox)({
  preEnter: {
    opacity: 0,
    x: '-20%'
  },
  enter: {
    delay: 300,
    opacity: 1,
    x: 0,
    duration: 200
  },
  exit: {
    opacity: 0,
    x: '-20%',
    duration: 300
  }
})

// ================================================================================================

export interface RegisterProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const Register: React.FunctionComponent<RegisterProps> = ({ setLogin }) => {
  const [state, setState] = createState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    age: '',
    city: ''
  })

  const { firstname, lastname, email, password, passwordRepeat, age, city } = state

  return (
    <Box className={cx('Register')} flex="col" px="6">
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
          value={firstname}
          onInput={(firstname: string) => setState({ firstname })}
        />
        <Textfield
          className={cx('Register-lastname w-1/2')}
          label="Last name"
          value={lastname}
          onInput={(lastname: string) => setState({ lastname })}
        />
      </FadeInBox>

      <FadeInBox mt="2">
        <Textfield
          className={cx('Register-username flex-1')}
          label="Email"
          value={email}
          onInput={(email: string) => setState({ email })}
        />
      </FadeInBox>
      <FadeInBox mt="2">
        <Textfield
          className={cx('Register-password flex-1')}
          label="Password"
          type="password"
          value={password}
          onInput={(password: string) => setState({ password })}
        />
      </FadeInBox>
      <FadeInBox mt="2">
        <Textfield
          className={cx('Register-password flex-1')}
          label="Repeat password"
          type="password"
          value={passwordRepeat}
          onInput={(passwordRepeat: string) => setState({ passwordRepeat })}
        />
      </FadeInBox>
      <FadeInBox mt="2">
        <Textfield
          className={cx('Register-age mr-4 w-1/2')}
          label="Age"
          value={age}
          onInput={(age: string) => setState({ age })}
        />
        <Textfield
          className={cx('Register-lastname w-1/2')}
          label="City"
          value={city}
          onInput={(city: string) => setState({ city })}
        />
      </FadeInBox>
      <FadeInBox mt="6">
        <Button
          className={cx('Login-submit')}
          flex="1"
          onClick={() => console.log('regis', state)}
          loading={false}
        >
          Sign up
        </Button>
      </FadeInBox>
      <FadeInBox mt="2">
        <Text display="block" center size="xs" flex="1">
          Already have an account?
          <Button inline h="auto" w="auto" ripple={false} onClick={() => setLogin(true)}>
            Sign in
          </Button>
        </Text>
      </FadeInBox>
    </Box>
  )
}
