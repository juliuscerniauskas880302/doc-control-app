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
      username: "migle",
      selectedFiles: null,
      documentTypeTitle: "",
      documentTypes: []
    };
  }

  componentDidMount = () => {
    Axios.get("http://localhost:8081/api/doctypes")
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
    console.log(event.target.files);

    this.setState({ [event.target.name]: event.target.files });
  };

  onSubmitDocumentHandler = e => {
    e.preventDefault();
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title,
      username: "migle"
    };
    console.log(model);
    let file = new FormData();
    if (this.state.selectedFiles.length === 1) {
      file.append(
        "file",
        this.state.selectedFiles[0],
        this.state.selectedFiles[0].name
      );
      file.append("model", JSON.stringify(model));
      Axios.post("http://localhost:8081/api/docs", file, {
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
    } else {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        file.append(
          "file",
          this.state.selectedFiles[i],
          this.state.selectedFiles[i].name
        );
      }
      file.append("model", JSON.stringify(model));
<<<<<<< HEAD
      Axios.post("http://localhost:8081/api/docs", file, {
=======

      Axios.post("http://localhost:8081/api/docs/files", file, {
>>>>>>> master
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
    }
    console.log(file);
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

  extractFileName = contentDispositionValue => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  downloadHandler = () => {
    // 70a73980-02d1-4e63-a577-6e59b25c976b
    // Axios.get(
    //   "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download"
    // ).then(res => FileSaver.saveAs(res.data, "effectiveFileName"));

    Axios({
      url:
        "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download", //doc id
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      var filename = this.extractFileName(
        response.headers["content-disposition"]
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
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
                    name="documentTypeTitle"
                    type="text"
                    required
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
                    multiple
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
                    name="description"
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
            <button onClick={() => this.downloadHandler()}>Download</button>
          </div>
        </div>
      </div>
    );
  }
}
