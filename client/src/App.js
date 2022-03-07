import React, { Component } from "react";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import UserList from "./components/users/UserList";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router,Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
    <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/user" component={UserList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
  </Router>
    );
  }
}
export default App;
