'use strict';

const SocketIO = require('socket.io-client');

class Service {
    constructor(address, name) {
        this.socket = SocketIO.connect(address);
        this.socket.emit('register', {name});
        this.socket.on('execute', (data) => {
            console.log(data);
        });
    }
}

module.exports = Service;