'use strict';

const SocketIO = require('socket.io-client');

class Service {
    constructor(address, name) {
        this.name = name;
        this.socket = SocketIO.connect(address);
        this.socket.emit('register', {name});
        this.socket.on('execute', (data, callback) => this.execute(this, data, callback));
    }

    execute(that, data, callback) {
        data.service = that.name;
        callback(data);
    }

}

module.exports = Service;