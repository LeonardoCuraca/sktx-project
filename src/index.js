import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from './Dashboard';
import Login from './components/Login';
import AuthService from "./Services/AuthService";
import { Component } from "react";

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }

  componentWillMount() {
    AuthService.isLogged(localStorage.getItem('token'))
    .then(data => {
      console.log(data)
      if (data.code === 200) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div class={this.state.loggedIn == null ? "ui active dimmer" : "ui dimmer"}>
            <div class="ui text loader">Verificando</div>
        </div>
        <Switch>
          <Route exact path="/">
            {this.state.loggedIn !== null && !this.state.loggedIn ? <Login /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/dashboard">
            {this.state.loggedIn !== null && !this.state.loggedIn ? <Redirect to="/"/> : <Dashboard />}
          </Route>
          <Route path="*">
            <div>404 Page not Found!</div>
          </Route>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Index />,document.getElementById('root'));
