import React, { Component } from "react";
import UserComponent from "./UserComponent";
import Axios from "axios";
import { Pagination } from "semantic-ui-react";
export class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalUsers: 0,
      recordsPerPage: 15,
      activePage: 1
    };
  }

  componentDidMount = () => {
    //this.setState({ users: userData });
    //this.getUserCount();
    this.getAllUsersFromServer(
      this.state.activePage,
      this.state.recordsPerPage
    );
  };

  getUserCount = () => {
    Axios.get("http://localhost:8081/api/users/total")
      .then(res => {
        this.setState({ totalUsers: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // "http://localhost:8081/api/users/" + (pageNumber - 1) + "/" + pageLimit
  getAllUsersFromServer = (pageNumber, pageLimit) => {
    Axios.get("http://localhost:8081/api/users/", {
      params: { pageNumber: pageNumber - 1, pageLimit: pageLimit }
    })
      .then(res => {
        this.setState({
          users: res.data.userList,
          totalUsers: res.data.totalElements
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUsers = () => {
    if (this.state.users.length === 0) {
      return <h2 className="">Duomenys yra kraunami iš serverio....</h2>;
    }
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

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage }, () => {
      this.getAllUsersFromServer(activePage, this.state.recordsPerPage);
    });
  };

  onValueChangeHandler = event => {
    this.setState(
      { [event.target.name]: event.target.value, activePage: 1 },
      () => {
        this.getAllUsersFromServer(
          this.state.activePage,
          this.state.recordsPerPage
        );
      }
    );
  };

  render() {
    const { totalUsers, recordsPerPage, activePage } = this.state;
    let pageCount = Math.ceil(totalUsers / recordsPerPage);

    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6
                    className="text-uppercase mb-0"
                    onClick={() => this.getUserCount()}
                  >
                    Visi vartotojai
                  </h6>
                </div>

                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <h2>
                      <strong className="text-secondary">{totalUsers}</strong>{" "}
                      Vartotojai
                    </h2>
                    {activePage && (
                      <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                        Puslapis{" "}
                        <span className="font-weight-bold">{activePage}</span> /{" "}
                        <span className="font-weight-bold">{pageCount}</span>
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      activePage={activePage}
                      onPageChange={this.handlePaginationChange}
                      totalPages={pageCount}
                    />
                  </div>
                </div>

                <div>
                  <div className="px-5">
                    <select
                      class="ui compact selection dropdown"
                      name="recordsPerPage"
                      onChange={event => this.onValueChangeHandler(event)}
                    >
                      <option value={15}>15</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <div class="ui tag label label">Rodyti per puslapį</div>
                  </div>
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
