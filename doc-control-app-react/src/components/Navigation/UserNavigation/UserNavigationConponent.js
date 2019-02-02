import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

const UserNavigationComponent = props => {
  return (
    <div className="container">
      <section id="content-navigation">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="navigation-bar">Pateikti</span>
        </Link>

        <Link to="/createdDocuments" style={{ textDecoration: "none" }}>
          <span className="navigation-bar">Sukurti</span>
        </Link>

        <Link to="/reviewDocuments" style={{ textDecoration: "none" }}>
          <span className="navigation-bar">Peržiūrėti</span>
        </Link>

        <div className="logout">{props.logout()}</div>
      </section>
    </div>
  );
};
export default UserNavigationComponent;

{
  /* <Link to="/" style={{ textDecoration: "none" }}>
<span className="navigation-bar">User</span>
</Link> */
}
