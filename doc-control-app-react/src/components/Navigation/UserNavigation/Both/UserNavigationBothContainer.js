import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../../UserDocuments/OneSubmittedDocumentContainer";
import ReviewDocumentsContainer from "../../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../../ReviewDocuments/OneReviewDocumentContainer";
import NewDocumentContainer from "../../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../../CreateEditDocument/EditDocumentContainer";
import ResourceNotFoundComponent from "../../../Errors/ResourceNotFoundComponent";
import UserStatisticsContainer from "../../../ReviewDocuments/UserStatisticsContainer";
import DocumentStatisticsContainer from "../../../ReviewDocuments/DocumentStatisticsContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";
import ResponseMessage from "../../../Utilities/ResponseMessage";
import Profile from "../../Profile";

export default class UserNavigationBothContainer extends Component {
  render() {
    if (!checkToken()) {
      this.props.history.push("/login");
    }
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
                  topTab: {
                    title: "Dokumentų pateikimas",
                    icon: "far fa-address-book mr-2 text-gray"
                  },
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
                  bottomTab: "true",
                  name: "Bylų atsisiuntimas",
                  icon: "fas fa-copy mr-3 text-gray",
                  type: "dropdown"
                },
                {
                  topTab: {
                    title: "Dokumentų peržiūra",
                    icon: "far fa-address-book mr-2 text-gray"
                  },
                  to: "/reviewDocuments",
                  name: "Peržiūrėti",
                  icon: "fas fa-file-contract  mr-3 text-gray"
                },
                {
                  to: "/documentStatistics",
                  name: "Dokumentų statistika",
                  icon: "fas fa-chart-pie mr-3 text-gray"
                },
                {
                  to: "/userStatistics",
                  name: "Vartotojų statistika",
                  icon: "fas fa-chart-line mr-3 text-gray"
                }
              ]}
              {...this.props}
            >
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ResponseMessage>
                      <UserSubmittedDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/createdDocuments"
                  render={props => (
                    <ResponseMessage>
                      <UserCreatedDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/createdDocuments/:documentId"
                  render={props => (
                    <ResponseMessage>
                      <OneCreatedDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/submittedDocuments/:documentId"
                  render={props => (
                    <ResponseMessage>
                      <OneSubmittedDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/reviewDocuments"
                  render={props => (
                    <ResponseMessage>
                      <ReviewDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/reviewDocuments/:documentId"
                  render={props => (
                    <ResponseMessage>
                      <OneReviewDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/admin/newDocument"
                  render={props => (
                    <ResponseMessage>
                      <NewDocumentContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/newDocument"
                  render={props => (
                    <ResponseMessage>
                      <NewDocumentContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/admin/Documents/:documentId"
                  render={props => (
                    <ResponseMessage>
                      <EditDocumentContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/documentStatistics"
                  render={props => (
                    <ResponseMessage>
                      <DocumentStatisticsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/userStatistics"
                  render={props => (
                    <ResponseMessage>
                      <UserStatisticsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  path="/user/profile"
                  render={props => (
                    <ResponseMessage>
                      <Profile {...props} />
                    </ResponseMessage>
                  )}
                  exact
                />

                <Route path="*" component={ResourceNotFoundComponent} />
                <Route component={ResourceNotFoundComponent} />
              </Switch>
            </NavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
