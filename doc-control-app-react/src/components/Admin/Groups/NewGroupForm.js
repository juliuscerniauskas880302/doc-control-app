import React, { Component } from "react";
import Axios from "axios";
import NewGroupComponent from "./NewGroupComponent";

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
    console.log(event.target.value);
    if (event.target.name === "selectedGroupTitle") {
      this.setState({ newTitle: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  showAllGroups = () => {
    if (this.state.allGroups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    }
    let groups = this.state.allGroups.map(group => {
      return (
        <option key={group.title} value={group.title}>
          {group.title}
        </option>
      );
    });
    return groups;
  };

  onClickAddNewGroupHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.title;
    Axios.post("http://localhost:8081/api/groups", title)
      .then(res => {
        this.setState({ title: "" });
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteCLickHandler = () => {
    console.log(this.getSelectedGroupID());
    Axios.delete(
      "http://localhost:8081/api/groups/" + this.getSelectedGroupID()
    )
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
      "http://localhost:8081/api/groups/" + this.getSelectedGroupID(),
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
      <NewGroupComponent
        showGroups={this.showAllGroups()}
        onSubmitAdd={e => this.onClickAddNewGroupHandler(e)}
        onChange={e => this.onValueChangeHandler(e)}
        newTitle="title"
        newTitleValue={this.state.title}
        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
        onClickGoBack={() => this.goBack()}
        onDeleteClick={() => this.onDeleteCLickHandler()}
        onSubmitUpdate={e => this.onClickUpdateHandler(e)}
        nameForUpdate="newTitle"
        valueForUpdate={this.state.newTitle}
      />
    );
  }
}
