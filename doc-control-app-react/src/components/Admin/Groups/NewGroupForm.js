import React, { Component } from "react";
import Axios from "axios";
import NewGroupComponent from "./NewGroupComponent";
import EditGroupUsers from "./EditGroupUsers";
import ButtonComponent from "../../Utilities/ButtonComponent";

export default class NewGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      selectedGroupTitle: "",
      newTitle: "",
      allGroups: [],
      allUsers: [],
      groupUsers: [],
      selectedGroupForAddUsers: null,
      showMessage: { message: "", messageType: "", show: false }
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
    this.getAllUsers();
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

  getAllUsers = () => {
    Axios.get("http://localhost:8081/api/users").then(res => {
      this.setState({ allUsers: res.data.userList });
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
          Nėra jokių grupių...
        </option>
      );
    }
    let groups = this.state.allGroups.map(group => {
      return (
        <option key={group.title} id={group.id} value={group.title}>
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
        this.handleMessageInput(
          "Nauja grupė buvo sėkmingai pridėta",
          "alert alert-info fixed-top text-center",
          2500
        );
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
        this.handleMessageInput(
          "Grupė buvo sėkmingai ištrinta",
          "alert alert-info fixed-top text-center",
          2500
        );
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
        this.handleMessageInput(
          "Grupė buvo sėkmingai atnaujinta",
          "alert alert-info fixed-top text-center",
          2500
        );
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
    };
    this.setState({ showMessage: data }, () => {
      let data = {
        message: "",
        messageType: "",
        show: false
      };
      setTimeout(() => {
        this.setState({ showMessage: data });
      }, timeout);
    });
  };

  showMessage = () => {
    if (this.state.showMessage.show) {
      return (
        <div className={this.state.showMessage.messageType}>
          {this.state.showMessage.message}
        </div>
      );
    } else {
      return null;
    }
  };

  onSelectedGroupForAddUsersHandler = e => {
    console.log("Target value", e.target.value);
    this.state.allGroups.forEach(element => {
      if (element.title === e.target.value) {
        this.setState({ selectedGroupForAddUsers: element.id }, () => {
          this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
        });
      }
    });
  };

  loadSelectedGroupUsers = selectedId => {
    Axios.get("http://localhost:8081/api/groups/" + selectedId + "/users")
      .then(res => {
        let allList = [];
        this.state.allUsers.forEach(user => {
          allList.push({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isChecked: false
          });
        });
        allList.forEach(listEl => {
          res.data.forEach(resEl => {
            if (listEl.username === resEl.username) {
              listEl.isChecked = true;
            }
          });
        });
        this.setState({ groupUsers: allList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showUsersCheckBox = () => {
    if (this.state.allUsers.length === 0) {
      return <div>Nėra vartotojų</div>;
    }
    if (this.state.selectedGroupForAddUsers === null) {
      return <div>Pasirinkite grupę</div>;
    }
    let data = this.state.groupUsers.map((user, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{user.username}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>
            <input
              onChange={event => this.handleUserCheckBoxClick(event)}
              id={user.username}
              type="checkbox"
              value={user.username}
              checked={user.isChecked}
            />
          </td>
        </tr>
      );
    });
    return (
      <div className="col-md-12">
        <p>
          Pažymėkite vartotojus, kuriuos noriti pridėti ir spauskite mygtuką
          "Atnaujinti".
        </p>
        <div className="line" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Vardas</th>
              <th scope="col">Pavardė</th>
              <th scope="col">Paštas</th>
              <th scope="col">Pridėti</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>

        <ButtonComponent
          onClick={this.onClickAddUsersToGroup}
          type="submit"
          value="Atnaujinti"
          className="btn submitButton"
        />
      </div>
    );
  };

  handleUserCheckBoxClick = e => {
    const options = this.state.groupUsers;
    options.forEach(option => {
      if (option.username === e.target.value) {
        option.isChecked = !option.isChecked;
      }
      this.setState({ groupUsers: options });
    });
  };

  onClickAddUsersToGroup = () => {
    console.log("Selected type: ", this.state.selectedType);
    let userIdListToAdd = [];
    let userIdListToRemove = [];

    this.state.groupUsers.forEach(el => {
      if (el.isChecked) {
        userIdListToAdd.push(el.username);
      } else {
        userIdListToRemove.push(el.username);
      }
    });

    Axios.post(
      "http://localhost:8081/api/groups/" +
      this.state.selectedGroupForAddUsers +
      "/users",
      { users: userIdListToAdd }
    )
      .then(res => {
        this.handleMessageInput(
          "Vartotojų priskyrimas įvykdytas",
          "alert alert-info fixed-top text-center",
          2500
        );
        this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        {this.showMessage()}
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
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
            </section>
            <section>
              <EditGroupUsers
                showGroups={this.showAllGroups()}
                onClickGoBack={() => this.goBack()}
                onChange={e => this.onSelectedGroupForAddUsersHandler(e)}
                showUsersCheckBox={this.showUsersCheckBox}
                onClickAddUsersToGroup={() => this.onClickAddUsersToGroup()}
              />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
