const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const socket = require('socket.io');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGOLAB_BRONZE_URI || "mongodb://localhost/PUBDEFMN");

// Start the API server
const server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  socket.on('user-update', function (data) {
    console.log("DATA FROM THE SOCKET", data);
    io.sockets.emit('user-update', data);
  });
});