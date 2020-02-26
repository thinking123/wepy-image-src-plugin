const { series, parallel, src, dest, task, watch } = require("gulp");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
function dist() {
  return src("./index.js")
    .pipe(
      babel({
        presets: [["@babel/preset-env"]]
      })
    )
    .pipe(rename("main.js"))
    .pipe(dest("./", {}));
}

module.exports.default = dist;
