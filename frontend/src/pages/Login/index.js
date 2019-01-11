import React, { Component } from "react";

// Styles:
import "./styles.scss";

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

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="Login page d-flex justify-content-center align-items-center flex-column">
        <h3 className="text-center text-primary">Login here:</h3>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Login
          </button>
          {error && (
            <p className="text-danger text-center">Try again please!</p>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
