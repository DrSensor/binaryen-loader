import webpack from './helpers/compiler';
import on from './helpers/on';

import commonTest from './common-tests';

describe('Loader', () => {
  describe('Defaults', () => {
    const config = {
      loader: {
        test: /\.wasm$/,
      },
    };

    commonTest(config);

    test('size must be equal or smaller', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
    });
  });
});
