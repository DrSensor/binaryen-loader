<div align="center">
  <a href="https://github.com/WebAssembly/binaryen">
    <img width="200" height="200" alt="binaryen logo" src="">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" alt="webpack logo" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![size][size]][size-url]

# binaryen-loader

A loader to reduce wasm code size based on [Binaryen]().

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `binaryen-loader`:

```console
$ npm install binaryen-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**file.wasm**
```js
import file from 'file.wasm';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.wasm$/,
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

And run `webpack` via your preferred method.

## Options
The options in binaryen-loader correspond to [module-optimization](https://github.com/AssemblyScript/binaryen.js/#module-optimization) section in [binaryen.js][].

### `debug`

- Type: `Boolean`
- Default: `false`
- Correspond to: `setDebugInfo`

Enables or disables debug information in emitted binaries.

```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    debug: true
  }
}
```

### `optimization.level`

- Type: `Integer`
- Default: `2`
- Expected value: from `0` to `2`
- Correspond to: `setOptimizeLevel`

Sets the optimization level that correspond to flag `-O0`, `-O1`, `-O2`, etc.

```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    optimization: {
      level: 0
    }
  }
}
```

### `optimization.shrinkLevel`

- Type: `Integer`
- Default: `1`
- Expected value: from `0` to `2`
- Correspond to: `setShrinkLevel`

Sets the shrink level that correspond to flag `-O0`, `-Os`, `-Oz`.

```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    optimization: {
      shrinkLevel: 2
    }
  }
}
```

### `transformation.passes`

- Type: `String|Array<String>`
- Default: see [`DefaultGlobalOptimization` in pass.cpp](https://github.com/WebAssembly/binaryen/blob/master/src/passes/pass.cpp#L190-L204)
- Expected value: see [`PassRegistry::registerPasses` in pass.cpp](https://github.com/WebAssembly/binaryen/blob/master/src/passes/pass.cpp#L67-L126)
- Correspond to: `runPasses`

Runs the specified passes on the module.

```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    transformation: {
      passes: 'post-emscripten'
    }
  }
}
```
or
```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    transformation: {
      passes: [
        'post-emscripten',
        'remove-memory'
      ]
    }
  }
}
```

### `transformation.function` (still experimental)

- Type: `String`
- Default: `null`
- Expected value: any valid function name exported from `.wasm` file
- Correspond to: `optimizeFunction` (if passes undefined) or `runPassesOnFunction` (if passes defined)

Optimizes a single function using defined and/or default passes.

```js
// in your webpack.config.js
{
  loader: `binaryen-loader`,
  options: {
    transformation: {
      function: 'add'
    }
  }
}
```

## Examples

The following examples show how to use `binaryen-loader` chained with `wasm-loader`.

![chain illustration](./asset/example_1.svg)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [{
      test: /\.wasm$/,
      use: [{
        loader: 'wasm-loader'
      }, {
        loader: `binaryen-loader`,
        options: {
          transformation: {
            passes: [
              'post-emscripten',
              'remove-memory'
            ]
          }
        }
      }]
    }]
  }
}
```

**arithmatic.wasm** (if converted into `.wat`)
```wat
(module
  (type $t0 (func (param i32 i32) (result i32)))
  (func $add (export "add") (type $t0) (param $0 i32) (param $1 i32) (result i32)
    get_local $0
    get_local $1
    i32.add)
  (memory $memory (export "memory") 1))
```

**implementation.js**
```js
import loadArithmatic from 'arithmatic.wasm';

loadArithmatic.then(wasm =>
  const { add } = wasm.instance.exports;
  console.log(add(1, 2)); // 3
);
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](./.github/CONTRIBUTING)

## License

#### [MIT](./LICENSE)

---
<sup>This project generated and modified based on [webpack-defaults](https://github.com/webpack-contrib/webpack-defaults).
Default Contribution guideline, Issue and PR template are intentionally left behind, not edited until there is some feedback about that 🙂</sup>

[Binaryen]: https://github.com/WebAssembly/binaryen
[binaryen.js]: https://github.com/AssemblyScript/binaryen.js

[npm]: https://img.shields.io/npm/v/binaryen-loader.svg
[npm-url]: https://npmjs.com/package/binaryen-loader

[node]: https://img.shields.io/node/v/binaryen-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/DrSensor/binaryen-loader.svg
[deps-url]: https://david-dm.org/DrSensor/binaryen-loader

[tests]: 	https://img.shields.io/circleci/project/github/DrSensor/binaryen-loader.svg
[tests-url]: https://circleci.com/gh/DrSensor/binaryen-loader

[cover]: https://codecov.io/gh/DrSensor/binaryen-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/DrSensor/binaryen-loader

[size]: https://packagephobia.now.sh/badge?p=binaryen-loader
[size-url]: https://packagephobia.now.sh/result?p=binaryen-loader
