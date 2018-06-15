import assert from 'assert';

import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';
import { readBinary, setDebugInfo } from 'binaryen';

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

  // `..|| false` since docs not clear enough about the default value
  setDebugInfo(options.debug || false);
  wasmModule.optimize();

  return wasmModule.emitBinary();
}
