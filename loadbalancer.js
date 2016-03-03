'use strict';

const debug = require('debug')('loadbalancer');
const minimist = require('minimist');
const LoadBalancer = require('./lib/loadbalancer');
const Koa = require('koa');
const Router = require('koa-router');

var args = minimist(process.argv.slice(2));
if (!args.balancerport) args.balancerport = 5001;
if (!args.algorithm) args.algorithm = 'roundrobin';
if (!args.webport) args.webport = 5000;

const BalancerAlgorithm = require('./lib/strategies/' + args.algorithm);
let loadBalancer = new LoadBalancer(args.balancerport, new BalancerAlgorithm(args));

let koa = new Koa();

koa.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});

let router = new Router();

router.get('/pi/', function *(next) {
    debug('Got new request');
    this.body = yield loadBalancer.execute();
    yield next;
});

router.get('/pi/:digits', function *(next) {
    debug('Got new request for ' + this.params.digits + ' digits');
    this.body = yield loadBalancer.execute({digits: this.params.digits});
    yield next;
});

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(args.webport);

debug('Waiting for services on ' + args.balancerport);
debug('Waiting for http requests on ' + args.webport);
debug('Started loadbalancer using algorithm ' + args.algorithm);
