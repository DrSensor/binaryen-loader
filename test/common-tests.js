import webpack from './helpers/compiler';
import on from './helpers/on';

export default (config, fixture='fixture.js') => {
  test('match snapshots', async () => {
    const stats = await webpack(fixture, config);
    on(stats).source.toMatchSnapshot();
  });

  test('indeed from rust code', async () => {
    const stats = await webpack(fixture, config);
    on(stats).withExtension('.rs.wasm').providedExports.toContain('rust_eh_personality');
  });

  test('not from rust code', async () => {
    const stats = await webpack(fixture, config);
    on(stats).withoutExtension('.rs.wasm').providedExports.not.toContain('rust_eh_personality');
  });

  test('all wasm must specify the allocated memory', async () => {
    const stats = await webpack(fixture, config);
    on(stats).withExtension('.wasm').providedExports.toContain('memory');
  });
};
