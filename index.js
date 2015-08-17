var mutil = require('miaow-util');
var UglifyJS = require("uglify-js");

var pkg = require('./package.json');

var minify = mutil.plugin(pkg.name, pkg.version, function (option, cb) {
  var contents = this.contents.toString();

  if (!contents.trim()) {
    return cb();
  }

  // 如果有缓存就用缓存内容
  var hash = mutil.hash(contents);
  var cachedContents = this.getCache(minify.toString(), hash);
  if (cachedContents) {
    this.contents = cachedContents;
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
  // 缓存压缩结果
  this.addCache(minify.toString(), hash, this.contents);

  cb();
});

module.exports = minify;
