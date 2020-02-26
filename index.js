const ImageExtReg = /\.(gif|jpg|jpeg|tiff|png)$/;
const HadSetReg = /^(https?|\/|\d{1,3})/;
const attr = ["src", "icon"];

exports = module.exports = function wepyImageSrcPlugin(options) {
  let baseImageUrl = options.baseUrl || "/";
  const ext = options.ext || "png";

  return function() {
    attr.forEach(t => {
      this.register(`template-parse-ast-pre-attr-${t}`, function prefixSrc(
        config
      ) {
        let { expr } = config;
        let parsed = this.hookUnique("url-to-module", expr);
        if (!parsed.isModule && !HadSetReg.test(expr)) {
          if (!ImageExtReg.test(expr)) {
            expr = `${expr}.${ext}`;
          }
          expr = `${baseImageUrl}${expr}`;
          config.expr = expr;
        }

        return config;
      });
    });
  };
};
