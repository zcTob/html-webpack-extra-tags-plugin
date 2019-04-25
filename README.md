<div align="center">
  <img width="200" height="200" src="https://worldvectorlogo.com/logos/html5.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <div>
    <img width="100" height="100" title="Webpack Plugin" src="http://michael-ciniawsky.github.io/postcss-load-plugins/logo.svg">
  </div>
  <h1>HTML Webpack Plugin</h1>
  <p>Plugin that simplifies creation of HTML files to serve your bundles</p>
</div>


<h2 align="center">Install Stable</h2>

```bash
  npm i --save-dev html-webpack-extra-tag-plugin
```

```bash
  yarn add --dev html-webpack-extra-tags-plugin
```

<h2 align="center">Usage</h2>

The plugin will generate an HTML5 file for you that includes all your `webpack`
bundles in the body using `script` tags. Just add the plugin to your `webpack`
config as follows:

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`title`**|`{String}`|`Webpack App`|The title to use for the generated HTML document|