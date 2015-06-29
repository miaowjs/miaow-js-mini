var UglifyJS = require("uglify-js");

function minify(option, cb) {
  var result = UglifyJS.minify(
    this.contents.toString(),
    {
      fromString: true,
      compress: option || {}
    }
  );

  this.contents = new Buffer(result.code);

  cb();
}

module.exports = minify;
