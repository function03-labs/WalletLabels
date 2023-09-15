import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'node14',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: true,
  shims: true,
  external: [
    'react',
    '@chakra-ui/react',
    '@chakra-ui/system',
    '@chakra-ui/utils',
    'zustand',
  ],
  format: ['esm', 'cjs'],
})
