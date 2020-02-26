"use strict";

var ImageExtReg = /\.(gif|jpg|jpeg|tiff|png)$/;
var HadSetReg = /^(https?|\/|\d{1,3})/;

exports = module.exports = function wepyImageSrcPlugin(options) {
  var baseImageUrl = options.baseUrl || "/";
  var ext = options.ext || "png";
  return function () {
    this.register("template-parse-ast-pre-attr-src", function (config) {
      var expr = config.expr;
      var parsed = this.hookUnique("url-to-module", expr);

      if (!parsed.isModule && !HadSetReg.test(expr)) {
        if (!ImageExtReg.test(expr)) {
          expr = "".concat(expr, ".").concat(ext);
        }

        expr = "".concat(baseImageUrl).concat(expr);
        config.expr = expr;
      }

      return config;
    });
  };
};