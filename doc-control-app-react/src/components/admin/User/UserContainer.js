import React, { Component } from "react";
import User from "./User";
import Axios from "axios";

var userData = [
  {
    firstname: "Julius",
    lastname: "Cerniauskas",
    email: "hoperis@gmail.cm",
    passwrod: "123",
    username: "namekas",
    isAdmin: false
  },
  {
    firstname: "Paulius",
    lastname: "Cepulis",
    email: "namekas@gmail.cm",
    passwrod: "4568",
    username: "kamehame",
    isAdmin: true
  },
  {
    firstname: "Saulius",
    lastname: "Svkerelis",
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
    //this.setState({ users: userData });
    this.getAllUsersFromServer();
  };

  getAllUsersFromServer = () => {
    Axios.get("http://localhost:8081/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUsers = () => {
    console.log(this.state.users);
    let users = this.state.users.map(user => {
      let isAdmin = user.isAdmin === false ? "Simple user" : "Administrator";
      return (
        <User
          key={user.username}
          firstname={user.firstname}
          lastname={user.lastname}
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

    Axios.delete("http://localhost:8081/api/users/" + id)
      .then(() => this.getAllUsersFromServer())
      .catch(err => {
        console.log(err);
      });
  };

  onUpdateClickHandler = id => {
    this.props.history.push("/users/update/" + id);
  };

  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row justify-content-center border rounded py-3 mx-3">
          {this.showAllUsers()}
        </div>
      </div>
    );
  }
}

export default UserContainer;
