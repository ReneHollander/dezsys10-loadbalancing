'use strict';

class WeightedDistribution {
    constructor() {
        this.sockets = [];
        this.current = 0;
    }

    register(socket) {
        this.sockets.push({s: socket, weight: socket.data.weight});
    }

    unregister(socket) {
        for(let i = 0; i < sockets.length; i++) {
            if(this.sockets[i].s == socket) {
                this.sockets.remove(i);
            }
        }
    }

    execute(data, callback) {
        let serv = this.sockets.sort(function(a,b) {
            return b.weight - a.weight;
        })[0];
        serv.s.emit('execute', data, (data) => {
            serv.weight++;
            callback(data)
        });
        serv.weight--;
    }
}

module.exports = WeightedDistribution;