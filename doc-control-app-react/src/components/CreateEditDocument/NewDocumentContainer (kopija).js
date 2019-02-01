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
      documentTypeTitle:"",
      typeList: [],
      documentState: "default state",
      creationDate: "2019.01.28"
    };
    
  }

  //TODO
  //Perdaryti HANDLE metodus
  handleChangeOfTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeOfDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChangeOfType = (event) => {
    this.setState({ type: event.target.value });
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

    //nusiskaitau dokumentų tipus
    axios.get('http://localhost:8080/api/doctypes')
      .then((response) => {
        this.setState({ typeList: response.data.map(item => item.title) });
        console.log("Koks atiduodamas dokumentų tipų sąrašas?");
        console.log(this.state.typeList);
      })
      .catch((error) => {
        console.log("KLAIDA!!!!" + error);
      });
  }

  render() {

    return (
      <NewDocumentComponent
        type={this.state.type}
        typeList={this.state.typeList}
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default NewDocumentContainer;






