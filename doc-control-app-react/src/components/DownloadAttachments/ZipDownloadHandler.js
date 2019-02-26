import Axios from "axios";
import extractFileName from "./ExtractFileName";
export default function zipDownloadHandler(event) {
  Axios({
    url: "http://localhost:8081/api/docs/download/all",
    method: "GET",
    responseType: "blob" // important
  })
    .then(response => {
      var filename = extractFileName(response.headers["content-disposition"]);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      console.log(err);
    });
}