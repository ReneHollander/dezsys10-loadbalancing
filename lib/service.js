'use strict';

const SocketIO = require('socket.io-client');
const util = require('./util');
const os = require('os');
const pi = require('./pi');

class Service {
    constructor(address, name, weight) {
        this.name = name;
        this.socket = SocketIO.connect(address);
        this.socket.emit('register', {name, weight});
        this.socket.on('execute', (data, callback) => this.onExecute(this, data, callback));
        this.socket.on('load', (data, callback) => this.onLoad(this, data, callback));
    }

    onExecute(that, data, callback) {
        data.service = that.name;
        pi.calculate(1000000000, (err, estimate) => {
            callback({service: that.name, pi: estimate})
        });
    }

    onLoad(that, data, callback) {
        callback({
            cpu: util.cpuAverage(),
            mem: {
                free: os.freemem(),
                total: os.totalmem(),
                used: os.totalmem() - os.freemem()
            }
        });
    }

}

module.exports = Service;