import React, { Component } from "react";
import Axios from "axios";

export default class NewGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      selectedGroup: "",
      newTitleToUpdate: "",
      allGroups: []
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
  };

  getAllGroups = () => {
    Axios.get("http://localhost:8080/api/groups")
      .then(res => {
        this.setState({ allGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addNewGroupToTheServer = () => {
    Axios.post("http://localhost:8080/api/groups", this.state.newTitle)
      .then(() => {
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    console.log(event.target.name + " " + event.target.value);
    if (event.target.name === "selectedGroup") {
      this.setState({ newTitleToUpdate: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    console.log("eik nx");
    this.props.history.goBack();
  };

  onSumbitHandler = event => {
    event.preventDefault();
    Axios.put(
      "http://localhost:8080/api/groups/" + this.props.match.params.username,
      this.state
    )
      .then(res => {})
      .catch(err => {});
  };

  showAllGroups = () => {
    if (this.state.allGroups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groups = this.state.allGroups.map(group => {
        return (
          <option key={group.title} value={group.title}>
            {group.title}
          </option>
        );
      });

      return groups;
    }
  };

  onClickAddNewGroupHandler = () => {
    Axios.post("http://localhost:8080/api/groups" + this.state.newTitle)
      .then(res => {
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteCLickHandler = () => {
    Axios.delete("http://localhost:8080/api/groups" + this.state.selectedGroup)
      .then(res => {
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onClickUpdateHandler = () => {
    Axios.put(
      "http://localhost:8080/api/groups" + this.state.selectedGroup,
      this.newTitleToUpdate
    )
      .then(res => {
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase"> New Group </strong>
              </h3>
              <div className="mx-1">
                <form onSubmit={e => this.onSumbitHandler(e)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Title</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="newTitle"
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1">
                    <button
                      type="buton"
                      className="btn btn-success"
                      onClick={this.onClickAddNewGroupHandler}
                    >
                      Add
                    </button>
                  </div>
                </form>

                {/*  */}
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

        {/*  */}
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase"> Update Group </strong>
              </h3>
              <div className="mx-1">
                <span className="input-group-text group">All groups</span>
                <div className="input-group mb-1">
                  <select
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedGroup"
                  >
                    {this.showAllGroups()}
                  </select>
                </div>
              </div>
              <br />
              <div className="mx-1">
                <form onSubmit={e => this.onSumbitHandler(e)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">New title</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="newTitleToUpdate"
                      value={this.state.newTitleToUpdate}
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1">
                    <button
                      type="buton"
                      className="btn btn-info"
                      onClick={() => this.onClickUpdateHandler()}
                    >
                      Update
                    </button>
                  </div>
                </form>
                <br />
                <div className="input-group mb-1">
                  <button
                    type="buton"
                    className="btn btn-danger"
                    onClick={() => this.onDeleteCLickHandler()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    );
  }
}
