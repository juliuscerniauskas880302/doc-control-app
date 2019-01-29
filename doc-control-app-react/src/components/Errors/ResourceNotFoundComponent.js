import React from "react";
import { Link } from "react-router-dom";
import "./ResourceNotFound.css";

export default function ResourceNotFoundCompoentn() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div class="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div class="error-actions">
              <Link to="/">
                <div class="btn btn-primary btn-lg">
                  {" "}
                  <span class="glyphicon glyphicon-home" />
                  Take Me Home{" "}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
