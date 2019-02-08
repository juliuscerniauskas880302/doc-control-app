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
import AdminNav from "../../Testing/AdminNav";
export default class AdminNavigationContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <AdminNav {...this.props}>
              <Switch>
                <Route path="/" component={UserContainer} exact />
                <Route path="/users/add" component={NewUserContainer} exact />
                <Route path="/groups/add" component={NewGroupForm} exact />
                <Route
                  path="/document_types/groups"
                  component={TypesInGroups}
                  exact
                />
                <Route
                  path="/document_types/add"
                  component={NewDocumentTypeContainer}
                  exact
                />
                <Route
                  path="/users/groups/:username"
                  component={EditUserGroups}
                  exact
                />
                <Route
                  path="/users/update/:username"
                  component={UpdateUserContainer}
                  exact
                />
                <Route path="*" component={ResourceNotFoundComponent} />
                <Route component={ResourceNotFoundComponent} />
              </Switch>
            </AdminNav>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
