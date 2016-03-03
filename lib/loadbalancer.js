'use strict';

const debug = require('debug')('loadbalancer');
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
                debug("Service " + data.name + " registered")
            });

            socket.on('disconnect', () => {
                if (!socket.data) return;
                this.strategy.unregister(socket);
                debug("Service " + socket.data.name + " unregistered")
            });
        });
    }

    execute(data) {
        let that = this;
        return new Promise(function (resolve, reject) {
            that.strategy.execute(data, resolve, reject);
        });
    }

}

module.exports = LoadBalancer;
