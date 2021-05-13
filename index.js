const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    let current_user
    socket.on('name', name => {
        current_user = name
        io.emit('chat message', `${current_user} has entered the chat`)

        socket.on('disconnect', () => {
        io.emit('chat message', `${current_user} has left the chat`)
        })
    })
    socket.on('chat message', msg => {
        io.emit('chat message', `${current_user}: ${msg}`)
    })
  })

server.listen(3000, () => {
  console.log('listening on *:3000');
});