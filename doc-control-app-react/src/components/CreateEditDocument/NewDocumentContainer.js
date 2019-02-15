import React from "react";
import NewDocumentComponent from "./NewDocumentComponent";
import axios from "axios";
const acceptedFileTypes = ["image/*", "application/pdf"];
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
      mainFile: null,
      selectedAdditionalFiles: null,
      isOpen: false,
      percentage: 0,
      selectedFilesWithSameName: false
      //documentState: "default state",
      //creationDate: "2019.01.28"
    };
  }

  openFileTransferPopup = () => {
    this.setState({
      isOpen: true
    });
  };

  closeFileTransferPopup = () => {
    this.setState({
      isOpen: false
    });
  };

  handleChangeOfTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeOfDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleChangeOfType = event => {
    this.setState({ documentTypeTitle: event.target.value });
  };

  // onFileSelectHandler = event => {
  //   console.log(event.target.files);
  //   this.setState({ [event.target.name]: event.target.files });
  // };

  onUpdateMainFile = fileItems => {
    // this.setState({
    //   mainFile: null
    // });
    this.setState({
      mainFile: fileItems.map(fileItem => fileItem.file)
    });
    console.log(this.state.mainFile);
  };
  onUpdateAdditionalFiles = fileItems => {
    // this.setState({
    //   selectedAdditionalFiles: null
    // });
    this.setState({
      selectedAdditionalFiles: fileItems.map(fileItem => fileItem.file)
    });
    console.log(this.state.selectedAdditionalFiles);
  };

  // downloadHandler = (event) => {
  //   // 70a73980-02d1-4e63-a577-6e59b25c976b
  //   // Axios.get(
  //   //   "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download"
  //   // ).then(res => FileSaver.saveAs(res.data, "effectiveFileName"));

  //   axios({
  //     url:
  //       "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download", //doc id
  //     method: "GET",
  //     responseType: "blob" // important
  //   }).then(response => {
  //     var filename = this.extractFileName(
  //       response.headers["content-disposition"]
  //     );
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", filename); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };

  // extractFileName = contentDispositionValue => {
  //   var filename = "";
  //   if (
  //     contentDispositionValue &&
  //     contentDispositionValue.indexOf("attachment") !== -1
  //   ) {
  //     var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  //     var matches = filenameRegex.exec(contentDispositionValue);
  //     if (matches != null && matches[1]) {
  //       filename = matches[1].replace(/['"]/g, "");
  //     }
  //   }
  //   return filename;
  // };

  //TODO
  handleSubmit = event => {
    event.preventDefault();
    //Turiu padaryti failo progreso barą matomą
    this.openFileTransferPopup();
    let isFileNamesSame = false;
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title
      //username: this.state.username
    };
    console.log("Model: " + model);
    let file = new FormData();
    // Check if attachment naming is correct #BaDdEsIgN
    if (
      this.state.mainFile.length === 1 &&
      (this.state.selectedAdditionalFiles === null ||
        this.state.selectedAdditionalFiles.length === 0)
    ) {
      file.append("file", this.state.mainFile[0], this.state.mainFile[0].name);
      file.append("model", JSON.stringify(model));
      axios
        .post("http://localhost:8081/api/docs", file, {
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
    } else if (
      this.state.mainFile.length === 1 &&
      this.state.selectedAdditionalFiles.length > 0
    ) {
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

      this.state.selectedAdditionalFiles.forEach(file => {
        if (file.name === this.state.mainFile[0].name) {
          isFileNamesSame = true;
        }
      });

      if (isFileNamesSame === true) {
        alert("Please select files with different names");
        isFileNamesSame = false;
      } else {
        file.append(
          "file",
          this.state.mainFile[0],
          this.state.mainFile[0].name
        );
        for (let i = 0; i < this.state.selectedAdditionalFiles.length; i++) {
          file.append(
            "file",
            this.state.selectedAdditionalFiles[i],
            this.state.selectedAdditionalFiles[i].name
          );
          file.append("model", JSON.stringify(model));

          console.log(this.state.selectedAdditionalFiles[i]);
          console.log(this.state.selectedAdditionalFiles[i].name);
        }
        axios
          .post("http://localhost:8081/api/docs", file, {
            onUploadProgress: progressEvent => {
              console.log(
                "Upload progress: " +
                  (progressEvent.loaded / progressEvent.total) * 100 +
                  "%"
              );
            }
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
      this.props.history.push("/createdDocuments");
    }
    console.log("Toks yra failas" + file.getAll);
  };

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("Spausdinu userį gautą iš localStorage");
    console.log(currentUser);
    //ankčiau po setState, kaip papildoma funkcija buvo iškart vykdoma axios komanda
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

    console.log("State user yra po visko" + this.state.username);
    console.log("Local storage user po visko " + currentUser.username);
  }

  render() {
    return (
      <NewDocumentComponent
        type={this.state.type}
        typeList={this.state.typeList}
        percentage={this.state.percentage}
        isOpen={this.state.isOpen}
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        onUpdateMainFile={this.onUpdateMainFile}
        onUpdateAdditionalFiles={this.onUpdateAdditionalFiles}
        //downloadHandler={this.downloadHandler}
        handleSubmit={this.handleSubmit}
        openFileTransferPopup={this.openFileTransferPopup}
        closeFileTransferPopup={this.closeFileTransferPopup}
        acceptedFileTypes={acceptedFileTypes}
      />
    );
  }
}

export default NewDocumentContainer;
