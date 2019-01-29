import React, { Component } from "react";
import Axios from "axios";
import Select from "./Select";

export default class TypesInGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      doctypes: [],
      selectedGroup: null,
      selectedCanSend: "",
      selectedRemoveCanSend: "",
      selectedCanReview: "",
      selectedRemoveCanReview: ""
    };
  }

  getAllDocTypes = () => {
    Axios.get("http://localhost:8081/api/doctypes")
      .then(res => {
        this.setState({ doctypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllGroups = () => {
    Axios.get("http://localhost:8081/api/groups")
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getAllDocTypes();
    this.getAllGroups();
  };
  goBack = () => {
    this.props.history.goBack();
  };

  showAllGroups = () => {
    console.log(this.state.groups);
    if (this.state.groups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groupList = this.state.groups.map(g => {
        return (
          <option key={g.title} value={g.userGroupId}>
            {g.title}
          </option>
        );
      });
      return groupList;
    }
  };

  loadSelectedGroup = e => {
    Axios.get("http://localhost:8081/api/groups/" + e.target.value)
      .then(res => {
        this.setState({ selectedGroup: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  showCanReviewDocs = () => {
    let review = this.state.doctypes;
    if (review === 0) {
      return (
        <option value="" disabled>
          No available doc types...
        </option>
      );
    } else {
      let typeList = review.map(t => {
        return (
          <option key={t.title} value={t.userGroupId}>
            {t.title}
          </option>
        );
      });
      return typeList;
    }
  };
  showCanSendDocs = () => {
    let send = this.state.doctypes;
    if (send === 0) {
      return (
        <option value="" disabled>
          No available doc types...
        </option>
      );
    } else {
      let typeList = send.map(t => {
        return (
          <option key={t.title} value={t.userGroupId}>
            {t.title}
          </option>
        );
      });
      return typeList;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase">Group Types</strong>
              </h3>
              <div className="mx-1">
                <span className="input-group-text group">
                  All available groups
                </span>
                <div className="input-group mb-1">
                  <select
                    className="form-control"
                    size="5"
                    onChange={this.loadSelectedGroup}
                    name="selectedGroup"
                  >
                    {this.showAllGroups()}
                  </select>
                </div>
                <br />
                <div className="row justify-content-center text-center">
                  <div className="col">
                    <Select
                      buttonTitle="Add |send|"
                      buttonType="btn btn-success"
                      title="Send types"
                      options={this.showCanReviewDocs()}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                    <Select
                      buttonTitle="Remove |send|"
                      buttonType="btn btn-danger"
                      title="Can Send types"
                      options={<option>Send</option>}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                  </div>
                  <div className="col">
                    <Select
                      buttonTitle="Add |review|"
                      buttonType="btn btn-success"
                      title="Review types"
                      options={this.showCanSendDocs()}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                    <Select
                      buttonTitle="Remove |review|"
                      buttonType="btn btn-danger"
                      title="Can review"
                      options={<option>Review</option>}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                    <br />
                  </div>
                </div>
                <br />
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
