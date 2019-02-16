'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _GetUserId = require('./../utils/GetUserId');

var _GetUserId2 = _interopRequireDefault(_GetUserId);

var _TokenGenerator = require('./../utils/TokenGenerator');

var _TokenGenerator2 = _interopRequireDefault(_TokenGenerator);

var _HashPassword = require('./../utils/HashPassword');

var _HashPassword2 = _interopRequireDefault(_HashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
    createUser: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
            var prisma = _ref.prisma;
            var userData, password, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userData = _extends({}, args.data);
                            _context.next = 3;
                            return (0, _HashPassword2.default)(userData.password);

                        case 3:
                            password = _context.sent;
                            _context.next = 6;
                            return prisma.mutation.createUser({
                                data: _extends({}, userData, {
                                    password: password
                                })
                            });

                        case 6:
                            user = _context.sent;
                            return _context.abrupt('return', {
                                user: user,
                                token: (0, _TokenGenerator2.default)(user.id)
                            });

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function createUser(_x, _x2, _x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return createUser;
    }(),
    deleteUser: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
            var prisma = _ref3.prisma,
                request = _ref3.request;
            var userId, user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context2.next = 3;
                            return prisma.mutation.deleteUser({
                                where: {
                                    id: userId
                                }
                            }, info);

                        case 3:
                            user = _context2.sent;
                            return _context2.abrupt('return', user);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function deleteUser(_x5, _x6, _x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return deleteUser;
    }(),
    updateUser: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref5, _ref6, info) {
            var id = _ref5.id,
                data = _ref5.data;
            var prisma = _ref6.prisma,
                request = _ref6.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);

                            if (!(typeof data.password === 'string')) {
                                _context3.next = 5;
                                break;
                            }

                            _context3.next = 4;
                            return (0, _HashPassword2.default)(data.password);

                        case 4:
                            data.password = _context3.sent;

                        case 5:
                            return _context3.abrupt('return', prisma.mutation.updateUser({
                                where: {
                                    id: userId
                                },
                                data: data

                            }, info));

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function updateUser(_x9, _x10, _x11, _x12) {
            return _ref7.apply(this, arguments);
        }

        return updateUser;
    }(),
    createPost: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, _ref8, _ref9, info) {
            var data = _ref8.data;
            var prisma = _ref9.prisma,
                request = _ref9.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            return _context4.abrupt('return', prisma.mutation.createPost({
                                data: {
                                    title: data.title,
                                    body: data.body,
                                    published: data.published,
                                    author: {
                                        connect: {
                                            id: userId
                                        }
                                    }
                                }
                            }, info));

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function createPost(_x13, _x14, _x15, _x16) {
            return _ref10.apply(this, arguments);
        }

        return createPost;
    }(),
    deletePost: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parente, _ref11, _ref12, info) {
            var id = _ref11.id;
            var prisma = _ref12.prisma,
                request = _ref12.request;
            var userId, postExist;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context5.next = 3;
                            return prisma.exists.Post({
                                id: id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            postExist = _context5.sent;

                            if (postExist) {
                                _context5.next = 6;
                                break;
                            }

                            throw new Error('Unable to delete post');

                        case 6:
                            return _context5.abrupt('return', prisma.mutation.deletePost({
                                where: {
                                    id: id
                                }
                            }, info));

                        case 7:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function deletePost(_x17, _x18, _x19, _x20) {
            return _ref13.apply(this, arguments);
        }

        return deletePost;
    }(),
    updatePost: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref14, _ref15, info) {
            var id = _ref14.id,
                data = _ref14.data;
            var prisma = _ref15.prisma,
                request = _ref15.request;
            var userId, postExist, isPublished;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context6.next = 3;
                            return prisma.exists.Post({
                                id: id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            postExist = _context6.sent;

                            if (postExist) {
                                _context6.next = 6;
                                break;
                            }

                            throw new Error('Unable to update post');

                        case 6:
                            _context6.next = 8;
                            return prisma.query.posts({ id: id, published: true });

                        case 8:
                            isPublished = _context6.sent;

                            if (!(isPublished && !data.published)) {
                                _context6.next = 12;
                                break;
                            }

                            _context6.next = 12;
                            return prisma.mutation.deleteManyComments({
                                where: {
                                    post: {
                                        id: id
                                    }
                                }
                            });

                        case 12:
                            return _context6.abrupt('return', prisma.mutation.updatePost({
                                where: {
                                    id: id
                                },
                                data: data
                            }, info));

                        case 13:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function updatePost(_x21, _x22, _x23, _x24) {
            return _ref16.apply(this, arguments);
        }

        return updatePost;
    }(),
    createComment: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, _ref17, _ref18, info) {
            var data = _ref17.data;
            var prisma = _ref18.prisma,
                request = _ref18.request;
            var userId, postExists;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context7.next = 3;
                            return prisma.exists.Post({
                                id: data.post,
                                published: true
                            });

                        case 3:
                            postExists = _context7.sent;

                            if (postExists) {
                                _context7.next = 6;
                                break;
                            }

                            throw new Error('Unable to find post');

                        case 6:
                            return _context7.abrupt('return', prisma.mutation.createComment({
                                data: {
                                    text: data.text,
                                    author: {
                                        connect: {
                                            id: userId
                                        }
                                    },
                                    post: {
                                        connect: {
                                            id: data.post
                                        }
                                    }
                                }
                            }, info));

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function createComment(_x25, _x26, _x27, _x28) {
            return _ref19.apply(this, arguments);
        }

        return createComment;
    }(),
    deleteComment: function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, _ref20, _ref21, info) {
            var id = _ref20.id;
            var prisma = _ref21.prisma,
                request = _ref21.request;
            var userId, commentExist;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context8.next = 3;
                            return prisma.exists.Comment({
                                id: id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            commentExist = _context8.sent;

                            if (commentExist) {
                                _context8.next = 6;
                                break;
                            }

                            throw new Error('Unable to delete comment');

                        case 6:
                            return _context8.abrupt('return', prisma.mutation.deleteComment({
                                where: {
                                    id: id
                                }
                            }, info));

                        case 7:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function deleteComment(_x29, _x30, _x31, _x32) {
            return _ref22.apply(this, arguments);
        }

        return deleteComment;
    }(),
    updateComment: function () {
        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, _ref23, _ref24, info) {
            var id = _ref23.id,
                data = _ref23.data;
            var prisma = _ref24.prisma,
                request = _ref24.request;
            var userId, commentExist;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            userId = (0, _GetUserId2.default)(request);
                            _context9.next = 3;
                            return prisma.exists.Comment({
                                id: id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            commentExist = _context9.sent;

                            if (commentExist) {
                                _context9.next = 6;
                                break;
                            }

                            throw new Error('Unable to update comment');

                        case 6:
                            return _context9.abrupt('return', prisma.mutation.updateComment({
                                where: {
                                    id: id
                                },
                                data: data
                            }, info));

                        case 7:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function updateComment(_x33, _x34, _x35, _x36) {
            return _ref25.apply(this, arguments);
        }

        return updateComment;
    }(),
    login: function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, _ref26, _ref27, info) {
            var email = _ref26.email,
                password = _ref26.password;
            var prisma = _ref27.prisma;
            var usr, isLoginSuccessful, token;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return prisma.query.user({
                                where: {
                                    email: email
                                }
                            });

                        case 2:
                            usr = _context10.sent;

                            if (usr) {
                                _context10.next = 5;
                                break;
                            }

                            throw new Error('Unable to login!');

                        case 5:
                            _context10.next = 7;
                            return _bcryptjs2.default.compare(password, usr.password);

                        case 7:
                            isLoginSuccessful = _context10.sent;

                            if (isLoginSuccessful) {
                                _context10.next = 10;
                                break;
                            }

                            throw new Error('Unable to login!');

                        case 10:
                            token = (0, _TokenGenerator2.default)(usr.id);
                            return _context10.abrupt('return', {
                                token: token,
                                user: usr
                            });

                        case 12:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function login(_x37, _x38, _x39, _x40) {
            return _ref28.apply(this, arguments);
        }

        return login;
    }()
};

exports.default = Mutation;