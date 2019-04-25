<div align="center">
  <img width="200" height="200" src="https://worldvectorlogo.com/logos/html5.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>HTML Webpack Extra Tags Plugin</h1>
  <p>Extract CSS、js to the specified file</p>
</div>


<h2 align="center">Install Stable</h2>

```bash
  npm i --save-dev html-webpack-extra-tags-plugin
```

```bash
  yarn add --dev html-webpack-extra-tags-plugin
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExtraTagsPlugin = require('html-webpack-extra-tags-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackExtraTagsPlugin(),
  ]
}
```

This will generate a file `dist/webpack-css.html,webpack-js.html` containing the following

```html
    <link src="xxx.css"></link>
```

```html
    <script src="bundle.js"></script>
```

<h2 align="center">Usage</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`outputPath`**|`{String}`|`./`|set output path|

eg:

```js
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackExtraTagsPlugin({ outputPath: path.resolve(__dirname, 'xxxx') }),
  ]
}
```
