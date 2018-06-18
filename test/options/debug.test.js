import webpack from '../helpers/compiler';
import on from '../helpers/on';

describe('Options', () => {
  describe('debug', () => {
    describe('{Boolean}', () => {
      const globalTests = config => {
        test('match snapshots', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).source.toMatchSnapshot();
        });

        test('rust_eh_personality still exist in rust code', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withExtension('.rust.wasm').providedExports.toContain('rust_eh_personality');
        });

        test('rust_eh_personality not found in non-rust code', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withoutExtension('.rust.wasm').providedExports.not.toContain('rust_eh_personality');
        });

        test('all wasm must specify the allocated memory', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withExtension('.wasm').providedExports.toContain('memory');
        });
      };

      describe('True', () => {
        const config = {
          loader: {
            test: /\.wasm$/,
            options: {
              debug: true,
            },
          },
        };

        globalTests(config);

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

        globalTests(config);

        test('size must be equal or smaller', async () => {
          const stats = await webpack('fixture.js', config);
          on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
        });
      });
    });
  });
});
