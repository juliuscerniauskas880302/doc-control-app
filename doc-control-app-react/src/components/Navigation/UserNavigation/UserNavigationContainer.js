import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../UserDocuments/OneSubmittedDocumentContainer";
import ReviewDocumentsContainer from "../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../ReviewDocuments/OneReviewDocumentContainer";
import NewDocumentContainer from "../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../CreateEditDocument/EditDocumentContainer";
import ResourceNotFoundCompoentn from "../../Errors/ResourceNotFoundComponent";
import UserNavigationComponent from "./UserNavigationConponent";
import Axios from "axios";

Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(
  localStorage.getItem("accessToken")
)}`;
export default class UserNavigationContainer extends Component {
  componentDidMount = () => {
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
    return (
      <div>
        <BrowserRouter>
          <div>
            <UserNavigationComponent {...this.props}>
              <Switch>
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
                  path="/newDocument"
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
            </UserNavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
