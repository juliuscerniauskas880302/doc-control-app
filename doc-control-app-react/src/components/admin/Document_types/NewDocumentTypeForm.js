import React, { Component } from "react";
import Axios from "axios";

export default class NewDocumentTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDocumentTypeTitle: "",
      selectedDocumentType: "",
      newDocumentTypeTitleToUpdate: "",
      allDocumentTypes: []
    };
  }

  componentDidMount = () => {
    this.getAllDocumentTypes();
  };

  getAllDocumentTypes = () => {
    Axios.get("http://localhost:8080/api/documentTypes")
      .then(res => {
        this.setState({ allDocumentTypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addNewGroupToTheServer = () => {
    Axios.post("http://localhost:8080/api/documentTypes", this.state.newTitle)
      .then(() => {
        this.getAllDocumentTypes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    console.log(event.target.name + " " + event.target.value);
    if (event.target.name === "selectedDocumentType") {
      this.setState({ newDocumentTypeTitleToUpdate: event.target.value });
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
      "http://localhost:8080/api/documentTypes/" +
        this.props.match.params.username,
      this.state
    )
      .then(res => {})
      .catch(err => {});
  };

  showAllDocumentTypes = () => {
    if (this.state.allDocumentTypes.length === 0) {
      return (
        <option value="" disabled>
          No available document types...
        </option>
      );
    } else {
      let docTypes = this.state.allDocumentTypes.map(t => {
        return (
          <option key={t.title} value={t.title}>
            {t.title}
          </option>
        );
      });

      return docTypes;
    }
  };

  onClickAddNewGroupHandler = () => {
    Axios.post("http://localhost:8080/api/documentTypes" + this.state.newTitle)
      .then(res => {
        this.getAllDocumentTypes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteCLickHandler = () => {
    Axios.delete(
      "http://localhost:8080/api/documentTypes" +
        this.state.selectedDocumentType
    )
      .then(res => {
        this.getAllDocumentTypes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onClickUpdateHandler = () => {
    Axios.put(
      "http://localhost:8080/api/documentTypes" +
        this.state.selectedDocumentType,
      this.newDocumentTypeTitleToUpdate
    )
      .then(res => {
        this.getAllDocumentTypes();
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
                <strong className="text-uppercase"> New Doc Type </strong>
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
                <strong className="text-uppercase"> Update Doc Type </strong>
              </h3>
              <div className="mx-1">
                <span className="input-group-text group">
                  All document types
                </span>
                <div className="input-group mb-1">
                  <select
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedDocumentType"
                  >
                    {this.showAllDocumentTypes()}
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
                      name="newDocumentTypeTitleToUpdate"
                      value={this.state.newDocumentTypeTitleToUpdate}
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
      </div>
    );
  }
}
