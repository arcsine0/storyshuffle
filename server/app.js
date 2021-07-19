const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        allowedHeaders: ['customHeader'],
        credentials: true
    }
});

var port = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('User Connected', socket.id);
    socket.emit('roomID', { id: socket.id });
    
    socket.on('joinRoom', socket_cl => {
        console.log('User', socket.id, 'is joining room', socket_cl.joinID);
        socket_cl.join(socket_cl.joinID);
    })
})
io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});

http.listen(port, () => {
    console.log('listening on port', port);
});