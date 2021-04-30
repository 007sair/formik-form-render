/**
 * Note: about warning:
 * ```
 * Entry module "src/index.ts" is using named and default exports together. ...
 * ```
 * @see https://github.com/umijs/father/issues/240
 */

export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'ffr',
  },
};
