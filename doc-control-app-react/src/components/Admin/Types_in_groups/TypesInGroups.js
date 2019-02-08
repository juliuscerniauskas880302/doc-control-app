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
      selectedAddReviewGroups: [],
      selectedRemoveReviewGroups: [],
      selectedAddSubmissionGroups: [],
      selectedRemoveSubmissionGroups: []
    };
  }
  //Get all document types from server
  getAllDocTypes = () => {
    Axios.get("http://localhost:8081/api/doctypes")
      .then(res => {
        this.setState({ doctypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Get all groups from server
  getAllGroups = () => {
    Axios.get("http://localhost:8081/api/groups")
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Load data on component mount
  componentDidMount = () => {
    this.getAllDocTypes();
    this.getAllGroups();
  };
  //Method to go back in history
  goBack = () => {
    this.props.history.goBack();
  };
  //Show all document types received from server
  showAllDocTypes = () => {
    if (this.state.doctypes.length === 0) {
      return (
        <option value="" disabled>
          No available document types...
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
  //Load document's type "review" and "submmit" groups
  loadReviewGroups(type) {
    Axios.get("http://localhost:8081/api/doctypes/" + type + "/groups/review")
      .then(res => {
        this.setState({ review: res.data });
      })
      .catch(err => console.log(err));
  }

  loadSubmmisionGroups(type) {
    Axios.get(
      "http://localhost:8081/api/doctypes/" + type + "/groups/submission"
    )
      .then(res => {
        this.setState({ submission: res.data });
      })
      .catch(err => console.log(err));
  }

  onSelectTypeHandler = e => {
    this.setState({ selectedType: e.target.value });
    this.loadReviewGroups(e.target.value);
    this.loadSubmmisionGroups(e.target.value);
  };
  //Show asinged groups to document type
  inGroups = groups => {
    if (groups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groupList = groups.map(g => {
        return (
          <option key={g.title} value={g.id}>
            {g.title}
          </option>
        );
      });
      return groupList;
    }
  };

  onSelectHandler = e => {
    this.setState({
      [e.target.name]: [].slice.call(e.target.selectedOptions).map(option => {
        return option.value;
      })
    });
  };

  //Show not asinged and available groups to document type
  availableGroups = groupType => {
    if (this.state.selectedType === null) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    }
    if (this.state.groups.length === 0) {
      return (
        <option value="" disabled>
          No available options...
        </option>
      );
    } else {
      let doctypeList = this.state.groups
        .map(type => {
          let shouldShow = true;
          groupType.forEach(t => {
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

  onClickAddGroups = (selectedGroups, groupType) => {
    if (selectedGroups.length === 0) {
      return;
    }
    let groupIdList = {
      id: []
    };
    selectedGroups.forEach(el => {
      groupIdList.id.push(el);
    });

    Axios.post(
      "http://localhost:8081/api/doctypes/" +
        this.state.selectedType +
        "/groups/" +
        groupType,
      groupIdList
    )
      .then(res => {
        if (groupType === "review") {
          this.setState({ selectedAddReviewGroups: "" });
          this.loadReviewGroups(this.state.selectedType);
        } else {
          this.setState({ selectedAddSubmissionGroups: "" });
          this.loadSubmmisionGroups(this.state.selectedType);
        }
      })
      .catch(err => console.log(err));
  };

  onClickRemoveGroups = (selectedGroups, groupType) => {
    if (selectedGroups.length === 0) {
      return;
    }
    let groupIdList = {
      id: []
    };
    selectedGroups.forEach(el => {
      groupIdList.id.push(el);
    });
    Axios.delete(
      "http://localhost:8081/api/doctypes/" +
        this.state.selectedType +
        "/groups/" +
        groupType,
      { data: groupIdList }
    )
      .then(res => {
        if (groupType === "review") {
          this.setState({ selectedRemoveReviewGroups: "" });
          this.loadReviewGroups(this.state.selectedType);
        } else {
          this.setState({ selectedRemoveSubmissionGroups: "" });
          this.loadSubmmisionGroups(this.state.selectedType);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <section id="content">
          <h1>Dokumento tipas</h1>
          <span className="groups">Visi dokumentų tipai</span>
          <div className="input-group mb-1">
            <select
              className="form-control"
              size="5"
              onChange={this.onSelectTypeHandler}
              name="selectedType"
            >
              {this.showAllDocTypes()}
            </select>
          </div>
          {/* //////////////////////////////////////////////////////////////////// */}
          <br />
          <h1>Grupės</h1>
          <div className="row justify-content-center text-center">
            <div className="col">
              <Select
                buttonTitle="Pridėti"
                buttonStyle="btn btn-success"
                title="Dokumentų siuntimui"
                options={this.availableGroups(this.state.submission)}
                onChange={this.onSelectHandler}
                onClick={() =>
                  this.onClickAddGroups(
                    this.state.selectedAddSubmissionGroups,
                    "submission"
                  )
                }
                name="selectedAddSubmissionGroups"
              />
              <Select
                buttonTitle="Pašalinti"
                buttonStyle="btn btn-danger"
                title="Pridėtos grupės"
                options={this.inGroups(this.state.submission)}
                onChange={this.onSelectHandler}
                onClick={() =>
                  this.onClickRemoveGroups(
                    this.state.selectedRemoveSubmissionGroups,
                    "submission"
                  )
                }
                name="selectedRemoveSubmissionGroups"
              />
            </div>
            <div className="col">
              <Select
                buttonTitle="Pridėti"
                buttonStyle="btn btn-success"
                title="Dokumentų peržiurai"
                options={this.availableGroups(this.state.review)}
                onChange={this.onSelectHandler}
                onClick={() =>
                  this.onClickAddGroups(
                    this.state.selectedAddReviewGroups,
                    "review"
                  )
                }
                name="selectedAddReviewGroups"
              />
              <Select
                buttonTitle="Pašalinti"
                buttonStyle="btn btn-danger"
                title="Pridėtos grupės"
                options={this.inGroups(this.state.review)}
                onChange={this.onSelectHandler}
                onClick={() =>
                  this.onClickRemoveGroups(
                    this.state.selectedRemoveReviewGroups,
                    "review"
                  )
                }
                name="selectedRemoveReviewGroups"
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
              Grįžti atgal
            </button>
          </div>
        </section>
      </div>
    );
  }
}
