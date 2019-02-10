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
      allGroups: [],
      showMessage: { message: "", messageType: "", show: false }
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
  };


  rerenderComponent = () => {
    this.setState({ rerender: !this.state.rerender });
  }

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
          Nėra jokių grupių...
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
        this.handleMessageInput("Nauja gruė buvo sėkmingai pridėta", "alert alert-info fixed-top text-center", 2500);
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
        this.handleMessageInput("Grupė buvo sėkmingai ištrinta", "alert alert-info fixed-top text-center", 2500);
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
        this.handleMessageInput("Grupė buvo sėkmingai atnaujinta", "alert alert-info fixed-top text-center", 2500);
        this.setState({ newTitle: "" });
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };


  handleMessageInput = (message, messageType, timeout) => {
    let data = {
      message: message,
      messageType: messageType,
      show: true
    }
    this.setState({ showMessage: data }, () => {
      let data = {
        message: "",
        messageType: "",
        show: false
      }
      setTimeout(() => { this.setState({ showMessage: data }) }, timeout);
    });
  }

  showMessage = () => {
    if (this.state.showMessage.show) {
      return (<div className={this.state.showMessage.messageType}>
        {this.state.showMessage.message}
      </div>);
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.showMessage()}
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
      </React.Fragment>
    );
  }
}
