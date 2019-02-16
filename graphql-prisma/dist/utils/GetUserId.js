'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request) {
    var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    //The first one is the header for Query and Mutation. In other hand the second one is for Subscription
    var header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
    if (header) {
        var codeToken = header.replace('Bearer ', '');
        var decoded = _jsonwebtoken2.default.verify(codeToken, 'thisisasecret');
        return decoded.userId;
    }

    if (requireAuth) throw new Error('Authentication Required');

    return null;
};

exports.default = getUserId;