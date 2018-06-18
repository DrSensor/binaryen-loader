import loader from '../src';

describe('Errors', () => {
  test('Loader Error', () => {
    const err = () => loader.call();

    expect(err).toThrow();

    // expect(err).toThrowErrorMatchingSnapshot();
    // ⬆️ not compatible between node 10 and node 8 (or below)
  });

  test('Validation Error', () => {
    const err = () =>
      loader.call({
        query: { useRelativePath: 1 },
        emitFile: true,
      });

    expect(err).toThrow();

    // expect(err).toThrowErrorMatchingSnapshot();
    // ️️⬆️ not compatible between node 10 and node 8 (or below)
  });
});
