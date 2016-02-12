var SocketIO = require('socket.io-client');

var socket = SocketIO.connect('http://localhost:5001');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', {my: 'data'});
});