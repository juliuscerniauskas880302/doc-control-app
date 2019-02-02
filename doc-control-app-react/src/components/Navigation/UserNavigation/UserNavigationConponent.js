import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

const UserNavigationComponent = props => {
  return (
    <div className="navigation">
      <ul className="navigation_ul">
        <li className="nav-item active">
          <Link to="/">Pateikti</Link> |&nbsp;
        </li>
        <li className="nav-item active">
          <Link to="/createdDocuments">Sukurti</Link> |&nbsp;
        </li>
        <li className="nav-item active">
          <Link to="/reviewDocuments">Peržiūrėti</Link> |&nbsp;
        </li>
        {props.logout()}
      </ul>
    </div>
  );
};
export default UserNavigationComponent;
