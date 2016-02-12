'use strict';

const SocketIO = require('socket.io');

class LoadBalancer {
    constructor(port, strategy) {
        this.io = new SocketIO(port);
        this.strategy = strategy;
        this.strategy.io = this.io;

        this.io.on('connection', (socket) => {
            socket.on('register', (data) => {
                socket.data = data;
                this.strategy.register(socket);
                console.log("Service " + data.name + " registered")
            });

            socket.on('disconnect', () => {
                this.strategy.unregister(socket);
                console.log("Service " + socket.session.name + " unregistered")
            });
        });
    }

    execute(data) {
        this.strategy.execute(data);
    }

}

module.exports = LoadBalancer;
