'use strict';

class ServerProbes {
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

    updateStats() {
        this.sockets.forEach((socket) => {
            socket.emit('load', {}, (data) => {
                console.log(data);
            });
        });
    }

    execute(data, callback) {
        this.updateStats();
        this.sockets[this.current].emit('execute', data, callback);
        this.current++;
        this.current %= this.sockets.length;
    }
}

module.exports = ServerProbes;