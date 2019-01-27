import React, { Component } from "react";
import "./NewDocumentForm.css";
import Axios from "axios";

export default class NewDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      documentType: "",
      selectedFiles: null,
      selectedDocumentType: "",
      documentTypes: []
    };
  }

  componentDidMount = () => {
    Axios.get("http://localhost:8081/api/documentTypes")
      .then(res => {
        this.setState({ documentTypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFileSelectHandler = event => {
    console.log(event.target.files[0]);

    this.setState({ [event.target.name]: event.target.files[0] });
  };

  onSubmitDocumentHandler = e => {
    e.preventDefault();
    let file = new FormData();
    file.append(
      "file",
      this.state.selectedFiles,
      this.state.selectedFiles.name
    );
    Axios.post("http://localhost:8081/api/files/upload", file, {
      onUploadProgress: progressEvent => {
        console.log(
          "Upload progress: " +
            (progressEvent.loaded / progressEvent.total) * 100 +
            "%"
        );
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  showAvailableDocumentTypes = () => {
    if (this.state.documentTypes.length === 0) {
      return (
        <option value="" disabled>
          No available document types
        </option>
      );
    }

    let allTypes = this.state.documentTypes.map(type => {
      return (
        <option key={type.title} value={type.title}>
          {type.title}
        </option>
      );
    });
    return allTypes;
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <br />
            <form
              className="form-horizontal"
              onSubmit={event => this.onSubmitDocumentHandler(event)}
            >
              <legend>Create new document form</legend>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  htmlFor="Document title"
                >
                  Title
                </label>
                <div className="input-group mb-1">
                  <div className="input-group">
                    <input
                      onChange={this.onValueChangeHandler}
                      id="Title (Document title)"
                      name="title"
                      type="text"
                      placeholder="Title (Document title)"
                      className="form-control input-md"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="Upload file">
                  Select type
                </label>
                <div className="input-group mb-1">
                  <select
                    size="5"
                    onChange={this.onValueChangeHandler}
                    id="select type"
                    name="selectedDocumentType"
                    type="text"
                    // required
                  >
                    {this.showAvailableDocumentTypes()}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="Upload file">
                  Upload file
                </label>
                <div className="input-group mb-1">
                  <input
                    onChange={this.onFileSelectHandler}
                    id="Upload file"
                    name="selectedFiles"
                    className="input-file"
                    type="file"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  htmlFor="Overview (max 200 words)"
                >
                  Description (max 200 words)
                </label>
                <div className="input-group mb-1">
                  <textarea
                    onChange={this.onValueChangeHandler}
                    className="form-control"
                    rows="10"
                    id="Description (max 200 words)"
                    name="description (max 200 words)"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" />
                <div className="col-md-4">
                  <button className="btn btn-success" type="buton">
                    <span className="fas fa-thumbs-up" /> Submit
                  </button>
                  <button className="btn btn-danger" type="reset">
                    <span className="fas fa-broom" /> Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
