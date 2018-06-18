import webpack from './helpers/compiler';
import on from './helpers/on';

describe('Loader', () => {
  describe('Defaults', () => {
    const config = {
      loader: {
        test: /\.wasm$/,
      },
    };

    test('match snapshots', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).source.toMatchSnapshot();
    });

    test('indeed from rust code', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).withExtension('.rust.wasm').providedExports.toContain('rust_eh_personality');
    });

    test('not from rust code', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).withoutExtension('.rust.wasm').providedExports.not.toContain('rust_eh_personality');
    });

    test('all wasm must specify the allocated memory', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).withExtension('.wasm').providedExports.toContain('memory');
    });

    test('size must be equal or smaller', async () => {
      const stats = await webpack('fixture.js', config);
      on(stats).withExtension('.wasm').size.toBeLessThanOrEqual(_ => _.originSize);
    });
  });
});
