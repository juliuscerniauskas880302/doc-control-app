import React, { Component } from "react";
import User from "./User";
import Axios from "axios";

var userData = [
  {
    firstName: "Julius",
    lastName: "Cerniauskas",
    email: "hoperis@gmail.cm",
    passwrod: "123",
    username: "namekas",
    isAdmin: false
  },
  {
    firstName: "Paulius",
    lastName: "Cepulis",
    email: "namekas@gmail.cm",
    passwrod: "4568",
    username: "kamehame",
    isAdmin: true
  },
  {
    firstName: "Saulius",
    lastName: "Svkerelis",
    email: "ssnelis@gmail.cm",
    passwrod: "123456789",
    username: "svierchas",
    isAdmin: false
  }
];

export class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount = () => {
    this.setState({ users: userData });
    //this.getAllUsersFromServer();
  };

  getAllUsersFromServer = () => {
    Axios.get("http://localhost:8080/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUsers = () => {
    let users = this.state.users.map(user => {
      let isAdmin = user.isAdmin === false ? "Simple user" : "Administrator";
      return (
        <User
          key={user.username}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          isAdmin={isAdmin}
          delete={() => this.onDeleteClickHandler(user.username)}
          update={() => this.onUpdateClickHandler(user.username)}
        />
      );
    });
    return users;
  };

  onDeleteClickHandler = id => {
    for (var i = userData.length - 1; i >= 0; i--) {
      if (userData[i].username === id) {
        userData.splice(i, 1);
      }
    }
    this.setState({ users: userData });

    Axios.delete("http://localhost:8080/api/users/" + id)
      .then(() => this.getAllUsersFromServer())
      .catch(err => {
        console.log(err);
      });
  };

  onUpdateClickHandler = id => {
    //todo: update logic here
  };

  render() {
    return (
      <div className="container">
        <div className="row">{this.showAllUsers()}</div>
      </div>
    );
  }
}

export default UserContainer;
