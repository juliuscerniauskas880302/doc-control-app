import React, { Component } from "react";
import Axios from "axios";
// import "./NewUser.css";
import NewPasswordComponent from "./NewPasswordComponent";
import ButtonComponent from "../../Utilities/ButtonComponent";

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
        this.props.history.push("/");
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
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="py-5">
            <div className="col-lg-12 mb-5">
              <div className="card">
                <div className="card-header">
                  <h3 className="h6 text-uppercase mb-0">
                    Vartotojo atnaujinimas
                  </h3>
                </div>
                <div className="card-body">
                  <p>Pakeiskite norimus laukus.</p>
                  <form
                    className="form-horizontal"
                    onSubmit={event => this.onUpdateClickHandler(event)}
                  >
                    <div className="form-group row">
                      <label className="col-md-3 form-control-label">
                        Vardas
                      </label>
                      <div className="col-md-9">
                        <input
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="firstname"
                          value={this.state.firstname}
                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                          required
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Pavardė
                      </label>
                      <div className="col-md-9">
                        <input
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="lastname"
                          value={this.state.lastname}
                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                          required
                          className="form-control form-control-warning"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Vartotojo vardas
                      </label>
                      <div className="col-md-9">
                        <input
                          disabled
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="username"
                          value={this.state.username}
                          className="disabled form-control form-control-warning"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        El. paštas
                      </label>
                      <div className="col-md-9">
                        <input
                          onChange={event => this.onValueChangeHandler(event)}
                          type="email"
                          name="email"
                          value={this.state.email}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          required
                          className="form-control form-control-warning"
                        />
                        <small className="form-text text-muted ml-3">
                          pvz@pvz.lt
                        </small>
                      </div>
                    </div>

                    <ButtonComponent
                      type="submit"
                      value="Pakeisti"
                      className="btn submitButton"
                    />
                  </form>
                  <ButtonComponent
                    onClick={() => this.goEditGroups()}
                    type="submit"
                    value="Pridėti grupes"
                    className="btn submitButtonAlt"
                  />

                  <ButtonComponent
                    onClick={() => this.goBack()}
                    type="submit"
                    value="Grįžti atgal"
                    className="btn goBackButton"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 mb-5">
              <NewPasswordComponent
                onSubmit={this.onUpdatePasswordHandler}
                onChange={this.onValueChangeHandler}
                goBack={this.goBack}
                name="pasword"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
