import React from "react";
import NavLink from "../../components/Utilities/Navigation/NavLink";

export default function NavigationLink(props) {
  let allLinks = () => {
    let data = props.navigation.map((nav, index) => {
      let topTab = nav.topTab ? (
        <li className="sidebar-list-item ml-2 my-3">
          <i className={nav.topTab.icon} />
          <span>{nav.topTab.title}</span>
        </li>
      ) : null;
      let bottomTab = nav.bottomTab ? <div className="line" /> : null;
      return (
        <React.Fragment key={`nav-${index}`}>
          {topTab}
          <NavLink to={nav.to} style={{ textDecoration: "none" }}>
            <li className="sidebar-list-item ">
              <div className="sidebar-link text-muted ">
                <i className={nav.icon} />
                <span className="mx-auto">{nav.name}</span>
              </div>
            </li>
          </NavLink>
          {bottomTab}
        </React.Fragment>
      );
    });
    return data;
  };

  return <ul className="sidebar-menu list-unstyled">{allLinks()}</ul>;
}
