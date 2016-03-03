'use strict';

const debug = require('debug')('service');
const SocketIO = require('socket.io-client');
const pi = require('./pi');

class Service {
    constructor(address, name, options) {
        this.name = name;
        this.socket = SocketIO.connect(address);
        this.socket.on('connect', () => {
            debug('Connected to loadbalancer');
            this.socket.emit('register', {name, options});
        });
        this.socket.on('disconnect', () => {
            debug('Disconnected from loadbalancer');
        });
        this.socket.on('execute', (data, callback) => this.onExecute(this, data, callback));
    }

    onExecute(that, data, callback) {
        if (!data) data = {};
        data.service = that.name;
        if (!data.digits) data.digits = 10;
        debug('Got request for ' + data.digits + ' digits of pi');
        pi.calculate(data.digits, (estimate) => {
            debug('Finished calculating ' + data.digits + ' digits of pi');
            callback({service: that.name, pi: estimate})
        });
    }
}

module.exports = Service;
