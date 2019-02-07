import React, { Component } from "react";
import Axios from "axios";
import "./EditGroups.css";

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
    this.getAllUserGroups();
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
          <option key={group.title} value={group.id}>
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
      let groups = this.state.allGroups
        .map(group => {
          // console.log(this.state.userGroups);
          // console.log(this.state.userGroups.includes("group.title"));

          let shouldShow = true;

          this.state.userGroups.forEach(g => {
            if (g.title === group.title) {
              shouldShow = false;
            }
          });

          if (shouldShow)
            return (
              <option key={group.title} value={group.id}>
                {group.title}
              </option>
            );
          else {
            return null;
          }
        })
        .filter(g => g !== null);
      if (groups.length === 0) {
        return (
          <option value="" disabled>
            Already in all groups...
          </option>
        );
      } else return groups;
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
    if (this.state.selectedAddGroup === "") {
      return;
    }
    let groupIdList = {
      id: []
    };
    this.state.selectedAddGroup.forEach(el => {
      groupIdList.id.push(el);
    });

    Axios.put(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/groups",
      groupIdList
    )
      .then(res => {
        console.log("should load user groups");
        this.getAllUserGroups();
      })
      .catch(err => console.log(err));
  };

  onClickRemoveGroupFromUserHandler = () => {
    console.log(this.props.match.params.username);
    if (this.state.selectedRemoveGroup === "") {
      return;
    }
    let groupIdList = {
      id: []
    };
    this.state.selectedRemoveGroup.forEach(el => {
      groupIdList.id.push(el);
    });
    Axios.delete(
      "http://localhost:8081/api/users/" +
        this.props.match.params.username +
        "/groups",
      { data: groupIdList }
    )
      .then(res => {
        this.getAllUserGroups();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <section id="content">
          <h1>Pridėti grupes</h1>
          <span className="groups">Galimos grupės</span>

          <div className="input-group">
            <select
              multiple
              className="form-control"
              size="5"
              onChange={this.onValueChangeHandler}
              name="selectedAddGroup"
            >
              {this.showAvailableGroups()}
            </select>
            <br />
            <button
              type="buton"
              className="btn btn-success"
              onClick={() => this.onClickAddGroupToUserHandler()}
            >
              Pridėti
            </button>
          </div>
          <div className="line" />
          <span className="groups">
            Vartotojo "<b>{this.state.user.username}</b>" grupės
          </span>

          <div className="input-group">
            <select
              multiple
              className="form-control"
              size="5"
              onChange={this.onValueChangeHandler}
              name="selectedRemoveGroup"
            >
              {this.showAllUserGroups()}
            </select>

            <br />
            <button
              type="buton"
              className="btn btn-danger"
              onClick={() => this.onClickRemoveGroupFromUserHandler()}
            >
              Pašalinti
            </button>
          </div>

          <br />
          <div className="input-group mb-1">
            <button
              type="buton"
              className="btn btn-warning"
              onClick={() => this.goBack()}
            >
              Grįžti atgal
            </button>
          </div>
        </section>
      </div>
    );
  }
}
