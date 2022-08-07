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
    '@tanstack/react-table',
    '@chakra-ui/react',
    '@chakra-ui/icon',
    '@chakra-ui/system',
    '@chakra-ui/utils',
  ],
  format: ['esm', 'cjs'],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
  treeshake: 'smallest',
})
