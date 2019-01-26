import React, { Component } from "react";
import Axios from "axios";
import Login from "./Login";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", pass: "" };
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onPassChange = event => {
    this.setState({ pass: event.target.value });
  };

  onSubmit = event => {
    console.log("submitt");

    let userData = new URLSearchParams();
    userData.append("username", this.state.email);
    userData.append("password", this.state.pass);
    Axios.post("http://localhost:8081/login", userData, {
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    })
      .then(resp => {
        console.log("user " + resp.data.username + " logged in");
      })
      .catch(e => {
        console.log(e);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Login
        email={this.state.email}
        pass={this.state.pass}
        onEmailChange={this.onEmailChange}
        onPassChange={this.onPassChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}
