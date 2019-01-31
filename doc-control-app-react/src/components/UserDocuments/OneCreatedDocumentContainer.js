
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

    componentDidMount() {
        //TODO
        const position = this.props.match.params.documentId;
        //let currentUser = "migle";
        let resourcePath = 'http://localhost:8080/api/docs/' + position;
        axios.get(resourcePath)
            .then((response) => {
                //this.setState(response.data);
                console.log("-----------------Response data id yra: " + response.data.id);
                console.log("-----------------Response data title yra: " + response.data.title);
                this.setState({ id: response.data.id,
                                title: response.data.title,
                                description: response.data.description,
                                documentTypeTitle: response.data.documentTypeTitle,
                                creationDate: response.data.creationDate
                })
                
            })
            .catch((error) => {
                console.log(error);
            });
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
                  />
            </div>
        );
    }
}

export default OneCreatedDocumentContainer;