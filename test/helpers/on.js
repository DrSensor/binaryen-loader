import { statSync } from 'fs';
import { resolve, dirname } from 'path';

// TODO: test approximate size (need ability to convert Unit, e.g kb to KB)

function inLoopExpect(array, prop, isNot = false) {
  return {
    get not() {
      return inLoopExpect(array, prop, true);
    },

    toContain(expected) {
      for (const element of array) {
        if (isNot) {
          if (prop) expect(element[prop]).not.toContain(expected);
          else expect(element).not.toContain(expected);
        } else if (prop) expect(element[prop]).toContain(expected);
        else expect(element).toContain(expected);
      }
    },

    toBeLessThan(expected) {
      for (const element of array) {
        if (isNot) {
          if (prop) expect(element[prop]).not.toBeLessThan(expected);
          else expect(element).not.toBeLessThan(expected);
        } else if (prop) expect(element[prop]).toBeLessThan(expected);
        else expect(element).toBeLessThan(expected);
      }
    },

    toMatchSnapshot() {
      for (const element of array) {
        if (isNot) {
          if (prop) expect(element[prop]).not.toMatchSnapshot();
          else expect(element).not.toMatchSnapshot();
        } else if (prop) expect(element[prop]).toMatchSnapshot();
        else expect(element).toMatchSnapshot();
      }
    },
  };
}

function chainer(statModules) {
  return {
    get: prop => inLoopExpect(statModules, prop),
    get source() { return inLoopExpect(statModules, 'source') },
    get providedExports() { return inLoopExpect(statModules, 'providedExports') },

    get originSize() {
      return inLoopExpect(
        statModules.map(({ issuer, name }) => statSync(resolve(dirname(issuer), name)).size)
      );
    },

    withExtension(extension) {
      return chainer(
        statModules.filter(({ name }) => name.includes(extension))
      );
    },

    withoutExtension(extension) {
      return chainer(
        statModules.filter(({ name }) => !name.includes(extension))
      );
    },
  };
}

export default function(stats) {
  return chainer(stats.toJson().modules);
}
