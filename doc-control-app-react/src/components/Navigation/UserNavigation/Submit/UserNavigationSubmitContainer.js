import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../../UserDocuments/OneSubmittedDocumentContainer";
import NewDocumentContainer from "../../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../../CreateEditDocument/EditDocumentContainer";
import ResourceNotFoundCompoentn from "../../../Errors/ResourceNotFoundComponent";
import Axios from "axios";
import NavigationComponent from "../../NavigationComponent";
import CSV from "../../../Testing/CSV";
import ResponseMessage from "../../../Utilities/ResponseMessage";

export default class UserNavigationSubmitContainer extends Component {
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
      <BrowserRouter>
        <NavigationComponent
          navigation={[
            {
              to: "/newDocument",
              name: "Naujas dokumentas",
              icon: "fas fa-file-signature  mr-3 text-gray"
            },
            {
              to: "/",
              name: "Pateikti",
              icon: "fas fa-file-alt mr-3 text-gray"
            },
            {
              to: "/createdDocuments",
              name: "Sukurti",
              icon: "fas fa-file mr-3 text-gray"
            },
            {
              to: "/downloadCSV",
              name: "Atsisiusti csv",
              icon: "fas fa-file mr-3 text-gray"
            }
          ]}
          {...this.props}
        >
          <Switch>
            <Route exact path="/" component={UserSubmittedDocumentsContainer} />
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
              path="/admin/newDocument"
              component={NewDocumentContainer}
            />
            <Route exact path="/newDocument" component={NewDocumentContainer} />
            <Route
              exact
              path="/admin/Documents/:documentId"
              component={EditDocumentContainer}
            />
            <Route
              exact
              path="/downloadCSV"
              render={props => (
                <ResponseMessage>
                  <CSV {...props} />
                </ResponseMessage>
              )}
            />
            <Route path="*" component={ResourceNotFoundCompoentn} />
            <Route component={ResourceNotFoundCompoentn} />
          </Switch>
        </NavigationComponent>
      </BrowserRouter>
    );
  }
}
