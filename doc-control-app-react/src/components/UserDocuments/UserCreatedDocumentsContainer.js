import React from 'react';
import UserCreatedDocumentsComponent from './UserCreatedDocumentsComponent';
import axios from 'axios';

class UserCreatedDocumentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //tikram kode turės būti tuščias masyvas
            //documents: '',
            //laikina bazikė
            documents: [
                {
                    id: "kodas1s",
                    title: "Title1s",
                    description: "Description1s",
                    documentTypeTitle: "Type1s",
                    creationDate: "2019.01.26"
                },
                {
                    id: "kodas2s",
                    title: "Title2s",
                    description: "Description2s",
                    documentTypeTitle: "Type2s",
                    creationDate: "2019.01.27"
                },
                {
                    id: "kodas3s",
                    title: "Title3s",
                    description: "Description3s",
                    documentTypeTitle: "Type3s",
                    creationDate: "2019.01.28"
                }
            ],
            loading: 'Loading documents. Please wait...'
        };
    }

    componentDidMount() {
        //TODO
        let currentUser = "migle";
        let resourcePath = 'http://localhost:8080/api/users/' + currentUser + '/docs/created';
        axios.get(resourcePath)
            .then((response) => {
                this.setState({ documents: response.data });
                console.log("Koks gautas dokumentų sąrašas iš 'Sukurtų'?");
                console.log(this.state.documents);
                
                /*let fff = new Date(this.state.documents[0].creationDate);
                let ggg= fff.format("YYYY/MM/DD");
                console.log("Data yra " + ggg);*/
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (this.state.documents) {
            const documentCard = this.state.documents.map((document, index) => {

                return (
                    <UserCreatedDocumentsComponent
                        key={index}
                        id={document.id}
                        title={document.title}
                        description={document.description}
                        type={document.documentTypeTitle}
                        creationDate={document.creationDate.substring(0, 10)}
                    />
                );
            });
            return (<div className="container-fluid">
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
                        <h5>Sukūrimo data</h5>
                    </div>
                    <div className="col-2">
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

export default UserCreatedDocumentsContainer;