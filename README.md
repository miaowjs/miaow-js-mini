# miaow-js-mini

> Miaow的JS压缩工具,对UglifyJS进行了简单的封装

## 使用说明

### 安装

```
npm install miaow-js-mini --save-dev
```

### 在项目的 miaow.config.js 中添加模块的 tasks 设置

```javascript
//miaow.config.js
module: {
  tasks: [
    {
      test: /\.js$/,
      plugins: ['miaow-js-mini']
    }
  ]
}
```

### 参数说明

* 传递的所有参数都是压缩配置, 具体可以参考[UglifyJS的说明](http://lisperator.net/uglifyjs/compress)
