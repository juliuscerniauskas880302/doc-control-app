import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserNoneInformationContainer from "./UserNoneInformationContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";

export default class UserNavigationNoneContainer extends Component {
  render() {
    if (!checkToken()) {
      this.props.history.push("/login");
    }
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavigationComponent navigation={[]} {...this.props}>
              <Switch>
                <Route path="*" component={UserNoneInformationContainer} />
                <Route component={UserNoneInformationContainer} />
              </Switch>
            </NavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
