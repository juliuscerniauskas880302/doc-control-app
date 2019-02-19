import React from "react";
import NavigationLink from "./NavigationLink";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.showMenu = true;
    this.state = { menuClass: "sidebar py-3" };
  }

  toggleMenu = () => {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.setState({ menuClass: "sidebar py-3 show" });
    } else {
      this.setState({ menuClass: "sidebar py-3 shrink" });
    }
  };

  render() {
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
              {this.props.title}
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
                    src={this.props.avatar}
                    alt="avatar"
                    style={{ maxWidth: "2.5rem" }}
                    className="img-fluid rounded-circle shadow"
                  />
                </div>
                <div aria-labelledby="userInfo" className="dropdown-menu">
                  <div className="dropdown-item">
                    <strong className="d-block text-uppercase headings-font-family">
                      {this.props.user.firstname +
                        " " +
                        this.props.user.lastname}
                    </strong>
                    <small>{this.props.role}</small>
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
        <div className="d-flex align-items-stretch ">
          <div id="sidebar" className={this.state.menuClass}>
            <div className="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family">
              <i className="fas fa-tools fa-3x" />
              <p>Meniu</p>
              <div className="line" />
            </div>
            <NavigationLink navigation={this.props.nav} />
          </div>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}