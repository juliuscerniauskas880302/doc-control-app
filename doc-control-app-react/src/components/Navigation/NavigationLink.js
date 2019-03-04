import React from "react";
import NavLink from "../../components/Utilities/Navigation/NavLink";
import ZipDownloadHandler from "../DownloadAttachments/ZipDownloadHandler";
import CsvDownloadHandler from "../DownloadAttachments/CsvDownloadHandler";
import ResponseMessage from "../Utilities/ResponseMessage";
import extractFileName from "../DownloadAttachments/ExtractFileName";
import Axios from "axios";
export default function NavigationLink(props) {
  // evepront.preventDefault();
  let allLinks = () => {
    let data = props.navigation.map((nav, index) => {
      let topTab = nav.topTab ? (
        <li className="sidebar-list-item ml-2 my-3">
          <i className={nav.topTab.icon} />
          <span>{nav.topTab.title}</span>
        </li>
      ) : null;
      let bottomTab = nav.bottomTab ? <div className="line" /> : null;
      return nav.type !== "dropdown" ? (
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
      ) : (
        <React.Fragment key={`nav-${index}`}>
          {topTab}
          <NavLink to="#" style={{ textDecoration: "none" }}>
            <li className="dropdown sidebar-list-item">
              <div
                className="sidebar-link text-muted"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className={nav.icon} />
                <span className="mx-auto">{nav.name}</span>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {/* <ResponseMessage> */}
                <p
                  className="dropdown-item text-muted"
                  onClick={event => ZipDownloadHandler(event, props)}
                >
                  Atsisiųsti bylas ZIP formatu.
                </p>
                {/* </ResponseMessage> */}
                <p
                  className="dropdown-item text-muted "
                  onClick={event => CsvDownloadHandler(event, props)}
                >
                  Atsisiųsti dokumentų sąrašą CSV formatu.
                </p>
              </div>
            </li>
          </NavLink>
          {bottomTab}
        </React.Fragment>
      );
    });
    return data;
  };
  class DownloadDropdown extends React.Component {
    zipDownloadHandler(event) {
      event.preventDefault();
      Axios({
        url: "http://localhost:8081/api/docs/download/all",
        method: "GET",
        responseType: "blob" // important
      })
        .then(response => {
          var filename = extractFileName(
            response.headers["content-disposition"]
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.log(this.props);
          // this.props.showResponseMessage("Neturite dokumentų.", "danger", 2500);
        });
    }
    render() {
      return (
        <React.Fragment key={`nav-${this.props.index}`}>
          {this.props.topTab}
          <NavLink to="#" style={{ textDecoration: "none" }}>
            <li className="dropdown sidebar-list-item">
              <div
                className="sidebar-link text-muted"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className={this.props.icon} />
                <span className="mx-auto">{this.props.name}</span>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <p
                  className="dropdown-item text-muted"
                  onClick={this.zipDownloadHandler}
                >
                  Atsisiųsti bylas ZIP formatu.
                </p>
                <p
                  className="dropdown-item text-muted "
                  onClick={CsvDownloadHandler}
                >
                  Atsisiųsti dokumentų sąrašą CSV formatu.
                </p>
              </div>
            </li>
          </NavLink>
          {this.props.bottomTab}
        </React.Fragment>
      );
    }
  }
  return <ul className="sidebar-menu list-unstyled">{allLinks()}</ul>;
}
