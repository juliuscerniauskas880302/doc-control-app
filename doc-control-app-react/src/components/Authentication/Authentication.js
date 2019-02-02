import React, { Component } from "react";
import LoginContainer from "./LoginContainer";
import AdminNavigationContainer from "../Navigation/AdminNavigation/AdminNavigationContainer";
import UserNavigationContainer from "../Navigation/UserNavigation/UserNavigationContainer";

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }
  setLoggedState = () => {
    this.setState({ isLogged: true });
  };

  onClickLogoutHandler = () => {
    sessionStorage.clear("user");
    this.setState({ isLogged: false });
  };
  logout = () => {
    return <p onClick={this.onClickLogoutHandler}>Log out</p>;
  };

  render() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    if (data === null) {
      return <LoginContainer setLoggedState={this.setLoggedState} />;
    } else if (data.isAdmin) {
      return <AdminNavigationContainer logout={this.logout} />;
    } else return <UserNavigationContainer logout={this.logout} />;
  }
}
