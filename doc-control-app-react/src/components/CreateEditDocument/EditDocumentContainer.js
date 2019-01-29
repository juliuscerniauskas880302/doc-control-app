import React from 'react';
import EditDocumentComponent from './EditDocumentComponent';
import axios from 'axios';

class EditDocumentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "default kodas",
      title: "default title",
      description: "default description",
      type:"Antras tipas",
      typeList: ["Pirmas tipas", "Antras tipas", "Trečias tipas", "Ketvirtas tipas"],
      state: "default state",
      creationDate: "2019.01.28"
    };
  }

  componentDidMount() {
    const position = this.props.match.params.title;

    //TODO
    //Padaryti normalią GET operaciją
    /* axios.get('http://localhost:8080/holidays/' + (position))
      .then((response) => {
        //this.setState(response.data);
        console.log("Gavau tokį produktą į redagavimą");
        console.log(this.state);
       // console.log(response.data.id);
        //console.log(response.data.title);
        this.setState({oldTitle: response.data.title});
        this.setState({title: response.data.title});
        this.setState({image: response.data.image});
        this.setState({description: response.data.description});
        this.setState({type: response.data.type});
        this.setState({flag: response.data.flag});
      
      console.log("Pagaminau tokį State ->" + this.state);
      //console.log("Toks description iš state'o -> " + this.state.id);
      })
      .catch((error) => {
        console.log(error);
      }); */
  }

  handleChangeOfTitle = (event) => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
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

  handleSubmit = (event) => {
    //TODO
    //Padaryti normalia PUT operaciją
    // event.preventDefault();
    // //const position = this.props.match.params.id;
    // axios.put('http://localhost:8080/holidays/' + (this.state.oldTitle), this.state)

    //   .then(function (response) {
    //     /* axios.get('http://localhost:8080/products/' + (this.state.id))
    //                 .then((response) => {
    //                     this.setState({ products: response.data });
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 }); */
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  }

  //TODO
  //Padaryti normalų ištrynimo metodą
  handleDelete = (event) => {
    event.preventDefault();
    console.log("Noriu ištrinti " + this.state.oldTitle);
    axios.delete('http://localhost:8080/holidays/' + (this.state.oldTitle))
    .then((response) => {
        console.log("Ištrinta");
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    return (
      <EditDocumentComponent handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfImage={this.handleChangeOfImage}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleChangeOfFlag={this.handleChangeOfFlag}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        title={this.state.title}
        description={this.state.description}
        typeList={this.state.typeList}
        type={this.state.type}
      />
    );
  }
}

export default EditDocumentContainer;