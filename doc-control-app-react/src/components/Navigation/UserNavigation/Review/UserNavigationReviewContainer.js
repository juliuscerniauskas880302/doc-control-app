import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ReviewDocumentsContainer from "../../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../../ReviewDocuments/OneReviewDocumentContainer";
import ResourceNotFoundComponent from "../../../Errors/ResourceNotFoundComponent";
import DocumentStatisticsContainer from "../../../ReviewDocuments/DocumentStatisticsContainer";
import UserStatisticsContainer from "../../../ReviewDocuments/UserStatisticsContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";

export default class UserNavigationReviewContainer extends Component {
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
                  to: "/",
                  name: "Dokumentai peržiūrai",
                  icon: "fas fa-file-alt mr-3 text-gray"
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
                <Route exact path="/" component={ReviewDocumentsContainer} />
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
