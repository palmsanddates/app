"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _API = _interopRequireDefault(require("../utils/API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }

  _createClass(AuthService, [{
    key: "signup",
    value: function signup(name, email, institutionId) {
      var res;
      return regeneratorRuntime.async(function signup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_API["default"].put('/auth/signup', {
                name: name,
                email: email,
                institutionId: institutionId
              }));

            case 2:
              res = _context.sent;

              if (res.data.token) {
                localStorage.setItem('user', JSON.stringify(res.data));
              }

              return _context.abrupt("return", res.data);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "login",
    value: function login(email, password) {
      var res;
      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_API["default"].post('/auth/login', {
                email: email,
                password: password
              }));

            case 2:
              res = _context2.sent;

              if (res.data.token) {
                localStorage.setItem('user', JSON.stringify(res.data));
              }

              return _context2.abrupt("return", res.data);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      localStorage.removeItem('user');
    }
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  }]);

  return AuthService;
}();

var _default = new AuthService();

exports["default"] = _default;