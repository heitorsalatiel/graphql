'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GetUserId = require('../utils/GetUserId');

var _GetUserId2 = _interopRequireDefault(_GetUserId);

var _prisma = require('../prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    email: {
        fragment: 'fragment userId on User{ id }',
        resolve: function resolve(parent, args, _ref, info) {
            var request = _ref.request;

            var userId = (0, _GetUserId2.default)(request, false);
            return userId && userId === parent.id ? parent.email : null;
        }
    },
    posts: {
        fragment: 'fragment userId on User{id}',
        resolve: function resolve(parent, args, _ref2, info) {
            var request = _ref2.request,
                prisma = _ref2.prisma;

            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            }, info);
        }
    }

};

exports.default = User;