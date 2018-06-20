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

        test('size of wasm from s-expression can be bigger', async () => {
          const stats = await webpack(fixture, config);
          on(stats).withExtension('wat.wasm').size.toBeGreaterThanOrEqual(_ => _.originSize);
        });

        test('size of wasm from rust code must be equal or smaller', async () => {
          const stats = await webpack(fixture, config);
          on(stats).withExtension('rs.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
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
