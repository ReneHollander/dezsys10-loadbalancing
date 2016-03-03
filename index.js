'use strict';

const minimist = require('minimist');
const Koa = require('koa');
const Router = require('koa-router');

const LoadBalancer = require('./lib/loadbalancer');
const RoundRobin = require('./lib/strategies/roundrobin');
const ServerProbes = require('./lib/strategies/serverprobes');
const Service = require('./lib/service');
const LeastConnections = require('./lib/strategies/lconnections');
const WeightedDistribution = require('./lib/strategies/wdistrib');

let loadBalancer = new LoadBalancer(5001, new WeightedDistribution());
new Service('http://localhost:5001', 'service1', 2);
new Service('http://localhost:5001', 'service2', 3);
new Service('http://localhost:5001', 'service3', 1);

let koa = new Koa();
let router = new Router();

router.get('/', function *(next) {
    this.body = yield loadBalancer.execute();
    yield next;
});

router.get('/:digits', function *(next) {
    this.body = yield loadBalancer.execute({digits: this.params.digits});
    yield next;
});

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(5000);
