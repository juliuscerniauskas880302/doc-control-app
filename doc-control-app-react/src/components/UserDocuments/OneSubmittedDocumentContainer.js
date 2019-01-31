
import React from 'react';
import OneSubmittedDocumentComponent from './OneSubmittedDocumentComponent';
import axios from 'axios';

class OneSubmittedDocumentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
                    id: "kodas1",
                    title: "Title1",
                    description: "Description1",
                    documentTypeTitle: "Type1",
                    documentState: "State1",
                    submissionDate: "2019.01.26"   
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
                                documentState: response.data.documentState,
                                submissionDate: response.data.submissionDate
                })
                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <OneSubmittedDocumentComponent
                                    id={this.state.id}
                                    title={this.state.title}
                                    description={this.state.description}
                                    type={this.state.documentTypeTitle}
                                    state={this.state.documentState.toLowerCase().charAt(0).toUpperCase() + this.state.documentState.toLowerCase().slice(1)}
                                    submissionDate={this.state.submissionDate ? this.state.submissionDate.substring(0, 10): ""}
                  />
            </div>
        );
    }
}

export default OneSubmittedDocumentContainer;