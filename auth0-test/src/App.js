import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";

import Auth from "./Auth";

const auth = new Auth();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Home {...props} auth={auth} />}
        />
        <Route
          exact
          path="/dashboard"
          render={props => <Dashboard {...props} auth={auth} />}
        />
        <button onClick={() => auth.logout()}>Log OUT</button>
      </div>
    );
  }
}

const Home = props => {
  return (
    <div>
      <h1>This is the home page</h1>
      <button
        onClick={e => {
          e.preventDefault();
          props.auth.login();
        }}
      >
        Log in!!!!
      </button>
    </div>
  );
};

export default App;
