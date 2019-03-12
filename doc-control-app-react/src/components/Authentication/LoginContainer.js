import React, { Component } from "react";
import Axios from "axios";
import Login from "./Login";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrongUsernameOrPassword: false,
      password: "",
      username: ""
    };
  }

  componentDidMount = () => {
    this.props.history.push("/");
  };

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
      wrongUsernameOrPassword: false
    });
  };
  onPassChange = event => {
    this.setState({
      password: event.target.value,
      wrongUsernameOrPassword: false
    });
  };

  onSubmit = event => {
    event.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    Axios.post("/api/auth/signin", data)
      .then(res => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`;
        Axios.get("/api/users/me")
          .then(ress => {
            localStorage.setItem("user", JSON.stringify(ress.data));
            this.props.setLoggedState();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(e => {
        this.setState({ wrongUsernameOrPassword: true });
      });
  };

  render() {
    return (
      <Login
        wrongUsernameOrPassword={this.state.wrongUsernameOrPassword}
        username={this.state.username}
        password={this.state.password}
        onUsernameChange={this.onUsernameChange}
        onPassChange={this.onPassChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}
