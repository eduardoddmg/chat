const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
app.use(cors());

const { Server } = require("socket.io");
const { createServer } = require('http');
const httpServer = createServer(app);

const io = new Server(httpServer, { 
  cors: {
    origin: "*"
  }
});

const messages = [];
const users = []

io.on("connection", (socket) => {
  console.log(socket.id);  
  socket.on('chat message', (msg) => {
    messages.push(msg);
    io.emit('chat message', messages);
  });
});


require("dotenv").config();

const initRoutes = require('./routes');

// settings
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());

// routes
initRoutes(app);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);


// routes
app.get("/", (req, res) => {
  return res.send("Welcome to API");
});

app.all("*", (req, res) => {
  return res.send("rota inválida :(");
});

httpServer.listen(3001, () => console.log('SERVER RUNNING'));