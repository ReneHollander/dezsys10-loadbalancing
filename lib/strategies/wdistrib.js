'use strict';

class WeightedDistribution {
    constructor() {
        this.sockets = [];
        this.current = 0;
    }

    register(socket) {
        if (!socket.data.options.weight) socket.data.options.weight = 1;
        this.sockets.push({s: socket, weight: socket.data.options.weight});
    }

    unregister(socket) {
        for (let i = 0; i < this.sockets.length; i++) {
            if (this.sockets[i].s == socket) {
                this.sockets.splice(i, 1);
            }
        }
    }

    execute(data, resolve, reject) {
        if (this.sockets == 0) {
            reject(new Error("Not a single service has registered by now"));
        }
        let serv = this.sockets.sort(function (a, b) {
            return b.weight - a.weight;
        })[0];
        serv.s.emit('execute', data, (data) => {
            serv.weight++;
            resolve(data)
        });
        serv.weight--;
    }
}

module.exports = WeightedDistribution;