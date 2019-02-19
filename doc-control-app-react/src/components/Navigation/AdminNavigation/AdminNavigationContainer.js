import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserContainer from "../../Admin/User/UserContainer";
import NewUserContainer from "../../Admin/User/NewUserContainer";
import UpdateUserContainer from "../../Admin/User/UpdateUserContainer";
import NewGroupForm from "../../Admin/Groups/NewGroupForm";
import NewDocumentTypeContainer from "../../Admin/DocumentType/NewDocumentTypeContainer";
import TypesInGroups from "../../Admin/Types_in_groups/TypesInGroups";
import EditUserGroups from "../../Admin/Groups/EditUserGroups";
import ResourceNotFoundComponent from "../../Errors/ResourceNotFoundComponent";
import { checkToken } from "../../Utilities/CheckToken";
import NavigationComponent from "../NavigationComponent";
import ResponseMessage from "../../Utilities/ResponseMessage";

export default class AdminNavigationContainer extends Component {
  render() {
    if (!checkToken()) {
      this.props.history.push("/login");
    }
    return (
      <BrowserRouter>
        <NavigationComponent
          navigation={[
            { to: "/", name: "Pagrindinis", icon: "fas fa-users text-gray" },
            {
              to: "/users/add",
              name: "Naujas vartotojas",
              icon: "fas fa-user ml-1 text-gray"
            },
            {
              to: "/groups/add",
              name: "Grupės",
              icon: "fas fa-clipboard-list  ml-1 text-gray"
            },
            {
              to: "/types/add",
              name: "Dokumentų tipai",
              icon: "fas fa-file-signature ml-1 text-gray"
            },
            {
              to: "/document_types/groups",
              name: "Siųsti / Peržiūrėti",
              icon: "fas fa-clipboard ml-1 text-gray"
            }
          ]}
          {...this.props}
        >
          <Switch>
            <Route path="/" component={UserContainer} exact />
            <Route path="/users/add" component={NewUserContainer} exact />
            <Route path="/groups/add" component={NewGroupForm} exact />
            <Route
              path="/document_types/groups"
              render={props => (
                <ResponseMessage>
                  <TypesInGroups {...props} />
                </ResponseMessage>
              )}
              exact
            />
            <Route
              path="/types/add"
              render={props => (
                <ResponseMessage>
                  <NewDocumentTypeContainer {...props} />
                </ResponseMessage>
              )}
              exact
            />
            <Route
              path="/users/groups/:username"
              render={props => (
                <ResponseMessage>
                  <EditUserGroups {...props} />
                </ResponseMessage>
              )}
              exact
            />
            <Route
              path="/users/update/:username"
              render={props => (
                <ResponseMessage>
                  <UpdateUserContainer {...props} />
                </ResponseMessage>
              )}
              exact
            />
            <Route path="*" component={ResourceNotFoundComponent} />
            <Route component={ResourceNotFoundComponent} />
          </Switch>
        </NavigationComponent>
      </BrowserRouter>
    );
  }
}
