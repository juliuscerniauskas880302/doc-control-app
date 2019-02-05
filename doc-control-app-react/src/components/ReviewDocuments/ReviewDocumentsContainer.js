import React from 'react';
import ReviewDocumentsComponent from './ReviewDocumentsComponent';
import axios from 'axios';

class ReviewDocumentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //tikram kode turės būti tuščias masyvas
            //documents: '',
            //laikina bazikė
            documents: [
                {
                    id: "Kodas1r",
                    author: {},
                    title: "Title1r",
                    description: "Description1r",
                    documentTypeTitle: "Type1r",
                    submissionDate: "2019.01.26"
                },
                // {
                //     id: "Kodas2r",
                //     author: {},
                //     title: "Title2r",
                //     description: "Description2r",
                //     documentTypeTitle: "Type2r",
                //     submissionDate: "2019.01.27"
                // },
                // {
                //     id: "Kodas3r",
                //     author: {},
                //     title: "Title3r",
                //     description: "Description3r",
                //     documentTypeTitle: "Type3r",
                //     submissionDate: "2019.01.28"
                // }
            ],
            loading: 'Kraunami dokumentai. Prašome palaukti...'
        };
    }

    handleAccept = (id) =>  {
        console.log("Atėjau į Accept");
        //let currentUser = JSON.parse(localStorage.getItem('user')).username;
        let docInfo = {
            documentState: "ACCEPTED",
            rejectionReason: "",
            reviewerUsername: JSON.parse(localStorage.getItem('user')).username
        }
        console.log("docInfo yra " + docInfo.documentState);
        axios.post("http://localhost:8081/api/docs/review/" + id, docInfo)
            .then((response) => {
                axios.get('http://localhost:8081/api/docs/review')
                    .then((response) => {
                        this.setState({ documents: response.data });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    }

    componentDidMount() {    
        axios.get('http://localhost:8081/api/docs/review')
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
                    <ReviewDocumentsComponent
                        key={index}
                        id={document.id}
                        author={document.author.firstname + " " + document.author.lastname}
                        title={document.title}
                        description={document.description}
                        type={document.documentTypeTitle}
                        submissionDate={document.submissionDate ? document.submissionDate.substring(0, 10): ""}
                        handleAccept={this.handleAccept}
                    />
                );
            });
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <h5>Autorius</h5>
                    </div>
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
                        <h5>Pateikimo data</h5>
                    </div>
                    <div className="col-1">
                        <h5>Operacijos</h5>
                    </div>
                </div>
                <div className="row">{documentCard}
                </div>
            </div>);
        }
        return this.state.loading;
    }
}

export default ReviewDocumentsContainer;