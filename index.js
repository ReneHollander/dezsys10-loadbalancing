'use strict';

const minimist = require('minimist');
const Koa = require('koa');
const Router = require('koa-router');

const LoadBalancer = require('./lib/loadbalancer');
const RoundRobin = require('./lib/strategies/roundrobin');
const ServerProbes = require('./lib/strategies/serverprobes');
const Service = require('./lib/service');

//let loadBalancer = new LoadBalancer(5001, new RoundRobin());
let loadBalancer = new LoadBalancer(5001, new ServerProbes());
new Service('http://localhost:5001', 'service1');
new Service('http://localhost:5001', 'service2');

let koa = new Koa();
let router = new Router();

router.get('/', function *(next) {
    this.body = yield loadBalancer.execute({hello: "world"});
    yield next;
});

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(5000);
