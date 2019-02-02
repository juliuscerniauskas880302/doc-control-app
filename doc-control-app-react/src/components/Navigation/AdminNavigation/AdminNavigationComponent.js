import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

export default function AdminNavigationComponent(props) {
  return (
    <div className="navigation">
      <ul className="navigation_ul">
        <li className="nav-item active">
          <Link to="/">Users</Link>|&nbsp;
        </li>
        <li className="nav-item active">
          <Link to="/users2/add">New User</Link>|&nbsp;
        </li>
        <li>
          <Link to="/groups/add">New Group</Link>|&nbsp;
        </li>
        <li>
          <Link to="/document_types/add">New Document Type</Link>|&nbsp;
        </li>
        <li>
          <Link to="/userdocument/add">Testing</Link>|&nbsp;
        </li>
        <li>
          <Link to="/document_types/groups">Types=>Groups</Link>|&nbsp;
        </li>
        {props.logout()}
      </ul>
    </div>
  );
}
