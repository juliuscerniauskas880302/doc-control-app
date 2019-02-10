import React, { Component } from "react";
import Axios from "axios";
import NewDocumentTypeComponent from "./NewDocumentTypeComponent";

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
    console.log("Naujas dokumento title: ", this.state.title);
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
    this.getSelectedDocTypeID();
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
      <NewDocumentTypeComponent
        onCLickAddNewDocTypeHandler={this.onCLickAddNewDocTypeHandler}
        onValueChangeHandler={this.onValueChangeHandler}
        onDeleteCLickHandler={this.onDeleteCLickHandler}
        showAllDocumentTypes={this.showAllDocumentTypes}
        onClickUpdateHandler={this.onClickUpdateHandler}
        goBack={this.goBack}
        state={this.state}
      />
    );
  }
}
