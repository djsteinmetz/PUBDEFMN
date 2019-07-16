import React, { Component } from "react";
import { auth } from "../../firebase";
import Nav from "../../components/Nav";

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
        window.location = "/";
      })
      .catch(error => {
        console.log(error);
        this.setState({ message: error.message });
      });
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Nav isLoggedIn={this.state.isLoggedIn} logout={this.handleSignOut} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSignIn}>
                <h1 class="text-xl font-bold text-center mt-4">
                  Log in to your Stat.US account
                </h1>
                <div className="max-w-md m-auto mt-3">
                  <label
                    class="block text-gray-500 text-l text-sm font-bold mb-1"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                    id="email"
                    type="text"
                    placeholder="Email"
                  />
                  <label
                    class="block text-gray-500 text-sm font-bold mb-1 mt-4"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChange}
                    placeholder="*********************"
                  />
                  {this.state.message && (
                    <p className="text-xs italic text-red-600">
                      {this.state.message}
                    </p>
                  )}
                  <button
                    className="px-4 py-2 bg-pink-200 font-uppercase font-bold text-sm rounded-sm mt-4"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
