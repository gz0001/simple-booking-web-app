import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

// Styles:
import "./styles.scss";

// Mutations:
const loginQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const createQL = gql`
  mutation Register(
    $email: String!
    $password: String!
    $name: String!
    $age: Int!
  ) {
    createUser(
      userInput: { email: $email, password: $password, name: $name, age: $age }
    ) {
      userId
      token
      tokenExpiration
    }
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    age: null,
    isLogin: true,
    error: false
  };

  inputHandler = {};

  handleInput = key => {
    if (!this.inputHandler[key]) {
      this.inputHandler[key] = e => {
        this.setState({
          [key]: key === "age" ? parseInt(e.target.value) : e.target.value
        });
      };
    }
    return this.inputHandler[key];
  };

  handleSubmit = (mutate, client) => async e => {
    e.preventDefault();
    const { isLogin } = this.state;
    const field = isLogin ? "login" : "createUser";
    try {
      const result = await mutate();
      console.log("got res: ", result);
      const { token, userId } = result.data[field];
      client.writeData({
        data: {
          auth: { userId, token, isAuth: true, __typename: "AuthStatus" }
        }
      });
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      this.props.history.push("/booking");
    } catch (error) {
      console.log("got err: ", error);
    }
  };

  toogleMode = e => {
    e.preventDefault();
    this.setState(({ isLogin }) => ({
      email: "",
      password: "",
      name: "",
      age: "",
      isLogin: !isLogin
    }));
  };

  render() {
    const { email, password, name, age, isLogin } = this.state;
    const variables = isLogin
      ? { email, password }
      : { email, password, name, age };
    return (
      <Mutation mutation={isLogin ? loginQL : createQL} variables={variables}>
        {(mutate, { loading, error, client }) => {
          return (
            <div className="Login page d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center text-primary">
                {isLogin ? "Login here:" : "Create an account:"}
              </h3>
              <form onSubmit={this.handleSubmit(mutate, client)}>
                <div className="form-group">
                  <label className="Login-label">Email:</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={this.handleInput("email")}
                  />
                  <label className="Login-label">Passwort:</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={this.handleInput("password")}
                    type="password"
                  />
                  {!isLogin && (
                    <>
                      <label className="Login-label">Name:</label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={this.handleInput("name")}
                        type="text"
                      />
                      <label className="Login-label">Age:</label>
                      <input
                        className="form-control"
                        value={age}
                        onChange={this.handleInput("age")}
                        type="number"
                      />
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary d-block mx-auto"
                  >
                    {isLogin ? "Login" : "Register"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={this.toogleMode}
                  >
                    {isLogin ? "Dont have an account?" : "Back to login"}
                  </button>
                </div>

                {loading && <p className="text-info text-center">loading...</p>}
                {error && (
                  <p className="text-danger text-center">Please try again!</p>
                )}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default Login;
