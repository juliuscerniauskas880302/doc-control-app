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
      username: "migle",
      documentTypeTitle: "Antras tipas",
      typeList: [],
      selectedFiles: null,
      //state: "default state",
      //creationDate: "2019.01.28"
      path: "",
      prefix: "",
      //filename: "Nėra pridėto failo"
      isOpen: false,
      percentage: 0
    };
  }

  handleChangeOfTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeOfDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChangeOfType = (event) => {
    this.setState({ documentTypeTitle: event.target.value });
  }

  onFileSelectHandler = event => {
    console.log(event.target.files);
    this.setState({ [event.target.name]: event.target.files });
  };

  openFileTransferPopup = () => {
    this.setState({isOpen: true});
  }

  closeFileTransferPopup = () => {
    this.setState({isOpen: false});
  }

  downloadHandler = (event) => {
    axios({
      url:
        "http://localhost:8081/api/docs/" + this.state.id + "/download", //doc id
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      var filename = this.extractFileName(
        response.headers["content-disposition"]
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  extractFileName = contentDispositionValue => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  //TODO
  handleSubmit = (event) => {
    console.log("Atėjau į Submit handlerį");
    event.preventDefault();
    //perkeliu šią komandą į kitą vietą
    //this.openFileTransferPopup();

    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title,
      //username: this.state.username
    };
    console.log("Čia spausdina modelį");
    console.log(model);
    let file = new FormData();

    if (this.state.selectedFiles === null) {
      console.log("Pažymėti failai yra null");
      file.append("file", null); //nėra 3 parametro, kuris turėtų būti failo pavadinimas 
    } else {
      if (this.state.selectedFiles.length === 1) {
        this.openFileTransferPopup();
        file.append(
          "file",
          this.state.selectedFiles[0],
          this.state.selectedFiles[0].name
        );
      }
    }
    file.append("model", JSON.stringify(model));
    console.log("Dokumento id yra - " + this.state.id);
    axios.put("http://localhost:8081/api/docs/" + this.state.id, file, {
      onUploadProgress: progressEvent => {
        this.setState({ percentage: Math.round((progressEvent.loaded / progressEvent.total) * 100) });
        console.log(
          "Upload progress: " +
          (progressEvent.loaded / progressEvent.total) * 100 +
          "%"
        );
      }
    })
      .then((response) => {
        axios.get("http://localhost:8081/api/docs/" + this.state.id)
          .then((response) => {
            this.setState({ id: response.data.id });
            this.setState({ title: response.data.title });
            this.setState({ description: response.data.description });
            this.setState({ documentTypeTitle: response.data.documentTypeTitle });
            this.setState({ path: response.data.path });
            this.setState({ prefix: response.data.prefix });
            //this.setState({ filename: this.state.selectedFiles[0].name });
          })
          .then((response) => {
            this.props.history.push(`/createdDocuments`);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      // .then((response) => {
      //   this.props.history.push(`/createdDocuments`);
      // .then (this.props.history.push(`/createdDocuments`))
      .catch(err => console.log("KLAIDA SUBMITE" + err));
    console.log("Spausinu FILE" + file);
  }

  // handleSubmit = (event) => {
  //   //TODO
  //   //Padaryti normalia PUT operaciją
  //   event.preventDefault();
  //   //const position = this.props.match.params.id;
  //   axios.put('http://localhost:8081/holidays/' + (this.state.oldTitle), this.state)

  //     .then(function (response) {
  //       /* axios.get('http://localhost:8080/products/' + (this.state.id))
  //                   .then((response) => {
  //                       this.setState({ products: response.data });
  //                   })
  //                   .catch((error) => {
  //                       console.log(error);
  //                   }); */
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  //TODO
  //Padaryti normalų ištrynimo metodą
  handleDelete = (event) => {
    event.preventDefault();
    axios.delete("http://localhost:8081/api/docs/" + this.state.id)
      .then((response) => {
        this.props.history.push(`/createdDocuments`);
      });
  }

  componentDidMount() {
    //nusiskaitau dokumentų tipus

    //let currentUser = JSON.parse(localStorage.getItem("user"));
    //console.log("Spausdinu userį gautą iš localStorage");
    //console.log(currentUser);
    //this.setState({ username: currentUser.username }, () => {
    //nusiskaitau dokumentų tipus
    axios.get("http://localhost:8081/api/users/submissionDocTypes")
      .then(response => {
        this.setState({ typeList: response.data.map(item => item.title) });
        console.log("Koks atiduodamas dokumentų tipų sąrašas (naujame dokumente)?");
        console.log(this.state.typeList);
      })
      .catch(error => {
        console.log("KLAIDA!!!!" + error);
      });
    //});

    //console.log("State user yra po visko" + this.state.username);
    //console.log("Local storage user po visko " + currentUser.username)


    //senas blogas
    // axios.get('http://localhost:8081/api/doctypes')
    //   .then((response) => {
    //     this.setState({ typeList: response.data.map(item => item.title) });
    //     console.log("Koks atiduodamas dokumentų tipų sąrašas (redagavime)?");
    //     console.log(this.state.typeList);
    //   })
    //   .catch((error) => {
    //     console.log("KLAIDA!!!!" + error);
    //   });


    //Konkretaus dokumento duomenų nuskaitymas
    const position = this.props.match.params.documentId;
    //let currentUser = "migle";
    let resourcePath = 'http://localhost:8081/api/docs/' + position;

    axios.get(resourcePath)
      .then((response) => {
        //this.setState(response.data);
        // console.log(response.data.id);
        //console.log(response.data.title);

        //TODO
        //Čia to lyg ir nereikia, nes dabar PATH tik failo pavadinimą ir turi
        // var realFileName = "";
        // if (response.data.path.lastIndexOf(response.data.prefix) !== -1) {
        //   realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
        // }
        this.setState({ id: response.data.id });
        this.setState({ title: response.data.title });
        this.setState({ description: response.data.description });
        this.setState({ documentTypeTitle: response.data.documentTypeTitle });
        this.setState({ path: response.data.path });
        this.setState({ prefix: response.data.prefix });
        //this.setState({ filename: realFileName });
        console.log("Gavau tokį produktą į redagavimą");
        console.log(this.state);
        let currentUser = JSON.parse(localStorage.getItem('user'));
        console.log("Spausdinu userį gautą iš localStorage");
        console.log(currentUser);
        this.setState({ username: currentUser.username });

        //console.log("Pagaminau tokį State ->" + this.state);
        //console.log("Toks description iš state'o -> " + this.state.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <EditDocumentComponent
        title={this.state.title}
        description={this.state.description}
        typeList={this.state.typeList}
        type={this.state.documentTypeTitle}
        path={this.state.path}
        prefix={this.state.prefix}
        //filename = { this.state.filename }
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        downloadHandler={this.downloadHandler}
        onFileSelectHandler={this.onFileSelectHandler}
        isOpen={this.state.isOpen}
        percentage={this.state.percentage}
        openFileTransferPopup={this.openFileTransferPopup}
        closeFileTransferPopup={this.closeFileTransferPopup}
      />
    );
  }
}

export default EditDocumentContainer;