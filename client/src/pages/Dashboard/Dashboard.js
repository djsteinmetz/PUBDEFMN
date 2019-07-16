import React, { Component } from "react";
import { firebase, auth } from "../../firebase";
import API from "../../utils/API";
import moment from "moment";
import Nav from "../../components/Nav";
import UserListItem from "../../components/UserListItem";
import io from "socket.io-client";
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
      password: "",
      socket: {}
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }
  getAllUsers = () => {
    API.loadAllUsers()
      .then(res =>
        this.setState({ allUsers: res.data, filteredUsers: res.data })
      )
      .catch(err => console.log(err));
  };
  componentWillMount = () => {
    this.onAuthStateChanged();
    this.getAllUsers();
    this.setState({
      status: [],
      socket: socket
    });
  };
  componentDidMount = () => {
    console.log("mounted component");
    // Listen for events and run custom functions *after* the anon functions of the .on() method.
    this.state.socket.on("user-update", data => {
      console.log(data);
      API.loadAllUsers().then(res => {
        console.log(res);
        this.setState({ allUsers: res.data, filteredUsers: res.data });
      });
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
        this.loadUser(user.uid);
      } else {
        console.log("Please sign-in or sign-up.");
      }
    });
  };

  handleSignOut = e => {
    e.preventDefault();
    auth.doSignOut().then(() => {
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
      [name]: value
    });
  };

  clearNotes = e => {
    e.preventDefault();
    this.setState({ notes: "" });
    this.handleChange(e);
  };
  handleStatusChange = e => {
    e.preventDefault();
    const data = {
      status: this.state.status,
      notes: this.state.notes,
      updated: Date.now()
    };
    API.updateStatus(this.state.uid, data).catch(err => console.log(err));

    // Emit events
    this.state.socket.emit("user-update", {
      uid: this.state.uid,
      status: this.state.status,
      notes: this.state.notes,
      getUsers: this.getAllUsers()
    });
  };
  filterList = event => {
    let updatedList = this.state.allUsers;
    updatedList = updatedList.filter(function(user) {
      return (
        user.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ filteredUsers: updatedList });
  };

  render() {
    return (
      <React.Fragment>
        <Nav isLoggedIn={this.state.isLoggedIn} logout={this.handleSignOut} />
        {this.state.isLoggedIn === true ? (
          <span>
            <div className="bg-gray-200 px-6 py-3">
              <p className="text-2xl font-bold font-gray-800">
                {this.state.name}
              </p>
              <p>{moment(this.state.updated).format("MM/DD/YY, h:mm:ss a")}</p>
              <p className={`text-center currentStatus ${this.state.status}`}>
                {this.state.status}
              </p>
              {this.state.notes && <p>{this.state.notes}</p>}
              <form onSubmit={this.handleStatusChange.bind(this)}>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Change your status
                </label>
                <select
                  name="status"
                  id="status"
                  onChange={this.clearNotes}
                  className="shadow border rounded w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option disabled>{this.state.status}</option>
                  <option>In</option>
                  <option>Out</option>
                  <option value="Court">Court (Specify Judge)</option>
                  <option>LEC</option>
                  <option>Jail</option>
                </select>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <input
                  className="shadow appearance-none border rounded w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.notes}
                  placeholder="Notes about your status ..."
                  onChange={this.handleChange}
                  name="notes"
                  id="notes"
                />
                <div>
                  <button
                    className="px-4 py-3 bg-gray-400 uppercase font-bold text-sm rounded-lg focus:outline-none focus:shadow-outline"
                    type="submit"
                    id="updateStatus"
                    onClick={this.userUpdate}
                  >
                    Change Status
                  </button>
                </div>
              </form>
            </div>
            <div className="container px-5">
              <input
                type="text"
                className="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Search a name"
                onChange={this.filterList}
                pattern="[A-Za-z]"
              />
            </div>
            <div id="userList">
              {this.state.filteredUsers.length ? (
                this.state.filteredUsers.map((user, i) => (
                  <UserListItem
                    key={user.uid}
                    evenOdd={i}
                    name={user.name}
                    updated={user.updated}
                    status={user.status}
                    notes={user.notes}
                  />
                ))
              ) : (
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
  }
}
