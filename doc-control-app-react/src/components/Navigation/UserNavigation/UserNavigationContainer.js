import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../UserDocuments/OneSubmittedDocumentContainer";
import ReviewDocumentsContainer from "../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../ReviewDocuments/OneReviewDocumentContainer";
import NewDocumentContainer from "../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../CreateEditDocument/EditDocumentContainer";
import UserNavigationComponent from "./UserNavigationConponent";
import ResourceNotFoundCompoentn from "../../Errors/ResourceNotFoundComponent";
export default class UserNavigationContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <UserNavigationComponent logout={this.props.logout} />
            <Switch>
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
              <Route path="*" component={ResourceNotFoundCompoentn} />
              <Route component={ResourceNotFoundCompoentn} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
