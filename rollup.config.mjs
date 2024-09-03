import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  'badge',
  'blinking-dot',
  'dot',
  'emoji',
  'index',
  'status',
  'video',
].map(item => {
  return {
    input: `./src/${item}.ts`,
    output: {
      format: 'iife',
      file: `./dist/${item}.js`
    },
    plugins: [
      typescript(),
      nodeResolve(),
    ]
  }
});
