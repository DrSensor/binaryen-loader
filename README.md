<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# binaryen-loader

loader to reduce wasm code size based on Binaryen

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `binaryen-loader`:

```console
$ npm install binaryen-loader --save-dev
```

<!-- isLoader ? use(this) : delete(isPlugin) -->
Then add the loader to your `webpack` config. For example:

<!-- isPlugin ? use(this) : delete(isLoader) -->
Then add the plugin to your `webpack` config. For example:

**file.ext**
```js
import file from 'file.ext';
```

<!-- isLoader ? use(this) : delete(isPlugin) -->
**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /.ext$/,
        use: [
          {
            loader: `binaryen-loader`,
            options: {...options}
          }
        ]
      }
    ]
  }
}
```

<!-- isPlugin ? use(this) : delete(isLoader) -->
**webpack.config.js**
```js
module.exports = {
  plugins: [
    new `Binaryen`Plugin(options)
  ]
}
```

And run `webpack` via your preferred method.

## Options

### `[option]`

Type: `[type|other-type]`
Default: `[type|null]`

[ option description ]

<!-- isLoader ? use(this) : delete(isPlugin) -->
```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    [option]: ''
  }
}
```

<!-- isPlugin ? use(this) : delete(isLoader) -->
```js
// in your webpack.config.js
new `Binaryen`Plugin({
  [option]: ''
})
```

## Examples

[ example outline text ]

**webpack.config.js**
```js
// Example setup here..
```

**file.ext**
```js
// Source code here...
```

**bundle.js**
```js
// Bundle code here...
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](./.github/CONTRIBUTING)

## License

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/binaryen-loader.svg
[npm-url]: https://npmjs.com/package/binaryen-loader

[node]: https://img.shields.io/node/v/binaryen-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/binaryen-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/binaryen-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/binaryen-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/binaryen-loader

[cover]: https://codecov.io/gh/webpack-contrib/binaryen-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/binaryen-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[size]: https://packagephobia.now.sh/badge?p=binaryen-loader
[size-url]: https://packagephobia.now.sh/result?p=binaryen-loader
