import React, { Component } from "react";
import { auth } from "../../firebase"
import Nav from '../../components/Nav';

class Login extends Component {
  state = {
    isLoggedIn: false,
    email: "",
    password: ""
  };

  handleSignIn = e => {
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("signing in: " + this.state.email);
        this.setState({
          isLoggedIn: true,
          message: ""
        });
        window.location = "/"
      })
      .catch(error => {
        this.setState({ message: error.message });
      });
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          isLoggedIn={this.state.isLoggedIn}
          logout={this.handleSignOut}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <form onSubmit={this.handleSignIn}>
                <div>
                  <strong>Log in to your MNPUBDEF account.</strong>
                </div>
                <div >
                  <input type="text" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email"></input>
                  <input type="password" value={this.state.password} name="password" onChange={this.handleChange} placeholder="Password"></input>
                  <div className="row">
                    <div id="error" className="col-12 text-danger"></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={this.handleCloseModal} data-dismiss="modal">Close</button>
                  <button className="btn btn-light" type="submit">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;
