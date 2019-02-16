"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GetUserId = require("../utils/GetUserId");

var _GetUserId2 = _interopRequireDefault(_GetUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {
    comment: {
        subscribe: function subscribe(parent, _ref, _ref2, info) {
            var postId = _ref.postId;
            var prisma = _ref2.prisma;

            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info);
        }
    },
    post: {
        subscribe: function subscribe(parent, _ref3, _ref4, info) {
            var published = _ref3.published;
            var prisma = _ref4.prisma;

            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info);
        }
    },
    myPost: {
        subscribe: function subscribe(parent, args, _ref5, info) {
            var prisma = _ref5.prisma,
                request = _ref5.request;

            var userId = (0, _GetUserId2.default)(request);
            return prisma.subscription.post({
                where: {
                    node: {
                        author: {
                            id: userId
                        }
                    }
                }
            }, info);
        }
    }
};

exports.default = Subscription;