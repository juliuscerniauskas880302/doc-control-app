import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import UserContainer from "../admin/User/UserContainer";
import Login from "../admin/Login";
import NewUserForm2 from "../admin/User/NewUserForm2";
import UpdateUser from "../admin/User/UpdateUser";
import NewGroupForm from "../admin/Groups/NewGroupForm";
import NewDocumentTypeForm from "../admin/Document_types/NewDocumentTypeForm";
import TypesInGroups from "../admin/Types_in_groups/TypesInGroups";
import EditUserGroups from "../admin/Groups/EditUserGroups";
import LoginContainer from "../admin/LoginContainer";
import ResourceNotFound from "../errors/ResourceNotFound";
import NewDocumentForm from "../user/Document/NewDocumentForm";

export default class NavigationContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" component={Login} exact />
              <Route path="/users" component={UserContainer} exact />
              <Route path="/users2/add" component={NewUserForm2} exact />
              <Route path="/groups/add" component={NewGroupForm} exact />
              <Route
                path="/userdocument/add"
                component={NewDocumentForm}
                exact
              />
              <Route path="/login" component={LoginContainer} exact />
              <Route
                path="/document_types/groups"
                component={TypesInGroups}
                exact
              />
              <Route
                path="/document_types/add"
                component={NewDocumentTypeForm}
                exact
              />
              <Route
                path="/users/groups/:username"
                component={EditUserGroups}
                exact
              />
              <Route
                path="/users/update/:username"
                component={UpdateUser}
                exact
              />
              <Route component={ResourceNotFound} />

              {/* <Route path="/create" component={UserDocuments} exact />
              <Route path="/submitted" component={SubmittedDocuments} exact /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
