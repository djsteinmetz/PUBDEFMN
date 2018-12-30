const db = require("../models");
console.log("controller loaded")
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

// socket.on('user-update', function(data) {
//   console.log('data from the users.js api route file', data);
//   db.User.find().sort({ name: 1 }).then(dbModel => res.json(dbModel));
// })
// Defining methods for the PUBDEFMN signIn sheet
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.User
      .findOne({uid: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ uid: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
