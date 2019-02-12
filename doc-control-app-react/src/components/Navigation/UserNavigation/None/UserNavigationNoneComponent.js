import React, { Component } from "react";
import avatar from "../../../../css/images/avatar.png";
import NavLink from "../../../Utilities/Navigation/NavLink";

export default class UserNavigationNoneComponent extends Component {
  constructor(props) {
    super(props);
    this.showMenu = true;
    this.state = { showMenu: "sidebar py-3" };
  }

  toggleMenu = () => {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.setState({ showMenu: "sidebar py-3 show" });
    } else {
      this.setState({ showMenu: "sidebar py-3 shrink" });
    }
  };

  render() {
    let data = JSON.parse(localStorage.getItem("user"));
    let user;
    let role;
    if (data) {
      role = data.admin ? "Administratorius" : "Paprastas vartotojas";
      user = data;
    } else {
      user = { firstname: "", lastname: "" };
      this.props.history.push("/login");
    }
    return (
      <React.Fragment>
        <header className="header">
          <nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
            <div
              onClick={() => this.toggleMenu()}
              className="sidebar-toggler text-gray-600 mr-4 mr-lg-5 "
            >
              <i className="fas fa-file fa-4x" />
            </div>
            <div className="font-weight-bold text-uppercase ">
              Dokumentu valdymas
            </div>
            <ul className="ml-auto d-flex align-items-center list-unstyled mb-0">
              <li className="nav-item dropdown ml-auto">
                <div
                  id="userInfo"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle"
                >
                  <img
                    src={avatar}
                    alt="Jason Doe"
                    style={{ maxWidth: "2.5rem" }}
                    className="img-fluid rounded-circle shadow"
                  />
                </div>
                <div aria-labelledby="userInfo" className="dropdown-menu">
                  <div className="dropdown-item">
                    <strong className="d-block text-uppercase headings-font-family">
                      {user.firstname + " " + user.lastname}
                    </strong>
                    <small>{role}</small>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.logout()}
                  >
                    Atsijungti
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </header>

        <div className="d-flex align-items-stretch">{this.props.children}</div>
      </React.Fragment>
    );
  }
}
