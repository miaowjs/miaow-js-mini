var assert = require('assert');
var fs = require('fs-extra');
var miaow = require('miaow');
var path = require('path');

var parse = require('../index');
describe('miaow-js-mini', function () {
  this.timeout(10e3);

  var log;

  var cwd = path.resolve(__dirname, './fixtures');
  var output = path.resolve(__dirname, './output');
  var cache = path.resolve(__dirname, './cache');

  fs.removeSync(cache);

  function doCompile(cb) {
    miaow.compile({
      cwd: cwd,
      output: output,
      cache: cache,
      module: {
        tasks: [
          {
            test: /\.js$/,
            plugins: [{
              plugin: parse,
              option: {
                drop_debugger: false
              }
            }]
          }
        ]
      }
    }, function (err) {
      if (err) {
        console.error(err.toString());
        throw err;
      }

      log = JSON.parse(fs.readFileSync(path.join(output, 'miaow.log.json')));
      cb();
    });
  }

  before(function (done) {
    fs.emptyDirSync(output);
    doCompile(done);
  });

  it('接口是否存在', function () {
    assert(!!parse);
  });

  it('压缩', function () {
    var stat = fs.statSync(path.join(output, 'foo.js'));
    assert.equal(stat.size, 53);
  });

  it('缓存', function (done) {
    var cacheInfo = JSON.parse(fs.readFileSync(path.join(cache, 'miaow.cache.json')));
    var filePath = path.join(cache, cacheInfo['foo.js'][0].file);
    fs.writeFileSync(filePath, '/* load cache */');

    doCompile(function () {
      assert.equal(fs.readFileSync(filePath, {encoding: 'utf8'}), '/* load cache */');
      done();
    });
  });
});
