'use strict';

require('@babel/polyfill/noConflict');

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.start({ port: process.env.PORT || 4000 }, function () {
    console.log('The server is up!');
});