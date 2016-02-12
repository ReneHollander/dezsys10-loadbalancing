'use strict';

class RoundRobin {
    constructor() {
        this.sockets = [];
        this.current = 0;
    }

    register(socket) {
        this.sockets.push(socket);
    }

    unregister(socket) {
        this.sockets.remove(socket);
    }

    execute(data, callback) {
        this.sockets[this.current].emit('execute', data, callback);
        this.current++;
        this.current %= this.sockets.length;
    }
}

module.exports = RoundRobin;