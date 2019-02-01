
import React from 'react';
import OneCreatedDocumentComponent from './OneCreatedDocumentComponent';
import axios from 'axios';

class OneCreatedDocumentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: "kodas1s",
            title: "Title1s",
            description: "Description1s",
            documentTypeTitle: "Type1s",
            creationDate: "2019.01.26"
        };
    }

    handleDelete = (event) => {
        let currentUser = "migle";
        let resourcePath = 'http://localhost:8081/api/users/' + currentUser + '/docs/created';
        console.log("Atėjau į handleDelete metodą");
        //const position = this.props.match.params.documentId;
        console.log("Dokumento ID yra:");
        console.log(this.state.id);
        axios.delete("http://localhost:8081/api/docs/" + this.state.id)
            .then((response) => {

                this.props.history.push(`/createdDocuments`);
                // console.log("Ištryniau dokumentą");
                // axios.get('http://localhost:8081/api/docs/' + this.state.id)
                //     .then((response) => {
                //         //if (this.mounted) {
                //             this.setState({
                //                 id: response.data.id,
                //                 title: response.data.title,
                //                 description: response.data.description,
                //                 documentTypeTitle: response.data.documentTypeTitle,
                //                 creationDate: response.data.creationDate
                //             });
                //         //}
                //     })
                //     .then((response) => this.props.history.push(`/`))
                //     .catch((error) => {
                //         console.log(error);
                //     });
            });
    }

    handleSubmit = (event) => {
        console.log("Atėjau į handleSubmit metodą");
        console.log("Dokumento ID yra:");
        console.log(this.state.id);
        axios.put("http://localhost:8081/api/docs/" + this.state.id + "/submit")
            .then((response) => {
                console.log("Pakeičiau dokumento statusą");
                axios.get('http://localhost:8081/api/docs/' + this.state.id)
                    .then((response) => {
                        //if (this.mounted) {
                            this.setState({
                                id: response.data.id,
                                title: response.data.title,
                                description: response.data.description,
                                documentTypeTitle: response.data.documentTypeTitle,
                                creationDate: response.data.creationDate
                            });
                        //}
                    })
                    .then((response) => this.props.history.push(`/`))
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log("Klaida keičiant dokumento statusą - " + error);
            });
        //this.props.history.push(`/`);
    }

    componentDidMount() {
        this.mounted = true;
        const position = this.props.match.params.documentId;
        //let currentUser = "migle";
        let resourcePath = 'http://localhost:8081/api/docs/' + position;
        axios.get(resourcePath)
            .then((response) => {
                //this.setState(response.data);
                console.log("-----------------Response data id yra: " + response.data.id);
                console.log("-----------------Response data title yra: " + response.data.title);

                if (this.mounted) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        documentTypeTitle: response.data.documentTypeTitle,
                        creationDate: response.data.creationDate
                    })
                } else {
                    console.log("SetState nebuvo padarytas");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <div>
                <OneCreatedDocumentComponent
                    id={this.state.id}
                    title={this.state.title}
                    description={this.state.description}
                    type={this.state.documentTypeTitle}
                    creationDate={this.state.creationDate.substring(0, 10)}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default OneCreatedDocumentContainer;