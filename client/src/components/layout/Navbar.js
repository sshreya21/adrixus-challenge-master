import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      auth:false
    }
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token)
      this.setState({ auth: true });
  }
   logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }
  render() {
    const token = localStorage.getItem("token");
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/login"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
            {(this.state.auth || token) &&
            <Link to="/" onClick={this.logOut.bind(this)} style={{ marginRight: "15px", display: "flex", flexDirection: "row-reverse" }}>
                    <span className="navbartext black-text"> logOut</span>
                  </Link>}
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;