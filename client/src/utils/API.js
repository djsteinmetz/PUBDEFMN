import axios from "axios";

export default {
  // Get all users
  loadAllUsers: function () {
    return axios.get("/api/user")
  },
  loadUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Add a new user
  register: function (data) {
    return axios.post("/api/user/", data).catch(err => console.log(err));
  },
  updateStatus: function(id, data) {
    return axios.put("api/user/" + id, data).catch(err => console.log(err));
  }
};
