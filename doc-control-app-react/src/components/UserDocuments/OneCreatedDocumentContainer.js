
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
            creationDate: "2019.01.26",
            path: "",
            prefix: "",
            filename: "Nėra pridėto failo"
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
                                creationDate: response.data.creationDate,
                                path: response.data.path,
                                prefix: response.data.prefix
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
    }

    componentDidMount() {
        this.mounted = true;
        const position = this.props.match.params.documentId;
        //let currentUser = "migle";
        let resourcePath = 'http://localhost:8081/api/docs/' + position;
        axios.get(resourcePath)
            .then((response) => {
                if (this.mounted) {
                    var realFileName = "";
                    if(response.data.path.lastIndexOf(response.data.prefix) !== -1){
                        realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
                    }
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        documentTypeTitle: response.data.documentTypeTitle,
                        creationDate: response.data.creationDate,
                        path: response.data.path,
                        prefix: response.data.prefix,
                        filename: realFileName
                    })
                } else {
                    console.log("SetState nebuvo padarytas");
                }
            })
            .then(() => {
                console.log("Ar čia atėjooooooooo?");
                console.log(this.state.path.lastIndexOf(this.state.prefix));
                if(this.state.path.lastIndexOf(this.state.prefix) !== -1){
                    this.filename = this.state.path.substring(0, this.state.path.lastIndexOf(this.state.prefix));
                }
                console.log("Failo pavadinimas gaunasi" + this.filename);
            }
               
                
            )
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
                    path={this.state.path}
                    prefix={this.state.prefix}
                    filename={this.state.filename}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default OneCreatedDocumentContainer;