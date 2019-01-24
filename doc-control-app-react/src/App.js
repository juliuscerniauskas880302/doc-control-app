import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ResourceNotFound from "./components/errors/ResourceNotFound";

class App extends Component {
  render() {
    return (
      <div>
        <ResourceNotFound />
      </div>
    );
  }
}

export default App;
