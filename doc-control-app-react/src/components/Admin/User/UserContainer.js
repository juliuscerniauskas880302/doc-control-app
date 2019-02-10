import React, { Component } from "react";
import UserComponent from "./UserComponent";
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
      return <h2 className="">Duomenys yra kraunami iš serverio....</h2>;
    }
    console.log(this.state.users);
    let users = this.state.users.map((user, index) => {
      let isAdmin =
        user.admin === false ? "Paprastas vartotojas" : "Administratorius";
      return (
        <UserComponent
          number={index + 1}
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
    return (
      <table className="table table-striped table-sm card-text">
        <thead>
          <tr>
            <th>#</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El. paštas</th>
            <th>Teisės</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>{users}</tbody>
      </table>
    );
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
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="text-uppercase mb-0">Visi vartotojai</h6>
                </div>
                <div className="card-body">{this.showAllUsers()}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default UserContainer;
