const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Mention The Port Here

var port = process.env.port || 8000;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.ejs', {port: port});
});


io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


const server = http.listen(port, function() {
    console.log('App Is Running On *:8000');
    console.log('Made By Anubhab');
});


