import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavigationContainer from "./components/Navigation/NavigationContainer";
import Authentication from "./components/Authentication/Authentication";

class App extends Component {
  render() {
    return (
      <div>
        <Authentication />
      </div>
    );
  }
}

export default App;
