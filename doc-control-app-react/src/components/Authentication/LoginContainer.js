import React, { Component } from "react";
import Axios from "axios";
import Login from "./Login";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrongUsernameOrPassword: false,
      password: "",
      username: "",
      users: [
        {
          username: "julius",
          password: "julius",
          isAdmin: false
        },
        {
          username: "jonas",
          password: "jonas",
          isAdmin: false
        },
        {
          username: "migle",
          password: "captain",
          isAdmin: true
        },
        {
          username: "vytautas",
          password: "vytautas",
          isAdmin: false
        },
        {
          username: "root",
          password: "root",
          isAdmin: true
        },
        {
          username: "andrius",
          password: "andrius",
          isAdmin: false
        }
      ]
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
    // console.log("submitt");

    // let userData = new URLSearchParams();
    // userData.append("username", this.state.username);
    // userData.append("password", this.state.password);
    // Axios.post("http://localhost:8081/login", userData, {
    //   headers: { "Content-type": "application/x-www-form-urlencoded" }
    // })
    //   .then(resp => {
    //     console.log("user " + resp.data.username + " logged in");
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    this.state.users.forEach(user => {
      if (this.state.username === user.username) {
        if (this.state.password === user.password) {
          sessionStorage.setItem("user", JSON.stringify(user));
          //console.log("Found user:", user);
          //let data = JSON.parse(sessionStorage.getItem("lastname"));
          //console.log(data);
          this.props.setLoggedState();
        }
      }
    });
    this.setState({ wrongUsernameOrPassword: true });
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
