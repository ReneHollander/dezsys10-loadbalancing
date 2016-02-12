'use strict';

const minimist = require('minimist');
const Koa = require('koa');

const LoadBalancer = require('./lib/loadbalancer');
const RoundRobin = require('./lib/strategies/roundrobin');
const Service = require('./lib/service');

let loadBalancer = new LoadBalancer(5001, new RoundRobin());
let service = new Service('http://localhost:5001', 'service1');

let koa = new Koa();

koa.use(function *() {
    loadBalancer.execute({title: "Hello World"});
    this.body = "Hello World!";
});

koa.listen(5000);
