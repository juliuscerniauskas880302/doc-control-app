
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
                    type: "Type1s",
                    state: "State1s",
                    creationDate: "2019.01.26"   
        };  
    }

    componentDidMount() {
        //TODO
        //Padaryti normalų variantą su duomenų nuskaitymu
        // const position = this.props.match.params.id;
        // axios.get('http://localhost:8080/api/docs/' + (position))
        //     .then((response) => {
        //         //this.setState(response.data);
        //         console.log("-----------------Response data id yra: " + response.data.id);
        //         console.log("-----------------Response data title yra: " + response.data.title);
        //         this.setState({ title: response.data.title,
        //                         description: response.data.description,
        //                         type: response.data.type,
        //                         flag: response.data.flag
        //         })
                
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    render() {
        return (
            <div>
                <OneCreatedDocumentComponent
                                    id={this.state.id}
                                    title={this.state.title}
                                    description={this.state.description}
                                    type={this.state.type}
                                    state={this.state.state}
                                    creationDate={this.state.creationDate}
                  />
            </div>
        );
    }
}

export default OneCreatedDocumentContainer;