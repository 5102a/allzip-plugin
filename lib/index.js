"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.define-property.js");

var _jszip = _interopRequireDefault(require("jszip"));

var _webpackSources = require("webpack-sources");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var zip = new _jszip["default"]();

var AllZipPlugin = /*#__PURE__*/function () {
  function AllZipPlugin(options) {
    _classCallCheck(this, AllZipPlugin);

    this.options = options;
  }

  _createClass(AllZipPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tapAsync('AllZipPlugin', function (compilation, callback) {
        var _ref = _this.options || {},
            _ref$filename = _ref.filename,
            filename = _ref$filename === void 0 ? 'assets' : _ref$filename,
            _ref$fileOptions = _ref.fileOptions,
            fileOptions = _ref$fileOptions === void 0 ? {} : _ref$fileOptions,
            _ref$generateOptions = _ref.generateOptions,
            generateOptions = _ref$generateOptions === void 0 ? {
          type: 'nodeBuffer'
        } : _ref$generateOptions;

        var folder = zip.folder(filename);

        for (var file in compilation.assets) {
          var source = compilation.assets[file].source();
          folder.file(file, source, fileOptions);
        }

        zip.generateAsync(generateOptions).then(function (content) {
          var name = filename + '.zip';
          compilation.assets[name] = new _webpackSources.RawSource(content);
          callback();
        });
      });
    }
  }]);

  return AllZipPlugin;
}();

exports["default"] = AllZipPlugin;