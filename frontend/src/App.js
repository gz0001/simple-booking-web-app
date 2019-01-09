import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Pages:
import Login from "./pages/Login";
import Booking from "./pages/Booking";

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/booking" component={Booking} />
        <Route path="/login" component={Login} />
        <Route
          render={() => <h1 className="text-center">404. Page not founded</h1>}
        />
      </Switch>
    );
  }
}

export default App;
