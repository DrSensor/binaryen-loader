import webpack from './helpers/compiler';

describe('Loader', () => {
  describe('Defaults', () => {
    const config = {
      loader: {
        test: /\.wasm$/,
      },
    };

    test('match snapshots', async () => {
      const stats = await webpack('fixture.js', config);
      for (const { source } of stats.toJson().modules)
        expect(source).toMatchSnapshot();
    });

    test('indeed from rust code', async () => {
      const stats = await webpack('fixture.js', config);
      stats
        .toJson()
        .modules.filter(({ name }) => name.includes('.rust.wasm'))
        .forEach(({ providedExports }) =>
          expect(providedExports).toContain('rust_eh_personality')
        );
    });

    test('not from rust code', async () => {
      const stats = await webpack('fixture.js', config);
      stats
        .toJson()
        .modules.filter(({ name }) => !name.includes('.rust.wasm'))
        .forEach(({ providedExports }) =>
          expect(providedExports).not.toContain('rust_eh_personality')
        );
    });

    test('all wasm must specify the allocated memory', async () => {
      const stats = await webpack('fixture.js', config);
      stats
        .toJson()
        .modules.filter(({ name }) => name.includes('.wasm'))
        .forEach(({ providedExports }) =>
          expect(providedExports).toContain('memory')
        );
    });
  });
});
