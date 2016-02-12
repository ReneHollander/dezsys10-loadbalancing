'use strict';

class RoundRobin {
    constructor() {
        this.sockets = [];
    }

    register(socket) {
        this.sockets.push(socket);
    }

    unregister(socket) {
        this.sockets.remove(socket);
    }

    execute(data) {
        this.sockets[0].emit('execute', data);
    }
}

module.exports = RoundRobin;