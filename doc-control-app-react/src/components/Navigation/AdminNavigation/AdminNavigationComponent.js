import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

export default function AdminNavigationComponent(props) {
  return (
    <div className="container">
      <section id="content-navigation">
        {/* <span className="nav-item active mx-1">
          <Link to="/">Users</Link>
        </span>
        <span className="nav-item active mx-1">
          <Link to="/users2/add">New User</Link>
        </span>
        <span className="nav-item active mx-1">
          <Link to="/groups/add">New Group</Link>
        </span>
        <span className="nav-item active mx-1">
          <Link to="/document_types/add">New Document Type</Link>
        </span>
        <span className="nav-item active mx-1">
          <Link to="/userdocument/add">Testing</Link>
        </span>
        <span className="nav-item active mx-1">
          <Link to="/document_types/groups">Types in Groups</Link>
        </span>
        <div> {props.logout()}</div> */}
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navigation-bar">User</span>
          </Link>
          <Link to="/users2/add" style={{ textDecoration: "none" }}>
            <span className="navigation-bar">New User</span>
          </Link>

          <Link to="/groups/add" style={{ textDecoration: "none" }}>
            <span className="navigation-bar">New Group</span>
          </Link>

          <Link to="/document_types/add" style={{ textDecoration: "none" }}>
            <span className="navigation-bar">New Document Type</span>
          </Link>

          <Link to="/document_types/groups" style={{ textDecoration: "none" }}>
            <span className="navigation-bar">Types in Groups</span>
          </Link>

          <div className="logout"> {props.logout()}</div>
        </nav>
      </section>
    </div>
  );
}
