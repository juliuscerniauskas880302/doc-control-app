import React, { Component } from "react";
import "./NewUserForm.css";
import Axios from "axios";

export default class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      passwrod: "",
      username: "",
      isAdmin: false
    };
  }

  onValueChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSumbitHandler = e => {
    e.preventDefault();
    let firstName = this.capitalizeFirstLetter(this.state.firstName);
    let lastName = this.capitalizeFirstLetter(this.state.lastName);
    let username = this.state.username.toLocaleLowerCase();

    this.setState({
      firstName: firstName,
      lastName: lastName,
      username: username
    });
    Axios.post("http://localhost:8080/api/users", this.state)
      .then(res => {
        console.log("New user added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  capitalizeFirstLetter = string => {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-md-6">
            <form onSubmit={e => this.onSumbitHandler(e)}>
              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">First Name</span>
                </div>
                <input
                  onChange={event => this.onValueChangeHandler(event)}
                  type="text"
                  name="firstName"
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
                  name="lastName"
                  className="form-control"
                  pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                  required
                />
              </div>

              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">Username</span>
                </div>
                <input
                  onChange={event => this.onValueChangeHandler(event)}
                  type="text"
                  name="username"
                  className="form-control"
                  required
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
                  className="form-control"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                />
              </div>

              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">Passwrod</span>
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

              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">Admin</span>
                </div>
                <select
                  onChange={event => this.onValueChangeHandler(event)}
                  type="email"
                  name="email"
                  className="form-control"
                  required
                >
                  <option defaultValue="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <br />
              <button type="buton" className="btn btn-large submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
