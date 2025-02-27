import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { dependencies, peerDependencies } from './package.json';

process.env.BABEL_DISABLE_CACHE = 1;

export default {
  input: [
    './src/amphtml/amphtml.js',
    './src/helpers/helpers.js',
    './src/setup/setup.js',
  ],
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    babel({ babelrc: true }),
  ],
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ],
};
