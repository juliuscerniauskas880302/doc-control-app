import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = props => {
  return (
    <div className="navigation">
      <ul className="navigation_ul">
        <li>
          <NavLink to="/users">
            <div>All users</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users2/add">
            <div>New user</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users/update/hoperis">
            <div>Update by username</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups/add">
            <div>New Group Form</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/document_types/add">
            <div>New Document Type Form</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/userdocument/add">
            <div>New User Document Form</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/document_types/groups">
            <div>Types In Groups </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">
            <div>Can create</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/submitted">
            <div>Can approve</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
