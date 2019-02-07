import React, { Component } from "react";
import Axios from "axios";
// import "./NewUser.css";
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
      <div className="container">
        {/* //////////////////////User Info Update table///////////////////////////////////// */}
        <section id="content">
          <h1>Vartotojo atnaujinimas</h1>
          <form onSubmit={event => this.onUpdateClickHandler(event)}>
            <h3>Vardas</h3>
            <div>
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
            <h3>Pavardė</h3>
            <div>
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
            <h3>Vartotojo vardas</h3>
            <div>
              <input
                disabled
                onChange={event => this.onValueChangeHandler(event)}
                type="text"
                name="username"
                value={this.state.username}
                className="disabled form-control"
              />
            </div>

            <h3>El. paštas</h3>
            <div>
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
            <button type="submit" className="btn btn-success">
              Išsaugoti
            </button>
          </form>

          <button
            type="buton"
            className="btn btn-info my-2"
            onClick={() => this.goEditGroups()}
          >
            Redaguoti grupes
          </button>

          <br />

          <button
            type="buton"
            className="btn btn-warning"
            onClick={() => this.goBack()}
          >
            Grįžti atgal
          </button>
        </section>
        <div className="line" />
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
