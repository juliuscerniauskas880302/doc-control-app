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
  componentDidMount = () => {
    console.log("Authentication");
    console.log(this.props);
  };
  setLoggedState = () => {
    this.setState({ isLogged: true });
  };

  onClickLogoutHandler = () => {
    sessionStorage.clear("user");
    this.setState({ isLogged: false });
  };
  logout = () => {
    return <div onClick={this.onClickLogoutHandler}>Log out</div>;
  };

  render() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    if (data === null) {
      return (
        <LoginContainer {...this.props} setLoggedState={this.setLoggedState} />
      );
    } else if (data.isAdmin) {
      return <AdminNavigationContainer {...this.props} logout={this.logout} />;
    } else
      return <UserNavigationContainer {...this.props} logout={this.logout} />;
  }
}
