import React, { Component } from "react";
import User from "./User";
import Axios from "axios";
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
    if (this.state.users.length === 0) {
      return <h2 className="">No users available at the moment</h2>;
    }
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
