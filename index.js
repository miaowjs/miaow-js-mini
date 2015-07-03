var UglifyJS = require("uglify-js");

function minify(option, cb) {

  // 如果有缓存就用缓存内容
  var cachedContents = this.getCachedContentsSync();
  if (cachedContents) {
    this.destContents = cachedContents;
    return cb();
  }

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
