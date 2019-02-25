import Axios from "axios";
import extractFileName from "./ExtractFileName";
export default function csvDownloadHandler(event) {
  Axios({
    url: "http://localhost:8081/api/docs/csv/download",
    method: "GET",
    responseType: "blob" // important
  }).then(response => {
    var filename = extractFileName(response.headers["content-disposition"]);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
