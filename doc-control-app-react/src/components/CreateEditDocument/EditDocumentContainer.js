import React from "react";
import EditDocumentComponent from "./EditDocumentComponent";
import axios from "axios";

class EditDocumentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "default kodas",
      title: "default title",
      description: "",
      username: "migle",
      documentTypeTitle: "Antras tipas",
      typeList: [],
      selectedFiles: null,
      paths: null,
      path: "",
      prefix: "",
      isOpen: false,
      isHidden: false,
      percentage: 0,
      mainFile: null,
      selectedAdditionalFiles: null,
      additionalFilePathsToDelete: [],
      mainFilePathToDelete: null
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }
  handleChangeOfTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeOfDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleChangeOfType = event => {
    this.setState({ documentTypeTitle: event.target.value });
  };

  onFileSelectHandler = event => {
    console.log(event.target.files);
    this.setState({ [event.target.name]: event.target.files });
  };

  openFileTransferPopup = () => {
    this.setState({ isOpen: true });
  };

  closeFileTransferPopup = () => {
    this.setState({ isOpen: false });
  };

  downloadHandler = event => {
    axios({
      url: "http://localhost:8081/api/docs/" + this.state.id + "/download", //doc id
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
  fileDownloadHandler = event => {
    console.log(event.target);
    axios({
      url:
        "http://localhost:8081/api/docs/" +
        this.state.id +
        "/" +
        event.target.id +
        "/download", //doc id
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
  handleSubmit = event => {
    event.preventDefault();
    this.openFileTransferPopup();
    console.log(this.state.mainFilePathToDelete);
    let isFileNamesSame = false;
    let correctFileExtensions = true;
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title,
      mainFilePathToDelete: this.state.mainFilePathToDelete,
      additionalFilePathsToDelete: this.state.additionalFilePathsToDelete
    };
    let file = new FormData();
    console.log(file);

    // Checking if main file is attached if it was deleted
    if (this.state.mainFile === null && this.state.paths === null) {
      this.props.showResponseMessage(
        "Pridėkite pagrindinę bylą.",
        "danger",
        2500
      );
    }
    // Adding main file if it has unique name
    else if (
      this.state.mainFile !== null &&
      (this.state.selectedAdditionalFiles === null ||
        this.state.selectedAdditionalFiles.length === 0)
    ) {
      // Check if new main file is not of the same name as additional files
      if (this.state.paths !== null) {
        this.state.paths.forEach(p => {
          if (p === this.state.mainFile[0].name) {
            this.props.showResponseMessage(
              "Bylų pavadinimai turi būti unikalūs.",
              "danger",
              2500
            );
            isFileNamesSame = true;
          }
        });
      }
      if (isFileNamesSame === true) {
        this.props.showResponseMessage(
          "Bylų pavadinimai vienodi. Pasirinkite kitas bylas arba jas pervadinkite.",
          "danger",
          2500
        );
      } else {
        // Adding file
        file.append(
          "file",
          this.state.mainFile[0],
          this.state.mainFile[0].name
        );
        file.append("model", JSON.stringify(model));
        axios
          .put("http://localhost:8081/api/docs/" + this.state.id, file, {
            onUploadProgress: progressEvent => {
              this.setState({
                percentage: Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                )
              });
              console.log(
                "Upload progress: " +
                  (progressEvent.loaded / progressEvent.total) * 100 +
                  "%"
              );
            }
          })
          .then(response => this.props.history.push(`/createdDocuments`))
          .then(res => console.log(res))
          .catch(err => console.log("KLAIDA SUBMITE" + err));
      }
    } else if (this.state.selectedAdditionalFiles !== null) {
      // Check if additional files that are being added named unique
      if (this.state.selectedAdditionalFiles.length > 1) {
        for (let i = 0; i < this.state.selectedAdditionalFiles.length; i++) {
          for (let j = 0; j < this.state.selectedAdditionalFiles.length; j++) {
            if (
              this.state.selectedAdditionalFiles[i].name ===
                this.state.selectedAdditionalFiles[j].name &&
              i !== j
            ) {
              isFileNamesSame = true;
              return;
            }
          }
        }
      }
      // Check if additional files do not contain same name as files that are in DB
      if (this.state.paths !== null) {
        this.state.paths.forEach(p => {
          this.state.selectedAdditionalFiles.forEach(af => {
            if (af.name === p) {
              isFileNamesSame = true;
              return;
            }
          });
        });
      }
      //Check if additional files are not of the same name as main file
      if (this.state.mainFile !== null) {
        this.state.selectedAdditionalFiles.forEach(file => {
          if (file.name === this.state.mainFile[0].name) {
            isFileNamesSame = true;
            return;
          }
        });
      }
      //Check if additional files are not of the same name as main file in DB
      if (this.state.path !== null) {
        this.state.selectedAdditionalFiles.forEach(file => {
          if (file.name === this.state.path) {
            isFileNamesSame = true;
            return;
          }
        });
      }

      // Checking file extensions
      let acceptedFileTypes = ["pdf", "jpg", "png"];
      this.state.selectedAdditionalFiles.forEach(file => {
        if (!acceptedFileTypes.includes(file.name.split(".").pop())) {
          correctFileExtensions = false;
          return;
        }
      });
      // Errors
      if (isFileNamesSame === true) {
        this.props.showResponseMessage(
          "Bylų pavadinimai vienodi. Pasirinkite kitas bylas arba jas pervadinkite.",
          "danger",
          2500
        );
        isFileNamesSame = false;
      } else if (correctFileExtensions === false) {
        this.props.showResponseMessage(
          "Prisegtos bylos nėra teisingo formato.",
          "danger",
          2500
        );
        correctFileExtensions = false;
      } else {
        if (this.state.mainFile !== null && this.state.path === null) {
          file.append(
            "file",
            this.state.mainFile[0],
            this.state.mainFile[0].name
          );
        }
        for (let i = 0; i < this.state.selectedAdditionalFiles.length; i++) {
          file.append(
            "file",
            this.state.selectedAdditionalFiles[i],
            this.state.selectedAdditionalFiles[i].name
          );
          console.log("_______________ I am appending!!!");
          file.append("model", JSON.stringify(model));
        }
        axios
          .put("http://localhost:8081/api/docs/" + this.state.id, file, {
            onUploadProgress: progressEvent => {
              console.log(
                "Upload progress: " +
                  (progressEvent.loaded / progressEvent.total) * 100 +
                  "%"
              );
            }
          })
          .then(res => this.props.history.push(`/createdDocuments`))
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }
    console.log("Toks yra failas" + file.getAll);
  };

  onUpdateMainFile = fileItems => {
    this.setState({
      mainFile: fileItems.map(fileItem => fileItem.file)
    });
    console.log(this.state.mainFile);
  };
  onUpdateAdditionalFiles = fileItems => {
    this.setState({
      selectedAdditionalFiles: fileItems.map(fileItem => fileItem.file)
    });
  };
  deleteMainFileHandler = event => {
    event.preventDefault();
    this.setState({
      mainFilePathToDelete:
        event.target.id === this.state.path ? this.state.path : null,
      path: event.target.id === this.state.path ? null : this.state.path
    });
  };
  deleteAdditionalFileHandler = event => {
    event.preventDefault();
    this.setState({
      additionalFilePathsToDelete: this.state.additionalFilePathsToDelete.concat(
        this.state.paths.filter(p => p === event.target.id)
      ),
      paths: this.state.paths.filter(p => p !== event.target.id)
    });
  };

  componentDidMount() {
    //nusiskaitau dokumentų tipus

    //let currentUser = JSON.parse(localStorage.getItem("user"));
    //console.log("Spausdinu userį gautą iš localStorage");
    //console.log(currentUser);
    //this.setState({ username: currentUser.username }, () => {
    //nusiskaitau dokumentų tipus
    axios
      .get("http://localhost:8081/api/users/submissionDocTypes")
      .then(response => {
        this.setState({ typeList: response.data.map(item => item.title) });
        console.log(
          "Koks atiduodamas dokumentų tipų sąrašas (naujame dokumente)?"
        );
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
    let resourcePath = "http://localhost:8081/api/docs/" + position;

    axios
      .get(resourcePath)
      .then(response => {
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
        this.setState({ paths: response.data.additionalFilePaths });
        this.setState({ prefix: response.data.prefix });
        //this.setState({ filename: realFileName });
        console.log("Gavau tokį produktą į redagavimą");
        console.log(this.state);
        let currentUser = JSON.parse(localStorage.getItem("user"));
        console.log("Spausdinu userį gautą iš localStorage");
        console.log(currentUser);
        this.setState({ username: currentUser.username });

        //console.log("Pagaminau tokį State ->" + this.state);
        //console.log("Toks description iš state'o -> " + this.state.id);
      })
      .catch(error => {
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
        paths={this.state.paths}
        prefix={this.state.prefix}
        //filename = { this.state.filename }
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        downloadHandler={this.downloadHandler}
        fileDownloadHandler={this.fileDownloadHandler}
        onFileSelectHandler={this.onFileSelectHandler}
        isOpen={this.state.isOpen}
        percentage={this.state.percentage}
        openFileTransferPopup={this.openFileTransferPopup}
        closeFileTransferPopup={this.closeFileTransferPopup}
        deleteMainFileHandler={this.deleteMainFileHandler}
        deleteAdditionalFileHandler={this.deleteAdditionalFileHandler}
        onUpdateAdditionalFiles={this.onUpdateAdditionalFiles}
        onUpdateMainFile={this.onUpdateMainFile}
      />
    );
  }
}

export default EditDocumentContainer;
