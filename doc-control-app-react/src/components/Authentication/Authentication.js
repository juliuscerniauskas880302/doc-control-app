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
    //sessionStorage.clear("user");
    localStorage.clear("user");
    this.setState({ isLogged: false });
  };
  logout = () => {
    return <div onClick={this.onClickLogoutHandler}>Log out</div>;
  };

  render() {
    //let data = JSON.parse(//.getItem("user"));
    let localData = JSON.parse(localStorage.getItem("user"));
    //console.log("//", data);
    console.log("LocalStorage", localData);
    if (localData === null) {
      return (
        <LoginContainer {...this.props} setLoggedState={this.setLoggedState} />
      );
    } else if (localData.isAdmin) {
      return <AdminNavigationContainer {...this.props} logout={this.logout} />;
    } else
      return <UserNavigationContainer {...this.props} logout={this.logout} />;
  }
}
