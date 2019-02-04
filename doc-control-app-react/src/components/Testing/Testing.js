import React, { Component } from "react";
import Axios from "axios";

export default class Testing extends Component {
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

  downloadHandler = () => {
    // 70a73980-02d1-4e63-a577-6e59b25c976b
    // Axios.get(
    //   "http://localhost:8081/api/docs/70a73980-02d1-4e63-a577-6e59b25c976b/download"
    // ).then(res => FileSaver.saveAs(res.data, "effectiveFileName"));

    Axios({
      url: "http://localhost:8081/api/docs/julius/download/all", //doc id
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

  render() {
    return (
      <div>
        <button onClick={() => this.downloadHandler()}>Download zip</button>
      </div>
    );
  }
}
