var mutil = require('miaow-util');
var UglifyJS = require("uglify-js");

var pkg = require('./package.json');

function minify(option, cb) {
  var contents = this.contents.toString();

  if (!contents.trim()) {
    return cb();
  }

  // 如果有缓存就用缓存内容
  var cachedContents = this.getCachedContentsSync();
  if (cachedContents) {
    this.destContents = cachedContents;
    return cb();
  }

  var result = UglifyJS.minify(
    contents,
    {
      fromString: true,
      compress: option || {}
    }
  );

  this.contents = new Buffer(result.code);

  cb();
}

module.exports = mutil.plugin(pkg.name, pkg.version, minify);
