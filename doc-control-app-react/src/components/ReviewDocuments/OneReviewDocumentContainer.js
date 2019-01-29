
import React from 'react';
import OneReviewDocumentComponent from './OneReviewDocumentComponent';
import axios from 'axios';

class OneReviewDocumentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: "kodas1r",
            title: "Title1r",
            description: "Description1r",
            type: "Type1r",
            state: "State1r",
            creationDate: "2019.01.26"
        };
    }

    componentDidMount() {

        //tikrasis variantas bus su duomenų nuskaitymu
        // const position = this.props.match.params.title;
        // axios.get('http://localhost:8080/holidays/' + (position))
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
                <OneReviewDocumentComponent
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

export default OneReviewDocumentContainer;