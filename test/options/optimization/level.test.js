import webpack from '../../helpers/compiler';
import on from '../../helpers/on';

import commonTest from '../../common-tests';

describe('Options', () => {
  describe('optimization.level', () => {
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
                level: 0,
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });

      describe('1', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              optimization: {
                level: 1,
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });

      describe('2 (Default)', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              optimization: {
                level: 2,
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
