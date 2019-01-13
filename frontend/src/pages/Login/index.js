import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

// Styles:
import "./styles.scss";

// Mutation:
const loginQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
    error: false
  };

  inputHandler = {};

  handleInput = key => {
    if (!this.inputHandler[key]) {
      this.inputHandler[key] = e => {
        this.setState({ [key]: e.target.value });
      };
    }
    return this.inputHandler[key];
  };

  handleSubmit = login => async e => {
    e.preventDefault();
    try {
      const res = await login();
      console.log("got res: ", res);
      //localStorage.setItem('token', res.login.token)
      //localStorage.setItem('userId', res.login.userId)
    } catch (error) {
      console.log("got err: ", error);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={loginQL} variables={{ email, password }}>
        {(login, { loading, error }) => {
          return (
            <div className="Login page d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center text-primary">Login here:</h3>
              <form onSubmit={this.handleSubmit(login)}>
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
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-block mx-auto"
                  onClick={login}
                >
                  Login
                </button>
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
