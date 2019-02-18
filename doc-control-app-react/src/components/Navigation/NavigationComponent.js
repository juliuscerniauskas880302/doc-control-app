import React, { Component } from "react";
import avatar from "../../css/images/avatar.png";
import HeaderSideBar from "./HeaderSideBar";

export default class NavigationComponent extends Component {
  render() {
    let data = JSON.parse(localStorage.getItem("user"));
    let user;
    if (data) {
      user = data;
    } else {
      user = { firstname: "", lastname: "" };
      this.props.history.push("/login");
    }
    return (
      <React.Fragment>
        <HeaderSideBar
          title="Dokumentų valdymas"
          user={user}
          avatar={avatar}
          logout={this.props.logout}
          role={user.admin ? "Administratorius" : "Paprastas vartotojas"}
          nav={this.props.navigation}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}
