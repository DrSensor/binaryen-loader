import assert from 'assert';

import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';
import {
  readBinary,
  setOptimizeLevel,
  setShrinkLevel,
  setDebugInfo,
} from 'binaryen';

import schema from './options.json';

export const raw = true;

export default function loader(source) {
  assert(source instanceof Buffer); // ⬅️ verify if the loaded source is binary file

  const wasmModule = readBinary(source);
  const options = getOptions(this) || {}; // ⬅️ empty object for "if-able"

  validate({
    name: 'binaryen-loader',
    schema, // ⬅ ️validate options using JSON-schema in options.json
    target: options,
  });

  if (options.optimization) {
    const o = options.optimization;
    if (o.level) setOptimizeLevel(o.level);
    if (o.shrinkLevel) setShrinkLevel(o.shrinkLevel);
  }

  if (options.transformation) {
    // #region helpers function
    const tf = options.transformation;
    const runOnFunction = (passes) => {
      if (tf.function) wasmModule.runPassesOnFunction(tf.function, passes);
    };
    const runPassses = (passes) => {
      wasmModule.runPasses(passes); // ⬅ ️since it only accept array (based on docs)
      runOnFunction(passes);
    };
    // #endregion

    // #region global transformation
    if (tf.passes) {
      if (Array.isArray(tf.passes)) runPassses(tf.passes);
      else runPassses([tf.passes]); // ⬅ ️also accept string
    }
    // WARNING: docs not clear what default level ⤵️ optimization
    else if (tf.function) wasmModule.optimizeFunction(tf.function); // ⬅ ️run default passes
    // #endregion

    // #region transformation on each specific functions
    // if (Array.isArray(options.transformation)) {
    //   // TODO: support different transformation on different function
    //   /* TRACK: waiting binaryen.js support runPasses on different function
    //     currently it support on single function or global transformation */
    // }
    // #endregion
  }

  // `..|| false` ⤵️ since docs not clear enough about the default value
  setDebugInfo(options.debug || false);
  wasmModule.optimize();

  return wasmModule.emitBinary();
}
