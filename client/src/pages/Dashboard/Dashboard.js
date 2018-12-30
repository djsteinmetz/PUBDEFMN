import React, { Component } from "react";
import { firebase, auth } from "../../firebase"
import API from "../../utils/API";
import moment from 'moment';
import Nav from "../../components/Nav";
import UserListItem from "../../components/UserListItem";
import io from 'socket.io-client';
const socket = io();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allUsers: [],
      filteredUsers: [],
      isLoggedIn: false,
      uid: "",
      status: "",
      updated: "",
      notes: "",
      newNotes: "",
      // User Authentication
      message: "",
      email: "",
      password: ""
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.loadUser = this.loadUser.bind(this);
  };
  getAllUsers = () => {
    API.loadAllUsers().then(res => this.setState({ allUsers: res.data, filteredUsers: res.data })).catch(err => console.log(err));
  }
  componentWillMount = () => {
    this.onAuthStateChanged();
    this.getAllUsers();
    this.setState({
      status: []
    });
  };
  loadUser = id => {
    API.loadUser(id)
      .then(res =>
        this.setState({
          uid: res.data.uid,
          email: res.data.email,
          name: res.data.name,
          status: res.data.status,
          notes: res.data.notes,
          updated: res.data.updated
        })
      )
      .catch(err => console.log(err));
  };
  // Upon page refresh, if the user is logged in, they will stay logged in
  onAuthStateChanged = () => {
    const bindThis = this;
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        bindThis.setState({ isLoggedIn: true });
        this.loadUser(user.uid)
      } else {
        console.log("Please sign-in or sign-up.");
      };
    });
  };

  handleSignOut = e => {
    e.preventDefault();
    auth
      .doSignOut()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          email: "",
          password: ""
        });
        window.location = "/";
      });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clearNotes = e => {
    e.preventDefault();
    this.setState({ notes: "" });
    this.handleChange(e);
  }
  handleStatusChange = e => {
    e.preventDefault();
    const data = {
      status: this.state.status,
      notes: this.state.notes,
      updated: Date.now()
    };
    API.updateStatus(this.state.uid, data).catch(err => console.log(err));

    // Emit events
    socket.emit('user-update', {
      func: this.getAllUsers(),
      uid: this.state.uid,
      status: this.state.status,
      notes: this.state.notes
    });
  }
  filterList = event => {
    let updatedList = this.state.allUsers;
    updatedList = updatedList.filter(function (user) {
      return user.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: updatedList });
  }

  render() {
    // Listen for events and run custom functions *after* the anon functions of the .on() method.
    socket.on('user-update', () => { return null }, this.getAllUsers());
    return (
      <React.Fragment>
        <Nav
          isLoggedIn={this.state.isLoggedIn}
          logout={this.handleSignOut}
        />
        {this.state.isLoggedIn === true ? (
          <span>
            <div className="currentUser">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-3 col-9">
                              <p className="currentName">{this.state.name}</p>
                              <p className="timestamp">{moment(this.state.updated).format("MM/DD/YY, h:mm:ss a")}</p>
                            </div>
                            <div className="col-md-2 col-1">
                              <p className={`text-center currentStatus ${this.state.status}`}>{this.state.status}</p>
                            </div>
                            <div className="col-md-7">
                              <p>{this.state.notes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.handleStatusChange.bind(this)}>
                          <div className="form-group">
                            <label htmlFor="status">Example select</label>
                            <select className="form-control" name="status" id="status" onChange={this.clearNotes}>
                              <option>Select a Status</option>
                              <option>In</option>
                              <option>Out</option>
                              <option value="Court">Court (Specify Judge)</option>
                              <option>LEC</option>
                              <option>Jail</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="notes">Notes</label>
                            <input onChange={this.handleChange} name="notes" className="form-control" id="notes" />
                          </div>
                          <div>
                            <button className="btn btn-light" type="submit" id="updateStatus" onClick={this.userUpdate}>Change Status</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <input type="text" className="form-control userSearch" placeholder="Search" onChange={this.filterList} pattern="[A-Za-z]" />
                </div>
              </div>
            </div>
            <div id="userList">
              {this.state.filteredUsers.length ? this.state.filteredUsers.map((user, i) => (
                <UserListItem
                  key={user.uid}
                  evenOdd={i}
                  name={user.name}
                  updated={user.updated}
                  status={user.status}
                  notes={user.notes}
                />

              )) : (
                  <div className={`userList`}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <p>No users found!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </span>
        ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>Please Sign in!</p>
                </div>
              </div>
            </div>
          )}
      </React.Fragment>
    );
  };
};
