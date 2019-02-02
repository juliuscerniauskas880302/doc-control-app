import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

const UserNavigationComponent = props => {
  return (
    <div className="container">
      <section id="content-navigation">
        <p className="nav-item active">
          <Link to="/">Pateikti</Link>
        </p>
        <p className="nav-item active">
          <Link to="/createdDocuments">Sukurti</Link>
        </p>
        <p className="nav-item active">
          <Link to="/reviewDocuments">Peržiūrėti</Link>
        </p>
        <div className="nav-item active">{props.logout()}</div>
      </section>
    </div>
  );
};
export default UserNavigationComponent;
