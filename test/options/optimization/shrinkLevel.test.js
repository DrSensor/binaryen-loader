import webpack from '../../helpers/compiler';
import on from '../../helpers/on';

import commonTest from '../../common-tests';

describe('Options', () => {
  describe('optimization.shrinkLevel', () => {
    describe('{Integer}', () => {

      function commonTestShrinking(config) {
        test('size must be equal or smaller', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
        });
      }

      describe('0', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              optimization: {
                shrinkLevel: 0,
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });

      describe('1 (Default)', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              optimization: {
                shrinkLevel: 1,
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });

      describe('2 (Aggresive)', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              optimization: {
                shrinkLevel: 2,
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });
    });
  });
});
