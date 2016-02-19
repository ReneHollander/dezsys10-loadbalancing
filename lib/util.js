'use strict';

var os = require("os");

module.exports.cpuAverage = function () {
    let totalIdle = 0, totalTick = 0;
    let cpus = os.cpus();

    let resp = [];

    for (let i = 0, len = cpus.length; i < len; i++) {
        let data = {};
        let cpu = cpus[i];
        let total = 0;

        for (let type in cpu.times) {
            if (cpu.times.hasOwnProperty(type)) {
                total += cpu.times[type];
            }
        }

        for (let type in cpu.times) {
            if (cpu.times.hasOwnProperty(type)) {
                data[type] = Math.round(100 * cpu.times[type] / total);
            }
        }
        resp[i] = data;
    }

    return resp;
};
