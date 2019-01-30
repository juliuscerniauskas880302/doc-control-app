import React, { Component } from "react";
import Axios from "axios";
import Select from "./Select";

export default class TypesInGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      doctypes: [],
      submission: [],
      review: [],
      selectedType: null,
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

  showAllDocTypes = () => {
    if (this.state.doctypes.length === 0) {
      return (
        <option value="" disabled>
          No available doc types...
        </option>
      );
    } else {
      let docTypeList = this.state.doctypes.map(dt => {
        return (
          <option key={dt.title} value={dt.id}>
            {dt.title}
          </option>
        );
      });
      return docTypeList;
    }
  };

  loadSelectedDocType = e => {
    this.setState({ selectedType: e.target.value });

    Axios.get(
      "http://localhost:8081/api/doctypes/" + e.target.value + "/groups/review"
    )
      .then(res => {
        this.setState({ review: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
    Axios.get(
      "http://localhost:8081/api/doctypes/" +
        e.target.value +
        "/groups/submission"
    )
      .then(res => {
        this.setState({ submission: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  reviewGroups = () => {
    let review = this.state.review;
    if (review === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groupList = review.map(g => {
        return (
          <option key={g.title} value={g.id}>
            {g.title}
          </option>
        );
      });
      return groupList;
    }
  };
  submissionGroups = () => {
    let submmit = this.state.submission;
    if (submmit === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groupList = submmit.map(g => {
        return (
          <option key={g.title} value={g.id}>
            {g.title}
          </option>
        );
      });
      return groupList;
    }
  };

  availableReviewGroups = () => {
    if (this.state.selectedType === null) {
      return (
        <option value="" disabled>
          No selection made...
        </option>
      );
    }
    if (this.state.groups.length === 0) {
      return (
        <option value="" disabled>
          No available doc types...
        </option>
      );
    } else {
      let doctypeList = this.state.groups
        .map(type => {
          let shouldShow = true;
          this.state.review.forEach(t => {
            if (t.title === type.title) {
              shouldShow = false;
            }
          });

          if (shouldShow)
            return (
              <option key={type.title} value={type.id}>
                {type.title}
              </option>
            );
          else {
            return null;
          }
        })
        .filter(t => t !== null);
      if (doctypeList.length === 0) {
        return (
          <option value="" disabled>
            Already have all types...
          </option>
        );
      } else return doctypeList;
    }
  };

  availableSubmmitGroups = () => {
    if (this.state.selectedType === null) {
      return (
        <option value="" disabled>
          No selection made...
        </option>
      );
    }
    if (this.state.groups.length === 0) {
      return (
        <option value="" disabled>
          No available doc types...
        </option>
      );
    } else {
      let doctypeList = this.state.groups
        .map(type => {
          let shouldShow = true;
          this.state.submission.forEach(t => {
            if (t.title === type.title) {
              shouldShow = false;
            }
          });

          if (shouldShow)
            return (
              <option key={type.title} value={type.id}>
                {type.title}
              </option>
            );
          else {
            return null;
          }
        })
        .filter(t => t !== null);
      if (doctypeList.length === 0) {
        return (
          <option value="" disabled>
            Already have all types...
          </option>
        );
      } else return doctypeList;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase">Doc Types</strong>
              </h3>
              <div className="mx-1">
                <span className="input-group-text group">
                  Available doc types
                </span>
                <div className="input-group mb-1">
                  <select
                    className="form-control"
                    size="5"
                    onChange={this.loadSelectedDocType}
                    name="selectedType"
                  >
                    {this.showAllDocTypes()}
                  </select>
                </div>
                {/* //////////////////////////////////////////////////////////////////// */}
                <br />
                <div className="row justify-content-center text-center">
                  <div className="col">
                    <Select
                      buttonTitle="Add |submmit|"
                      buttonType="btn btn-success"
                      title="For submmit"
                      options={this.availableReviewGroups()}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                    <Select
                      buttonTitle="Remove |submmit|"
                      buttonType="btn btn-danger"
                      title="Submmit"
                      options={this.reviewGroups()}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                  </div>
                  <div className="col">
                    <Select
                      buttonTitle="Add |review|"
                      buttonType="btn btn-success"
                      title="For review"
                      options={this.availableSubmmitGroups()}
                      onChange={this.onValueChangeHandler}
                      onClick={() => this.onClickAddGroupToUserHandler()}
                      name="selectedAddGroup"
                    />
                    <Select
                      buttonTitle="Remove |review|"
                      buttonType="btn btn-danger"
                      title="Review"
                      options={this.submissionGroups()}
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
