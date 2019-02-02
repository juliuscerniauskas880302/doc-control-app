import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

export default function AdminNavigationComponent(props) {
  return (
    <div className="container">
      <section id="content-navigation">
        <p className="nav-item active">
          <Link to="/">Users</Link>
        </p>
        <p className="nav-item active">
          <Link to="/users2/add">New User</Link>
        </p>
        <p>
          <Link to="/groups/add">New Group</Link>
        </p>
        <p>
          <Link to="/document_types/add">New Document Type</Link>
        </p>
        <p>
          <Link to="/userdocument/add">Testing</Link>
        </p>
        <p>
          <Link to="/document_types/groups">Types in Groups</Link>
        </p>
        <div> {props.logout()}</div>
      </section>
    </div>
  );
}
