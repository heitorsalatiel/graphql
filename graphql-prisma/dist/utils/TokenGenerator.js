"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignToken = function SignToken(id) {
    return _jsonwebtoken2.default.sign({ userId: id }, process.env.PRISMA_TOKEN_SECRET, { expiresIn: "7 days" });
};

exports.default = SignToken;