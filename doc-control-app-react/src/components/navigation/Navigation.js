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
          <NavLink to="/users/add">
            <div>New user</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <div>Login</div>
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
