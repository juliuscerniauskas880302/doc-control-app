import React, { Component } from "react";
import Axios from "axios";
import "./NewUserForm2.css";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      passwrod: "",
      username: "",
      isAdmin: false
    };
  }

  componentDidMount = () => {
    Axios.get(
      "http://localhost:8081/api/users/" + this.props.match.params.username
    )
      .then(res => {
        this.setState(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onUpdateClickHandler = event => {
    console.log(event);
    event.preventDefault();
    Axios.put(
      "http://localhost:8081/api/users/" + this.props.match.params.username,
      this.state
    )
      .then(res => {
        this.props.history.push("/users");
      })
      .catch(err => {});
  };

  onUpdatePasswordHandler = event => {
    event.preventDefault();
    Axios.put(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/changepassword",
      this.state.passwrod
    )
      .then(res => {
        console.log("Password has been changed");
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };
  goEditGroups = () => {
    this.props.history.push(
      "/users/groups/" + this.props.match.params.username
    );
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          {/* //////////////////////User Info Update table///////////////////////////////////// */}
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase"> Update user </strong>
              </h3>
              <div className="mx-1">
                <form onSubmit={event => this.onUpdateClickHandler(event)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">First Name</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="firstname"
                      value={this.state.firstname}
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Last Name</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="lastname"
                      value={this.state.lastname}
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1 ">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Username</span>
                    </div>
                    <input
                      disabled
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="username"
                      value={this.state.username}
                      className="disabled form-control"
                    />
                  </div>

                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@Email</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="email"
                      name="email"
                      value={this.state.email}
                      className="form-control"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                  <br />
                  <div className="input-group mb-1">
                    <button type="buton" className="btn btn-success">
                      Save changes
                    </button>
                  </div>
                </form>
                <div className="input-group mb-1">
                  <button
                    type="buton"
                    className="btn btn-info"
                    onClick={() => this.goEditGroups()}
                  >
                    Edit groups
                  </button>
                </div>
                <br />
                <div className="input-group mb-1">
                  <button
                    type="buton"
                    className="btn btn-warning"
                    onClick={() => this.goBack()}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end of row */}
        </div>
        <div className="row justify-content-center">
          {/* Passwrod change table begin */}
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase"> Password</strong>
              </h3>
              <div className="mx-1">
                <form onSubmit={event => this.onUpdatePasswordHandler(event)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">New Passwrod</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="password"
                      name="password"
                      className="form-control"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                    />
                  </div>

                  <br />
                  <div className="input-group mb-1">
                    <button type="buton" className="btn btn-success">
                      Save changes
                    </button>
                  </div>
                </form>
                <br />
                <div className="input-group mb-1">
                  <button
                    type="buton"
                    className="btn btn-warning"
                    onClick={() => this.goBack()}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
            {/* Password change end */}
          </div>
          {/* end of row */}
        </div>
        {/* end of container */}
      </div>
    );
  }
}
