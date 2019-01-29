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
                    author: "Autorius1r",
                    title: "Title1r",
                    description: "Description1r",
                    type: "Type1r",
                    state: "State1r",
                    submitionDate: "2019.01.26"
                },
                {
                    id: "Kodas2r",
                    author: "Autorius2r",
                    title: "Title2r",
                    description: "Description2r",
                    type: "Type2r",
                    state: "State2r",
                    submitionDate: "2019.01.27"
                },
                {
                    id: "Kodas3r",
                    author: "Autorius3r",
                    title: "Title3r",
                    description: "Description3r",
                    type: "Type3r",
                    state: "State3r",
                    submitionDate: "2019.01.28"
                }
            ],
            loading: 'Kraunami dokumentai. Prašome palaukti...'
        };
    }

    componentDidMount() {
        //TODO
        //tikrame kode duomenis imsiu iš API serviso
        /* axios.get('http://localhost:8080/api/docs')
            .then((response) => {
                this.setState({ documents: response.data });
                console.log("Koks atiduodamas švenčių sąrašas?");
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
                    <ReviewDocumentsComponent
                        key={index}
                        id={document.id}
                        author={document.author}
                        title={document.title}
                        description={document.description}
                        type={document.type}
                        state={document.state}
                        submitionDate={document.submitionDate}
                    />
                );
            });
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <p>Autorius</p>
                    </div>
                    <div className="col-2">
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
                        <p>Pateikimo data</p>
                    </div>
                    <div className="col-1">
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

export default ReviewDocumentsContainer;