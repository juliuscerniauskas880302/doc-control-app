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
import UserNavigationSubmitComponent from "./UserNavigationSubmitComponent";
import NavigationComponent from "../../NavigationComponent";

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
      <div>
        <BrowserRouter>
          <div>
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
                }
              ]}
              {...this.props}
            >
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
            </NavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
