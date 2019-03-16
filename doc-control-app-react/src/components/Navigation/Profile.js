import React from "react";
import Axios from "axios";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroupsData: []
    };
  }

  componentDidMount = () => {
    Axios.get("/api/users/groupDetails")
      .then(res => {
        console.log(res.data);
        this.setState({ userGroupsData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  buildData = () => {
    let data = this.state.userGroupsData.map((userData, index) => {
      return (
        <div className="item" key={`item-${index}`}>
          <i className="users icon violet" />
          <div className="content">
            <div className="header">{userData.groupTitle}</div>
            <div className="description">Grupė</div>
            <div className="list">
              <div className="item">
                <i className="file word outline purple icon" />
                <div className="content">
                  <div className="header">Dokumentų kūrimas</div>
                  <div className="list">
                    {/*  */}
                    {userData.submitDocTypes.map((type, index) => {
                      return (
                        <div className="item" key={`sub-${index}`}>
                          <i className="edit outline blue  icon" />
                          <div className="content">
                            <div className="header">{type}</div>
                            <div className="description" />
                          </div>
                        </div>
                      );
                    })}
                    {/*  */}
                  </div>
                </div>
              </div>
              <div className="item">
                <i className="file word outline purple icon" />
                <div className="content">
                  <div className="header">Dokumentų patvirtinimas</div>
                  <div className="list">
                    {/*  */}
                    {userData.reviewDocTypes.map((type, index) => {
                      return (
                        <div className="item" key={`rev-${index}`}>
                          <i className="calendar check outline blue icon" />
                          <div className="content">
                            <div className="header">{type}</div>
                            <div className="description" />
                          </div>
                        </div>
                      );
                    })}
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
            <div className="line" />
          </div>
        </div>
      );
    });
    return data;
  };

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userDetails = {
      username: "Unknown",
      firstname: "Unknown",
      lastname: "Unknown",
      email: "Unknown",
      admin: false
    };
    if (user) {
      userDetails = user;
    }
    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12 mb-5">
              <div className="card">
                <div className="card-header">
                  <h3 className="h6 text-uppercase mb-0">Vartotojo profilis</h3>
                </div>
                <div className="card-body">
                  <div className="form-group row d-flex justify-content-center ">
                    <div className="ui card" style={{ width: "200px" }}>
                      <div className="image">
                        <img
                          src={"/image/profile.png"}
                          height="50px"
                          alt="profile"
                        />
                      </div>
                      <div className="content">
                        <div className="header">{`${userDetails.firstname} ${
                          userDetails.lastname
                        }`}</div>
                        <div className="meta">
                          <span className="date">
                            {userDetails.admin
                              ? "Administratorius"
                              : "Paprastas vartotojas"}
                          </span>
                        </div>
                      </div>
                      <div className="extra content pt-5">
                        <div className="ui list">{this.buildData()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
