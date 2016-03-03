'use strict';

const debug = require('debug')('service');
const minimist = require('minimist');
const uuid = require('node-uuid');
const Service = require('./lib/service');

var args = minimist(process.argv.slice(2));
if (!args.hostname) args.hostname = 'localhost';
if (!args.port) args.port = 5001;
if (!args.name) args.name = uuid.v4();

var options = {};
if (args.weight) options.weight = args.weight;

new Service('http://' + args.hostname + ':' + args.port, args.name, options);