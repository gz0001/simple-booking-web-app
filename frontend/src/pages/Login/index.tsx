// @ts-nocheck
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Textfield, Button, Box, Headline } from 'tt-react-ui-2'
import { any } from 'prop-types'
// Styles:
//import "./style.scss";

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

const createQL = gql`
  mutation Register($email: String!, $password: String!, $name: String!, $age: Int!) {
    createUser(userInput: { email: $email, password: $password, name: $name, age: $age }) {
      userId
      token
      tokenExpiration
    }
  }
`
type SubmitFnc = {
  (a: any, b: any): (e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void
}

class Login extends Component<any, any> {
  state: any = {
    email: '',
    password: '',
    name: '',
    age: null,
    isLogin: true,
    error: false
  }

  inputHandler = {}

  handleInput = (key: any) => {
    if (!this.inputHandler[key]) {
      this.inputHandler[key] = (text: string) => {
        this.setState({
          [key]: key === 'age' ? parseInt(text) : text
        })
      }
    }
    return this.inputHandler[key]
  }

  handleSubmit = (mutate: any, client: any) => async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const { isLogin } = this.state
    const field = isLogin ? 'login' : 'createUser'
    try {
      const result = await mutate()
      console.log('got res: ', result)
      const { token, userId } = result.data[field]
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

  toogleMode = () => {
    this.setState(({ isLogin }: any) => ({
      email: '',
      password: '',
      name: '',
      age: '',
      isLogin: !isLogin
    }))
  }

  render() {
    const { email, password, name, age, isLogin } = this.state
    const variables = isLogin ? { email, password } : { email, password, name, age }
    return (
      <Mutation mutation={isLogin ? loginQL : createQL} variables={variables}>
        {(mutate, { loading, error, client }) => {
          return (
            <Box className="Login page" justify="center" items="center" flex="col" w="full">
              <Headline center text="first">
                {isLogin ? 'Login here:' : 'Create an account:'}
              </Headline>
              <form onSubmit={this.handleSubmit(mutate, client)}>
                <div className="form-group">
                  <Textfield
                    label="Email"
                    value={email}
                    onInput={this.handleInput('email')}
                    material
                  />
                  <Textfield
                    label="Password:"
                    material
                    value={password}
                    onInput={this.handleInput('password')}
                    type="password"
                  />
                  {!isLogin && (
                    <>
                      <label className="Login-label">Name:</label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={this.handleInput('name')}
                        type="text"
                      />
                      <label className="Login-label">Age:</label>
                      <input
                        className="form-control"
                        value={age}
                        onChange={this.handleInput('age')}
                        type="number"
                      />
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  {/** 
                  // @ts-ignore */}
                  <Button type="first" onClick={this.handleSubmit}>
                    {isLogin ? 'Login' : 'Register'}
                  </Button>
                  <Button inline onClick={this.toogleMode}>
                    {isLogin ? 'Dont have an account?' : 'Back to login'}
                  </Button>
                </div>

                {loading && <p className="text-info text-center">loading...</p>}
                {error && <p className="text-danger text-center">Please try again!</p>}
              </form>
            </Box>
          )
        }}
      </Mutation>
    )
  }
}

export default Login
