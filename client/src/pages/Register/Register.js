import React, { Component } from "react";
import Nav from '../../components/Nav';
import API from '../../utils/API';
import { firebase, auth } from "../../firebase"

class Register extends Component {
    state = {
        isLoggedIn: false,
        email: "",
        name: "",
        password: ""
    };
    componentWillMount = () => {
        this.onAuthStateChanged();
    }
    onAuthStateChanged = () => {
        const bindThis = this;
        firebase.auth.onAuthStateChanged(user => {
          if (user) {
            console.log(user);
            // console.log(user.uid);
            bindThis.setState({ isLoggedIn: true, email: user.email, uid: user.uid });
            window.location = "/"
          } else {
            console.log("Please sign-in or sign-up.");
          };
        });
      };
    handleSignUp = e => {
        e.preventDefault();
        auth
            .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
                console.log("signing up: " + this.state.email);
                this.setState({
                    isLoggedIn: true,
                    message: ""
                });
                const data = {
                    name: this.state.name,
                    uid: res.user.uid,
                    email: res.user.email,
                    status: "Out",
                    notes: ""
                }
                API.register(data).then((res) => {console.log(`API RES!!!!!!!! ${res}`)});
            })
            .catch(error => {
                this.setState({ message: error.message })
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
                            <input className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Full Name"></input>
                            <form onSubmit={this.handleSignUp}>
                                <div>
                                    <strong>Register for the MNPUBDEF SignIn Tracker</strong>
                                </div>
                                <div className="form-group text-center">
                                    <input className="form-control" type="text" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email"></input>
                                    <input className="form-control" type="password" value={this.state.password} name="password" onChange={this.handleChange} placeholder="Password"></input>
                                    <div className="row">
                                        <div id="error" className="col-12 text-danger"></div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-light" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Register;
