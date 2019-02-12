import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Axios from "axios";
import UserNavigationNoneComponent from "./UserNavigationNoneComponent";
import UserNoneInformationContainer from "./UserNoneInformationContainer";

export default class UserNavigationNoneContainer extends Component {
  checkToken = () => {
    let token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      Axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      localStorage.clear("user");
      localStorage.clear("accessToken");
      delete Axios.defaults.headers.Authorization;
      this.props.history.push("/login");
    }
  };
  render() {
    this.checkToken();
    return (
      <div>
        <BrowserRouter>
          <div>
            <UserNavigationNoneComponent {...this.props}>
              <Switch>
                <Route path="*" component={UserNoneInformationContainer} />
                <Route component={UserNoneInformationContainer} />
              </Switch>
            </UserNavigationNoneComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
