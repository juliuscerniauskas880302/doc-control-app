import React from 'react';
import NewDocumentComponent from './NewDocumentComponent';
import axios from 'axios';


class NewDocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //id: "default kodas",
      title: "default title",
      description: "default description",
      username: "migle",
      documentTypeTitle: "",
      typeList: [],
      selectedFiles: null
      //documentState: "default state",
      //creationDate: "2019.01.28"
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
    this.setState({ documentTypeTitle: event.target.value });
  }

  onFileSelectHandler = event => {
    console.log(event.target.files);
    this.setState({ [event.target.name]: event.target.files });
  };

  downloadHandler = (event) => {
    // 70a73980-02d1-4e63-a577-6e59b25c976b
    // Axios.get(
    //   "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download"
    // ).then(res => FileSaver.saveAs(res.data, "effectiveFileName"));

    axios({
      url:
        "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download", //doc id
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
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title,
      username: "migle"
    };
    console.log("Čia spausdina modelį");
    console.log(model);
    let file = new FormData();
    if (this.state.selectedFiles.length === 1) {
      file.append(
        "file",
        this.state.selectedFiles[0],
        this.state.selectedFiles[0].name
      );
      file.append("model", JSON.stringify(model));
      axios.post("http://localhost:8081/api/docs", file, {
        onUploadProgress: progressEvent => {
          console.log(
            "Upload progress: " +
            (progressEvent.loaded / progressEvent.total) * 100 +
            "%"
          );
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log("KLAIDA SUBMITE" + err));
    } else {
      //   for (let i = 0; i < this.state.selectedFiles.length; i++) {
      //     file.append(
      //       "file",
      //       this.state.selectedFiles[i],
      //       this.state.selectedFiles[i].name
      //     );
      //     console.log(this.state.selectedFiles[i]);
      //     console.log(this.state.selectedFiles[i].name);
      //   }
      //   Axios.post("http://localhost:8081/api/files/upload", file, {
      //     onUploadProgress: progressEvent => {
      //       console.log(
      //         "Upload progress: " +
      //           (progressEvent.loaded / progressEvent.total) * 100 +
      //           "%"
      //       );
      //     }
      //   })
      //     .then(res => console.log(res))
      //     .catch(err => console.log(err));
    }
    console.log(file);




  }

  componentDidMount() {

    //nusiskaitau dokumentų tipus
    axios.get('http://localhost:8081/api/doctypes')
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
        onFileSelectHandler={this.onFileSelectHandler}
        downloadHandler={this.downloadHandler}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default NewDocumentContainer;






