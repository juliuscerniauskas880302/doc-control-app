import React from "react";
import { Link } from "react-router-dom";
import "./ResourceNotFound.css";
import music from "./home.mp3";

export default class ResourceNotFoundCompoentn extends React.Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className="container">
        <iframe
          title="player"
          src={music}
          allow="autoplay"
          frameBorder="0"
          width="0"
          height="0"
          loop
        />

        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Uoj!</h1>
              <h2>404 Resursas nerastas</h2>
              <div className="error-details">
                Įvyko klaida arba puslapis, kurio ieškote, neegzistuoja.!
              </div>
              <div className="error-actions">
                <Link to="/">
                  <div className="btn btn-primary btn-lg">
                    <span className="glyphicon glyphicon-home" />
                    Grįžti atgal
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
