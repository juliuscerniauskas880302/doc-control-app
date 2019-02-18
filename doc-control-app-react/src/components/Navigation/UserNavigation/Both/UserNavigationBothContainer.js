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
                  bottomTab: "true",
                  to: "/createdDocuments",
                  name: "Sukurti",
                  icon: "fas fa-file mr-3 text-gray"
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
                <Route
                  exact
                  path="/documentStatistics"
                  component={DocumentStatisticsContainer}
                />
                <Route
                  exact
                  path="/userStatistics"
                  component={UserStatisticsContainer}
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
