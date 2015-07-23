var mutil = require('miaow-util');
var UglifyJS = require("uglify-js");

var pkg = require('./package.json');

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

module.exports = mutil.plugin(pkg.name, pkg.version, minify);
