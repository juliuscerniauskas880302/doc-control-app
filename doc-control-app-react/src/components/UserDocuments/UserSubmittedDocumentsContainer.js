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
          documentState: "State1",
          submissionDate: "2019.01.26"
        },
        {
          id: "Kodas2",
          title: "Title2",
          description: "Description2",
          tydocumentTypeTitle: "Type2",
          documentState: "State2",
          submissionDate: "2019.01.27"
        },
        {
          id: "Kodas3",
          title: "Title3",
          description: "Description3",
          documentTypeTitle: "Type3",
          documentState: "State3",
          submissionDate: "2019.01.28"
        }
      ],
      loading: "Loading documents. Please wait..."
    };
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('user')).username;
    let resourcePath = 'http://localhost:8081/api/users/' + currentUser + '/docs/submitted';
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
            //state={document.documentState}
            state={document.documentState.toLowerCase().charAt(0).toUpperCase() + document.documentState.toLowerCase().slice(1)}
            submissionDate={document.submissionDate ? document.submissionDate.substring(0, 10): ""}
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
            <div className="col-2">
              <h5>Numeris</h5>
            </div>
            <div className="col-2">
              <h5>Pavadinimas</h5>
            </div>
            <div className="col-2">
              <h5>Aprašymas</h5>
            </div>
            <div className="col-1">
              <h5>Tipas</h5>
            </div>
            <div className="col-1">
              <h5>Būsena</h5>
            </div>
            <div className="col-1">
              <h5>Pateikimo data</h5>
            </div>
            <div className="col-1">
              <h5>Operacijos</h5>
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
