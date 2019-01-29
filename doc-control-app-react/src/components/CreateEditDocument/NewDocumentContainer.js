import React from 'react';
import NewDocumentComponent from './NewDocumentComponent';
import axios from 'axios';


class NewDocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "default kodas",
      title: "default title",
      description: "default description",
      type:"",
      typeList: ["Pirmas tipas", "Antras tipas", "Trečias tipas", "Ketvirtas tipas"],
      state: "default state",
      creationDate: "2019.01.28"
    };
    
  }

  //TODO
  //Perdaryti HANDLE metodus
  handleChangeOfTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeOfImage = (event) => {
    this.setState({ image: event.target.value });
  }

  handleChangeOfDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChangeOfType = (event) => {
    this.setState({ type: event.target.value });
  }

  handleChangeOfFlag = (event) => {
    this.setState({ flag: event.target.value });
  }

  //TODO
  //Padaryti normalią POST operaciją
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(this.state);
  //   axios.post('http://localhost:8080/holidays', this.state)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {

    //console.log(this.props.history.location.pathname);
  }

  render() {

    return (
      <NewDocumentComponent
        type={this.state.type}
        typeList={this.state.typeList}
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfImage={this.handleChangeOfImage}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleChangeOfFlag={this.handleChangeOfFlag}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default NewDocumentContainer;