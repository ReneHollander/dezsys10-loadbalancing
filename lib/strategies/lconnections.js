'use strict';

class LeastConnections {
    constructor() {
        this.sockets = [];
        this.current = 0;
    }

    register(socket) {
        this.sockets.push({s: socket, active: 0});
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
            return a.active - b.active;
        })[0];
        serv.s.emit('execute', data, (data) => {
            serv.active--;
            callback(data)
        });
        serv.active++;
    }
}

module.exports = LeastConnections;