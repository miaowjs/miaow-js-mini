var UglifyJS = require('uglify-js');

var pkg = require('./package.json');

module.exports = function(options, callback) {
  var contents = this.contents.toString();

  if (!contents.trim()) {
    return callback();
  }

  try {
    var result = UglifyJS.minify(
      contents,
      {
        fromString: true,
        compress: options.compress || {},
        output: options.output || {}
      }
    );

    this.contents = new Buffer(result.code);
  } catch (err) {
    return callback(err);
  }

  callback();
};

module.exports.toString = function() {
  return [pkg.name, pkg.version].join('@');
};
