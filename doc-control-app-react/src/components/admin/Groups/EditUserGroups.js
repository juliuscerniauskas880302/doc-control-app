import React, { Component } from "react";
import Axios from "axios";

export default class EditUserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroups: [],
      allGroups: [],
      selectedAddGroup: "",
      selectedRemoveGroup: "",
      user: ""
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
    //this.getAllUserGroups();
    this.getUser();
  };

  getUser = () => {
    Axios.get(
      "http://localhost:8081/api/users/" + this.props.match.params.username
    )
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllUserGroups = () => {
    Axios.get(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/groups"
    )
      .then(res => {
        this.setState({ userGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllGroups = () => {
    Axios.get("http://localhost:8081/api/groups")
      .then(res => {
        this.setState({ allGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUserGroups = () => {
    if (this.state.userGroups.length === 0) {
      return (
        <option value="" disabled>
          User doens't belong to any group
        </option>
      );
    } else {
      let groups = this.state.userGroups.map(group => {
        return (
          <option key={group.title} value={group.title}>
            {group.title}
          </option>
        );
      });
      return groups;
    }
  };

  showAvailableGroups = () => {
    if (this.state.allGroups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groups = this.state.allGroups.map(group => {
        if (!this.state.userGroups.includes(group.title))
          return (
            <option key={group.title} value={group.title}>
              {group.title}
            </option>
          );
        else {
          return null;
        }
      });
      return groups;
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  onValueChangeHandler = event => {
    this.setState({
      [event.target.name]: [].slice
        .call(event.target.selectedOptions)
        .map(option => {
          return option.value;
        })
    });
  };

  onClickAddGroupToUserHandler = () => {
    Axios.put(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/groups",
      this.state.selectedAddGroup
    )
      .then(res => {
        this.getAllUserGroups();
      })
      .catch(err => console.log(err));
  };

  onClickRemoveGroupFromUserHandler = () => {
    Axios.delete(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/groups",
      this.state.selectedRemoveGroup
    )
      .then(res => {
        this.getAllUserGroups();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase"> Add groups </strong>
              </h3>
              <div className="mx-1">
                {/*  */}
                <span className="input-group-text goups">Available groups</span>
                <div className="input-group mb-1">
                  <select
                    multiple
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedAddGroup"
                  >
                    {this.showAvailableGroups()}
                  </select>
                  <div className="input-group ">
                    <button
                      type="buton"
                      className="btn btn-success"
                      onClick={() => this.onClickAddGroupToUserHandler()}
                    >
                      Add group to user
                    </button>
                  </div>
                </div>
                <br />
                {/*  */}
                <span className="input-group-text goups">
                  <h2>{this.state.user.username}</h2> &nbsp; in groups
                </span>
                <div className="input-group mb-1">
                  <select
                    multiple
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedRemoveGroup"
                  >
                    {this.showAllUserGroups()}
                  </select>
                  <div className="input-group ">
                    <button
                      type="buton"
                      className="btn btn-danger"
                      onClick={() => this.onClickRemoveGroupFromUserHandler()}
                    >
                      Remove group from user
                    </button>
                  </div>
                </div>
                <br />
                {/*  */}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
