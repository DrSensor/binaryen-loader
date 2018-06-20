import webpack from '../../helpers/compiler';
import on from '../../helpers/on';

import commonTest from '../../common-tests';

describe('Options', () => {
  describe('transformation.passes', () => {

    function commonTestShrinking(config) {
      test('size must be equal or smaller', async () => {
        const stats = await webpack('fixture.js', config);
        on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
      });
    }

    describe('{Array<String>}', () => {
      describe(`[
        'duplicate-function-elimination',
        'inlining-optimizing',
        'remove-unused-module-elements',
        'memory-packing'
      ] (Default)`, () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              transformation: {
                passes: [
                  'duplicate-function-elimination',
                  'inlining-optimizing',
                  'remove-unused-module-elements',
                  'memory-packing',
                ],
              },
            },
          },
        };

        commonTest(config);
        commonTestShrinking(config);
      });
    });

    describe('{String}', () => {
      describe('post-emscripten', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              transformation: {
                passes: 'post-emscripten',
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
