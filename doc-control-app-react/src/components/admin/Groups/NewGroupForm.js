import React, { Component } from "react";
import Axios from "axios";

export default class NewGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      selectedGroupTitle: "",
      newTitle: "",
      allGroups: []
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
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

  addNewGroupToTheServer = () => {
    Axios.post("http://localhost:8081/api/groups", this.state.title)
      .then(() => {
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSelectedGroupID = () => {
    let id = "";
    for (let i = 0; i < this.state.allGroups.length; i++) {
      if (this.state.allGroups[i].title === this.state.selectedGroupTitle) {
        id = this.state.allGroups[i].id;
        break;
      }
    }
    return id;
  };

  onValueChangeHandler = event => {
    console.log(event.target.name + " " + event.target.value);
    if (event.target.name === "selectedGroupTitle") {
      this.setState({ newTitle: event.target.value });
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

  onClickAddNewGroupHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.title;
    Axios.post("http://localhost:8081/api/groups" + title)
      .then(res => {
        this.setState({ title: "" });
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteCLickHandler = () => {
    Axios.delete("http://localhost:8081/api/groups" + this.getSelectedGroupID())
      .then(res => {
        this.setState({ newTitle: "" });
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onClickUpdateHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.newTitle;
    Axios.put(
      "http://localhost:8081/api/groups" + this.getSelectedGroupID(),
      title
    )
      .then(res => {
        this.setState({ newTitle: "" });
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
                <form onSubmit={e => this.onClickAddNewGroupHandler(e)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Title</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="title"
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1">
                    <button type="buton" className="btn btn-success">
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
                    value={this.state.selectedGroupTitle}
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedGroupTitle"
                  >
                    {this.showAllGroups()}
                  </select>
                </div>
              </div>
              <br />
              <div className="mx-1">
                <form onSubmit={e => this.onClickUpdateHandler(e)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">New title</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      type="text"
                      name="newTitle"
                      value={this.state.newTitle}
                      className="form-control"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>

                  <div className="input-group mb-1">
                    <button type="buton" className="btn btn-info">
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
      </div>
    );
  }
}
