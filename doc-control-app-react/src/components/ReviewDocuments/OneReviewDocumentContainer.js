
import React from 'react';
import OneReviewDocumentComponent from './OneReviewDocumentComponent';
import axios from 'axios';

class OneReviewDocumentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: "kodas1r",
            author: "vardas ir pavardė",
            title: "Title1r",
            description: "Description1r",
            documentTypeTitle: "Type1r",
            documentState: "State1r",
            submissionDate: "2019.01.26"
        };
    }

    componentDidMount() {

        
        const position = this.props.match.params.documentId;
        //let currentUser = "migle";
        let resourcePath = 'http://localhost:8081/api/docs/' + position;
        axios.get(resourcePath)
            .then((response) => {
                //this.setState(response.data);
                console.log("-----------------Response data id yra: " + response.data.id);
                console.log("-----------------Response data title yra: " + response.data.title);
                this.setState({ id: response.data.id,
                                author: response.data.author.firstname + " " + response.data.author.lastname,
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
                <OneReviewDocumentComponent
                    id={this.state.id}
                    author={this.state.author}
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

export default OneReviewDocumentContainer;