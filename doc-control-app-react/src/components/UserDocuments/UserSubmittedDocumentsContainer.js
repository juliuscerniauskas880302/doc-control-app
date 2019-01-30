import React from "react";
import UserSubmittedDocumentsComponent from "./UserSubmittedDocumentsComponent";
import axios from "axios";

class UserSubmittedDocumentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tikram kode turės būti tuščias masyvas
      //documents: '',
      //laikina bazikė
      documents: [
        {
          id: "Kodas1",
          title: "Title1",
          description: "Description1",
          documentTypeTitle: "Type1",
          state: "State1",
          submitionDate: "2019.01.26"
        },
        {
          id: "Kodas2",
          title: "Title2",
          description: "Description2",
          tydocumentTypeTitlee: "Type2",
          state: "State2",
          submitionDate: "2019.01.27"
        },
        {
          id: "Kodas3",
          title: "Title3",
          description: "Description3",
          documentTypeTitle: "Type3",
          state: "State3",
          submitionDate: "2019.01.28"
        }
      ],
      loading: "Loading documents. Please wait..."
    };
  }

  componentDidMount() {
    //TODO
    let currentUser = "migle";
    let resourcePath = 'http://localhost:8080/api/users/' + currentUser + '/docs';
    axios.get(resourcePath)
      .then((response) => {
        this.setState({ documents: response.data });
        console.log("Koks atiduodamas dokumentų sąrašas?");
        console.log(this.state.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.documents) {
      const documentCard = this.state.documents.map((document, index) => {
        return (
          <UserSubmittedDocumentsComponent
            key={index}
            id={document.id}
            title={document.title}
            description={document.description}
            type={document.documentTypeTitle}
            state={document.state}
            submitionDate={document.submitionDate}
          />
        );
      });
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-1">
              <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
            </div>
          </div>
          <div className="row">
            <div className="col-1">
              <p>Numeris</p>
            </div>
            <div className="col-2">
              <p>Pavadinimas</p>
            </div>
            <div className="col-2">
              <p>Aprašymas</p>
            </div>
            <div className="col-1">
              <p>Tipas</p>
            </div>
            <div className="col-1">
              <p>Būsena</p>
            </div>
            <div className="col-1">
              <p>Pateikimo data</p>
            </div>
            <div className="col-1">
              <p>Operacijos</p>
            </div>
          </div>
          <div className="row">{documentCard}</div>
        </div>
      );
    }
    return this.state.loading;
  }
}

export default UserSubmittedDocumentsContainer;
