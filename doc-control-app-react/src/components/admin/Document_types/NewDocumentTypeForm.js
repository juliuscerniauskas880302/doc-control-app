import React, { Component } from "react";
import Axios from "axios";

export default class NewDocumentTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      selectedDocTypeTitle: "",
      newTitle: "",
      allDocumentTypes: []
    };
  }

  componentDidMount = () => {
    this.getAllDocumentTypes();
  };

  getAllDocumentTypes = () => {
    Axios.get("http://localhost:8081/api/doctypes")
      .then(res => {
        this.setState({ allDocumentTypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    if (event.target.name === "selectedDocTypeTitle") {
      this.setState({ newTitle: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
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

  onCLickAddNewDocTypeHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.title;
    Axios.post("http://localhost:8081/api/doctypes", title)
      .then(res => {
        this.setState({ title: "" });
        this.getAllDocumentTypes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSelectedDocTypeID = () => {
    let id = "";
    for (let i = 0; i < this.state.allDocumentTypes.length; i++) {
      if (
        this.state.allDocumentTypes[i].title === this.state.selectedDocTypeTitle
      ) {
        id = this.state.allDocumentTypes[i].id;
        break;
      }
    }
    return id;
  };

  onDeleteCLickHandler = () => {
    console.log(this.getSelectedDocTypeID());
    Axios.delete(
      "http://localhost:8081/api/doctypes/" + this.getSelectedDocTypeID()
    )
      .then(res => {
        this.setState({ newTitle: "" });
        this.getAllDocumentTypes();
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
      "http://localhost:8081/api/doctypes/" + this.getSelectedDocTypeID(),
      title
    )
      .then(res => {
        this.setState({ newTitle: "" });
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
                <form onSubmit={e => this.onCLickAddNewDocTypeHandler(e)}>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Title</span>
                    </div>
                    <input
                      onChange={event => this.onValueChangeHandler(event)}
                      value={this.state.title}
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
                    name="selectedDocTypeTitle"
                  >
                    {this.showAllDocumentTypes()}
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
