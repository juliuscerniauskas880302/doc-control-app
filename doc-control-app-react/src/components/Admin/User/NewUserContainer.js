import React, { Component } from "react";
import Axios from "axios";
import NewUserComponent from "./NewUserComponent";

export default class NewUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      isAdmin: true,
      showMessage: { message: "", messageType: "", show: false }
    };
  }

  onValueChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let firstname = this.capitalizeFirstLetter(this.state.firstname);
    let lastname = this.capitalizeFirstLetter(this.state.lastname);
    let username = this.state.username.toLocaleLowerCase();

    this.setState({
      firstname: firstname,
      lastname: lastname,
      username: username,
      isAdmin: JSON.parse(this.state.isAdmin)
    });
    console.log("Esama busena", this.state);
    Axios.post("http://localhost:8081/api/users", this.state)
      .then(res => {
        console.log("New user added");
        this.props.history.push("/");
      })
      .catch(err => {
        this.handleMessageInput(
          err.response.data.message,
          "alert alert-danger fixed-top text-center",
          2500
        );
        console.log("Grizo err:", err.response.data);
      });
  };

  capitalizeFirstLetter = string => {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleMessageInput = (message, messageType, timeout) => {
    let data = {
      message: message,
      messageType: messageType,
      show: true
    };
    this.setState({ showMessage: data }, () => {
      let data = {
        message: "",
        messageType: "",
        show: false
      };
      setTimeout(() => {
        this.setState({ showMessage: data });
      }, timeout);
    });
  };

  showMessage = () => {
    if (this.state.showMessage.show) {
      return (
        <div className={this.state.showMessage.messageType}>
          {this.state.showMessage.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.showMessage()}
        <NewUserComponent
          onSubmit={this.onSubmitHandler}
          onChange={this.onValueChangeHandler}
          namePattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
          namePatternTitle="Please enter only letters"
          usernamePattern=""
          usernamePatternTitle=""
          emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          emailPatternTitle=""
          passwordPattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          passwordPatternTitle="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
      </React.Fragment>
    );
  }
}
