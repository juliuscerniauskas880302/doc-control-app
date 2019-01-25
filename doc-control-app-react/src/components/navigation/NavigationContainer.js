import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import NewUserForm from "../admin/NewUserForm";
import UserContainer from "../admin/UserContainer";
import Login from "../admin/Login";

export default class NavigationContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/users/add" exact component={NewUserForm} exact />
              <Route path="/" component={Login} exact />
              <Route path="/users" component={UserContainer} exact />

              {/* <Route path="/create" component={UserDocuments} exact />
              <Route path="/submitted" component={SubmittedDocuments} exact /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
