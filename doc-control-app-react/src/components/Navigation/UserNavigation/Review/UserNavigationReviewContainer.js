import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ReviewDocumentsContainer from "../../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../../ReviewDocuments/OneReviewDocumentContainer";
import ResourceNotFoundComponent from "../../../Errors/ResourceNotFoundComponent";

import Axios from "axios";
import UserNavigationReviewComponent from "./UserNavigationReviewComponent";
import DocumentStatisticsContainer from "../../../ReviewDocuments/DocumentStatisticsContainer";
import UserStatisticsContainer from "../../../ReviewDocuments/UserStatisticsContainer";

export default class UserNavigationReviewContainer extends Component {
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
            <UserNavigationReviewComponent {...this.props}>
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
            </UserNavigationReviewComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}