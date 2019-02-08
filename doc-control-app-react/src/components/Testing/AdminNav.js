import React, { Component } from "react";
import "./Testing.css";
import { Link } from "react-router-dom";

export default class AdminNav extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  changeState = () => {
    console.log("aaaa");
    console.log(this.state.showMenu);
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar" className={this.state.showMenu ? "active" : ""}>
          <div className="sidebar-header">
            <h1>Dokumentų tvarkymas </h1>
          </div>

          <ul className="list-unstyled components">
            <p>Administratorius</p>
            <hr />
            <li>
              <Link to="/">
                <div className="btn btn-info my-1">
                  <i className="fas fa-id-card left">Visi vartotojai</i>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/users/add">
                <div className="btn btn-info my-1">
                  <i className="fas fa-file-signature left">
                    Naujas Vartotojas
                  </i>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/groups/add">
                <div className="btn btn-info my-1">
                  <i className="fas fa-file-alt left">Nauja grupė</i>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/document_types/add">
                <div className="btn btn-info my-1">
                  <i className="fas fa-file-alt left">Naujas dokumento tipas</i>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/document_types/groups">
                <div className="btn btn-info my-1">
                  <i className="fas fa-file-alt left">Dokumentų tipų grupės</i>
                </div>
              </Link>
            </li>
          </ul>

          <hr />
        </nav>

        <div id="contentz">
          <nav className="navbar navbar-default ">
            <div className="d-flex">
              <button
                onClick={() => this.changeState()}
                type="button"
                id="sidebarCollapse"
                className="btn btn-info navbar-btn"
              >
                <i className="fas fa-bars" />
                <span> Meniu</span>
              </button>
              <div className="p-2 flex-fill bd-highlight" />
            </div>
            <div className="navbar-header">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.props.logout()}
              >
                <span>
                  <i className="fas fa-sign-out-alt" />
                  Atsijungti
                </span>
              </button>
            </div>
          </nav>
          {this.props.children}
        </div>
      </div>
    );
  }
}
