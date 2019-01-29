import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
////////////////Julius components///////////////////////////////////
import NavigationComponent from "./NavigationComponent";
import UserContainer from "../Admin/User/UserContainer";
import Login from "../Admin/Login";
import NewUserContainer from "../Admin/User/NewUserContainer";
import UpdateUserContainer from "../Admin/User/UpdateUserContainer";
import NewGroupForm from "../Admin/Groups/NewGroupForm";
import NewDocumentTypeContainer from "../Admin/DocumentType/NewDocumentTypeContainer";
import TypesInGroups from "../Admin/Types_in_groups/TypesInGroups";
import EditUserGroups from "../Admin/Groups/EditUserGroups";
import LoginContainer from "../Admin/LoginContainer";
import ResourceNotFoundComponent from "../Errors/ResourceNotFoundComponent";
import NewDocumentForm from "../user/Document/NewDocumentForm";
/////////////////////////////////////////////////////////////////

/////////////////Jonas components////////////////////////////////
import UserSubmittedDocumentsContainer from "../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../UserDocuments/OneSubmittedDocumentContainer";
import ReviewDocumentsContainer from "../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../ReviewDocuments/OneReviewDocumentContainer";
import NewDocumentContainer from "../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../CreateEditDocument/EditDocumentContainer";
/////////////////////////////////////////////////////////////////
export default class NavigationContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavigationComponent />
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/users" component={UserContainer} exact />
              <Route path="/users2/add" component={NewUserContainer} exact />
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
              {/* ///////////////////////////////////////////////////////// */}
              <Route
                exact
                path="/"
                component={UserSubmittedDocumentsContainer}
              />
              <Route
                exact
                path="/createdDocuments"
                component={UserCreatedDocumentsContainer}
              />
              <Route
                exact
                path="/createdDocuments/:documentId"
                component={OneCreatedDocumentsContainer}
              />
              <Route
                exact
                path="/submittedDocuments/:documentId"
                component={OneSubmittedDocumentsContainer}
              />
              <Route
                exact
                path="/reviewDocuments"
                component={ReviewDocumentsContainer}
              />
              <Route
                exact
                path="/reviewDocuments/:documentId"
                component={OneReviewDocumentsContainer}
              />
              <Route
                exact
                path="/admin/newDocument"
                component={NewDocumentContainer}
              />
              <Route
                exact
                path="/admin/Documents/:documentId"
                component={EditDocumentContainer}
              />
              <Route path="*" component={ResourceNotFoundComponent} />
              <Route component={ResourceNotFoundComponent} />

              {/* <Route path="/create" component={UserDocuments} exact />
              <Route path="/submitted" component={SubmittedDocuments} exact /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
