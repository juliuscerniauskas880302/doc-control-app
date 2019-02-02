import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Authentication from "./components/Authentication/Authentication";
import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={props => <Authentication {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
