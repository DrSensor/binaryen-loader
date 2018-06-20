import webpack from '../../helpers/compiler';
import on from '../../helpers/on';

describe('Options', () => {
  describe('transformation.function', () => {
    describe('{String}', () => {

      function commonTestForThisSuite(config, fixture='fixture.js') {
        test('all .wasm doesn\'t provide exports', async () => {
          const stats = await webpack(fixture, config);
          on(stats).withExtension('.wasm').providedExports.toBeNull();
        });

        test('size is about 1.2kB to 1.6kB', async () => {
          const stats = await webpack(fixture, config);
          const given = on(stats).withExtension('.wasm');
          given.size.toBeGreaterThan(1200);
          given.size.toBeLessThan(1600);
        });
      }

      describe('add', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              transformation: {
                function: 'add',
              },
            },
          },
        };

        commonTestForThisSuite(config);
      });

      describe('divide', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              transformation: {
                function: 'divide',
              },
            },
          },
        };

        commonTestForThisSuite(config);
      });

      describe('tensor', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              transformation: {
                function: 'tensor',
              },
            },
          },
        };

        commonTestForThisSuite(config);
      });
    });
  });
});
