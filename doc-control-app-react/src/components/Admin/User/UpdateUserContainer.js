import React, { Component } from "react";
import Axios from "axios";
import "./NewUser.css";
import NewPasswordComponent from "./NewPasswordComponent";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
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
      this.state.password
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
      <div className="container my-5">
        <div className="row justify-content-center">
          {/* //////////////////////User Info Update table///////////////////////////////////// */}

          <section id="content">
            <h1>Update user</h1>
            <div className="mx-1">
              <form onSubmit={event => this.onUpdateClickHandler(event)}>
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <h3>First Name</h3>
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
                    <h3>Last Name</h3>
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
                    <h3>Username</h3>
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
                    <h3>Email</h3>
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
                  <input type="submit" value="Save changes" />
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
          </section>
        </div>

        <NewPasswordComponent
          onSubmit={this.onUpdatePasswordHandler}
          onChange={this.onValueChangeHandler}
          onClick={this.goBack}
          name="pasword"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
      </div>
    );
  }
}
