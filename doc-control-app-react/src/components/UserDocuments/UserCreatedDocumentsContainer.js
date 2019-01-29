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
                    type: "Type1s",
                    state: "State1s",
                    creationDate: "2019.01.26"
                },
                {
                    id: "kodas2s",
                    title: "Title2s",
                    description: "Description2s",
                    type: "Type2s",
                    state: "State2s",
                    creationDate: "2019.01.27"
                },
                {
                    id: "kodas3s",
                    title: "Title3s",
                    description: "Description3s",
                    type: "Type3s",
                    state: "State3s",
                    creationDate: "2019.01.28"
                }
            ],
            loading: 'Loading documents. Please wait...'
        };
    }

    componentDidMount() {
        //TODO
        //tikrame kode duomenis imsiu iš API serviso
        /* axios.get('http://localhost:8080/api/docs')
            .then((response) => {
                this.setState({ documents: response.data });
                console.log("Koks gautas dokumentų sąrašas?");
                console.log(this.state.documents);
            })
            .catch((error) => {
                console.log(error);
            }); */
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
                        type={document.type}
                        state={document.state}
                        creationDate={document.creationDate}
                    />
                );
            });
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-1">
                        <a href="/admin/newDocument" class="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
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
                        <p>Sukūrimo data</p>
                    </div>
                    <div className="col-2">
                        <p>Operacijos</p>
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