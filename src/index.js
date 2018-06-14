import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';

import schema from './options.json';

export const raw = false;

export default function loader(source) {
  const { version, webpack } = this;

  const options = getOptions(this) || {};

  validate({
    name: 'binaryen-loader',
    schema,
    target: options,
  });

  const newSource = `
  /**
   * Loader API Version: ${version}
   * Is this in "webpack mode": ${webpack}
   */
  /**
   * Original Source From Loader
   */
  ${source}`;

  return `${newSource}`;
}
