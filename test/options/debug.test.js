import webpack from '../helpers/compiler';
import on from '../helpers/on';

import commonTest from '../common-tests';

describe('Options', () => {
  describe('debug', () => {
    describe('{Boolean}', () => {
      describe('True', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              debug: true,
            },
          },
        };

        commonTest(config);

        test('.wasm < 5kB, size must be about |originSize +/- 150B|', async () => {
          const stats = await webpack('fixture.js', config);
          const given = on(stats).withExtension('.wasm').with(_ => _.originSize < 5e3);
          given.size.toBeGreaterThanOrEqual(_ => _.originSize - 150);
          given.size.toBeLessThan(_ => _.originSize + 150);
        });

        test('.wasm > 10kB, size must be about |originSize +/- 1kB|', async () => {
          const stats = await webpack('fixture.js', config);
          const given = on(stats).withExtension('.wasm').with(_ => _.originSize < 10e3);
          given.size.toBeGreaterThanOrEqual(_ => _.originSize - 1e3);
          given.size.toBeLessThan(_ => _.originSize + 1e3);
        });
      });

      describe('False (Default)', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              debug: false,
            },
          },
        };

        commonTest(config);

        test('size must be equal or smaller', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
        });
      });
    });
  });
});
