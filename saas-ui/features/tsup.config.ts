import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'node14',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: true,
  external: [
    'react',
    '@chakra-ui/react',
    '@chakra-ui/system',
    '@chakra-ui/utils',
    'zustand',
  ],
  format: ['esm', 'cjs'],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
  treeshake: 'smallest',
})
