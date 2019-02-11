import React from "react";
import UserSubmittedDocumentsComponent from "./UserSubmittedDocumentsComponent";
import axios from "axios";
import { Link } from 'react-router-dom';

class UserSubmittedDocumentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tikram kode turės būti tuščias masyvas
      //documents: '',
      //laikina bazikė
      documents: [
        {
          id: "Testas",
          title: "Testas",
          description: "Testas",
          documentTypeTitle: "Testas",
          documentState: "Testas",
          submissionDate: "2019.01.26"
        },
        // {
        //   id: "Kodas1",
        //   title: "Title1",
        //   description: "Description1",
        //   documentTypeTitle: "Type1",
        //   documentState: "State1",
        //   submissionDate: "2019.01.26"
        // },
        // {
        //   id: "Kodas2",
        //   title: "Title2",
        //   description: "Description2",
        //   tydocumentTypeTitle: "Type2",
        //   documentState: "State2",
        //   submissionDate: "2019.01.27"
        // },
        // {
        //   id: "Kodas3",
        //   title: "Title3",
        //   description: "Description3",
        //   documentTypeTitle: "Type3",
        //   documentState: "State3",
        //   submissionDate: "2019.01.28"
        // }
      ],
      loading: "Loading documents. Please wait..."
    };
  }

  handleZipDownload = (event) => {
    let currentUser = JSON.parse(localStorage.getItem('user')).username;
    //api/docs/{username}/download/all
    axios({
      url:
        "http://localhost:8081/api/docs/" + currentUser + "/download/all",
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
            submissionDate={document.submissionDate ? document.submissionDate.substring(0, 10) : ""}
          />
        );
      });
      return (
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="text-uppercase mb-0">Pateikti dokumentai</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-1">
                        <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <table className="table table-striped">
                          <thead className="thead-inverse">
                            <tr>
                              <th>Numeris</th>
                              <th>Pavadinimas</th>
                              <th>Aprašymas</th>
                              <th>Tipas</th>
                              <th>Būsena</th>
                              <th>Pateikimo data</th>
                              <th>Operacijos</th>
                            </tr>
                          </thead>
                          <tbody>{documentCard}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>











        // <div className="container-fluid">
        //   <div className="row">
        //     <div className="col-1">
        //       <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
        //     </div>
        //   </div>
        //   <div className="row">
        //     <div className="col-12">
        //       <table className="table table-striped">
        //         <thead className="thead-inverse">
        //           <tr>
        //             <th>Numeris</th>
        //             <th>Pavadinimas</th>
        //             <th>Aprašymas</th>
        //             <th>Tipas</th>
        //             <th>Būsena</th>
        //             <th>Pateikimo data</th>
        //             <th>Operacijos</th>
        //           </tr>
        //         </thead>
        //         <tbody>{documentCard}</tbody>
        //       </table>
        //     </div>
        //   </div>
        // </div>


        // <div className="container-fluid">
        //   <div className="row">
        //     <div className="col-4">
        //       <Link to={"/admin/newDocument"} className="btn btn-info" type="button"> Naujas dokumentas </Link> &nbsp;
        //       {/* <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a> &nbsp; */}
        //       <button className="btn btn-info" onClick={this.handleZipDownload}>Atsiusiųsti dokumentų ZIP'ą</button>
        //     </div>
        //   </div>
        //   <div className="row">
        //     <div className="col-2">
        //       <h5>Numeris</h5>
        //     </div>
        //     <div className="col-2">
        //       <h5>Pavadinimas</h5>
        //     </div>
        //     <div className="col-2">
        //       <h5>Aprašymas</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Tipas</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Būsena</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Pateikimo data</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Operacijos</h5>
        //     </div>
        //   </div>
        //   <div className="row">{documentCard}</div>
        // </div>
      );
    }
    return this.state.loading;
  }
}

export default UserSubmittedDocumentsContainer;
